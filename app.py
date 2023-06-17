from flask import Flask, request, Response, jsonify, render_template
import json
from PIL import Image
import numpy as np
import cv2
from transformers import ViTForImageClassification, ViTImageProcessor

model = ViTForImageClassification.from_pretrained( "imjeffhi/pokemon_classifier").to("cpu")
feature_extractor = ViTImageProcessor.from_pretrained('google/vit-base-patch16-224')

pokedata={}
with open("pokedb.json", "r") as file:
    pokedata.update(json.load(file))

app = Flask(__name__, template_folder="build", static_folder="build/static")

@app.route('/', defaults={'path': ''})
@app.route("/<path:path>")
def home(path):
    return render_template("index.html")

@app.route('/classify', methods = ["GET", "POST"])
def classify():
    if(request.method == "POST"):
        f = request.files["image"]
        try:
            img = cv2.imdecode(np.frombuffer(f.stream.read(), dtype=np.uint8), cv2.IMREAD_UNCHANGED)
            img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            print(img.shape)
            img = Image.fromarray(img, mode="RGB")
            extracted = feature_extractor(images=img, return_tensors='pt').to("cpu")
            predicted_id = model(**extracted).logits.argmax(-1).item()
    
            resp = {"id": predicted_id+1, "status" : 200}
            resp = jsonify(resp)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
        except:
            resp = {"message": ".jpg or .png format prefered", "status" : 503}
            resp = jsonify(resp)
            resp.headers.add('Access-Control-Allow-Origin', '*')
            return resp
    return Response("no?")

@app.route("/get/<int:pokemon>")
def pokemon(pokemon):
    if(0 >= pokemon or pokemon > 898):
        resp = jsonify({"id": -1, "status" : 404})
        resp.headers.add('Access-Control-Allow-Origin', '*')
        return resp
    poke_name = model.config.id2label[pokemon-1]
    resp = pokedata[poke_name]
    resp["name"] = poke_name
    resp["status"] = 200
    resp = jsonify(resp)
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp

if __name__ == "__main__":
    app.run(port=8000)