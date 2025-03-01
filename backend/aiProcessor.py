import cv2
import numpy as np
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def analyze_image(image_path):
    """ AI logic to analyze the rooftop image """

    img = cv2.imread(image_path)
    if img is None:
        return {"error": "Invalid image"}

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Detect bright areas (Sunlight estimation)
    _, sunlight_mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)

    # Detect obstacles (AC units, tanks, etc.)
    edges = cv2.Canny(gray, 50, 150)

    # Convert pixel positions to 3D grid positions
    def get_positions(mask, height=0.1,step=50):
        positions = []
        h, w = mask.shape
        scale = 10 / w  # Scale factor to fit 10x10 rooftop
        for y in range(0,h,step):
            for x in range(0,w,step):
                if mask[y, x] > 0:
                    positions.append([(x * scale) - 5, height, (y * scale) - 5])
        return positions

    return {
        "sunlight_areas": get_positions(sunlight_mask, height=0.05),
        "obstacles": get_positions(edges, height=0.2),
        "recommended_zones": get_positions(sunlight_mask - edges, height=0.05)  # Recommended = Sunlight - Obstacles
    }

@app.route('/process-image', methods=['POST'])
def process_image():
    """ API Endpoint to Process Rooftop Image """
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    analysis = analyze_image(file_path)
    return jsonify(analysis)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
