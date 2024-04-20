from flask import Flask, request
from config import DevConfig

app = Flask(__name__)
app.config.from_object(DevConfig)

@app.post('/signup')
def signup():
    body = request.get_json()
    
    return ""

@app.get('/')
def index():
    return "Hello, World"


if __name__ == "__main__":
    app.run()
