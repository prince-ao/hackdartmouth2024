from flask import Flask, request
from config import DevConfig
from db import User, db
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS
from openai import OpenAI
from decouple import config
from PIL import Image
import io
import base64


client = OpenAI(api_key=config("OPENAI_API_KEY"))


app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
JWTManager(app)
CORS(app)


@app.post('/signup')
def signup():
    body = request.get_json()

    new_user = User(
        username= body['username'],
        email= body['email'],
        password= body['password'],
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return access_token

@app.post('/login')
def login():
    body = request.get_json()

    user = User.query.filter_by(username=body['username']).first()

    if not user or str(user.password) != str(body['password']):
        return "Invalid username or password", 401

    access_token = create_access_token(identity=user.id)

    return access_token

def compress_base64_image(base64_string, output_format='JPEG', quality=20):
    image_data = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_data))

    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format=output_format, quality=quality)
    img_byte_arr = img_byte_arr.getvalue()

    return base64.b64encode(img_byte_arr).decode('utf-8')

@app.post('/gen-ar')
def gen_ar():
    body = request.get_json()
    base64_image = body['data']
    location = body['location']

    base64_image = compress_base64_image(base64_image)


    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": [
                {"type": "text", "text": f"Give me the historical context of this image. It was taken at this location: {location}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_image}"
                    },
                },
            ],
            }
        ],
    )

    return response.choices[0].message.content


@app.get('/')
def index():
    return "Welcome to Timeframe API"


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
