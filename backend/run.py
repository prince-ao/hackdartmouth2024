from flask import Flask, request
from config import DevConfig
from db import User, Post, db
from flask_jwt_extended import create_access_token, JWTManager, decode_token
from flask_cors import CORS
from openai import OpenAI
from groq import Groq
from decouple import config
from PIL import Image
import io
import base64


client = OpenAI(api_key=config("OPENAI_API_KEY"))
groq_client = Groq(
    api_key=config("GROQ_API_KEY"),
)


app = Flask(__name__)
app.config.from_object(DevConfig)
db.init_app(app)
JWTManager(app)
CORS(app)

with app.app_context():
    db.create_all()


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

    access_token = create_access_token(identity=new_user.id, expires_delta=100000)

    return access_token

@app.post('/login')
def login():
    body = request.get_json()

    user = User.query.filter_by(username=body['username']).first()

    if not user or str(user.password) != str(body['password']):
        return "Invalid username or password", 401

    access_token = create_access_token(identity=user.id, expires_delta=100000)

    return access_token

@app.get('/home')
def things():
    auth_token = request.headers.get('auth')

    strike = decode_token(auth_token)

    id = int(strike['sub'])

    posts = Post.query.filter_by(user_id=id).all()

    return [post.to_dict() for post in posts]

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
    history = body['history']

    base64_image = compress_base64_image(base64_image)

    auth_token = request.headers.get('auth')

    if not auth_token:
        return "auth required", 400

    strike = decode_token(auth_token)

    id = int(strike['sub'])


    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=[
            {
            "role": "user",
            "content": [
                {
                    "type": "text", 
                    "text": f"Give me the historical context of this image. It was taken at this location: {location}. I want historical context around {history}"
                },
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

    response_text = response.choices[0].message.content

    chat_completion = groq_client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"Make a short title for this: {response_text}. Just give me the title, nothing extra.",
            }
        ],
        model="mixtral-8x7b-32768",
    )

    title_comp = chat_completion.choices[0].message.content

    new_post = Post(
        user_id = id,
        image = base64_image,
        title = title_comp,
        description = response_text
    )

    db.session.add(new_post)
    db.session.commit()

    return response_text


@app.get('/')
def index():
    return "Welcome to Timeframe API"


if __name__ == "__main__":
    app.run()
