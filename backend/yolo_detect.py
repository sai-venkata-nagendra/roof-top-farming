from ultralytics import YOLO
import cv2
import sys
import json

model = YOLO("yolov8n.pt")  # Load YOLO model

def detect_obstacles(image_path):
    image = cv2.imread(image_path)
    if image is None:
        print(json.dumps({"error": "Invalid image"}))  # 🔹 Return error message in JSON
        return
    
    results = model(image)
    obstacle_positions = []

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Get bounding box coordinates
            center_x = (x1 + x2) / 2
            center_y = (y1 + y2) / 2
            obstacle_positions.append([round(center_x, 2), 0.2, round(center_y, 2)])

    print(json.dumps({"obstacles": obstacle_positions}))  # 🔹 Print JSON output for `aiProcessor.py`

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))  # 🔹 Handle missing arguments
        sys.exit(1)

    image_path = sys.argv[1]
    detect_obstacles(image_path)
