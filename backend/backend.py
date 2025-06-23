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

# Configuration
UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_gif():
    gif_path = 'input/frames.gif'
    return send_file(
            gif_path,
            mimetype='image/gif',
            as_attachment=False  # set True to force download
        ), 200


    

@app.route('/predict', methods=['POST'])
def predict():
    if 'video' not in request.files:
        return jsonify({'error': 'No video part in request'}), 400

    file = request.files['video']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    #if file and allowed_file(file.filename):
    if file :
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Call utility function(s) + model
        # try:
        video = load_data(tf.convert_to_tensor(filepath))
        # imageio.mimsave('input/frames.gif', video, fps=10)
        # get_gif()


        model = load_model()
        prediction = model.predict(tf.expand_dims(video, axis=0))
        decoder = tf.keras.backend.ctc_decode(prediction, [75], greedy=True)[0][0].numpy()
        converted_prediction = tf.strings.reduce_join(num_to_char(decoder)).numpy().decode('utf-8')
        
        
        return jsonify({"result": str(converted_prediction)})


        # except Exception as e:
        #     return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid file type'}), 400

if __name__ == '__main__':
    #app.run(debug=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
