from flask import Flask, request, jsonify, send_file
import os
from werkzeug.utils import secure_filename
from model import load_model
from utils import load_data, num_to_char
from flask_cors import CORS
import tensorflow as tf
import imageio 

app = Flask(__name__)
CORS(app)
CORS(app, origins=["http://localhost:5173"])

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs('input', exist_ok=True)

@app.route('/output', methods=['GET'])
def get_gif():
    gif_path = 'input/frames.gif'
    return send_file(
            gif_path,
            mimetype='image/gif',
            as_attachment=False
        ), 200

@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video part in request'}), 400

    file = request.files['video']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file :
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        video = load_data(tf.convert_to_tensor(filepath))
        imageio.mimsave('input/frames.gif', video, fps=10)
        get_gif()


        model = load_model()
        prediction = model.predict(tf.expand_dims(video, axis=0))
        decoder = tf.keras.backend.ctc_decode(prediction, [75], greedy=True)[0][0].numpy()
        converted_prediction = tf.strings.reduce_join(num_to_char(decoder)).numpy().decode('utf-8')
        print(decoder)
        
        
        return jsonify({"result": str(converted_prediction), "tensor": str(decoder)})

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
