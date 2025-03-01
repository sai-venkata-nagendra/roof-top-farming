import torch
import torchvision.transforms as T
import torchvision.models.segmentation as models
import cv2
import numpy as np
import json
import sys

# Load Pre-Trained DeepLabV3 Model (ResNet101 Backbone)
model = models.deeplabv3_resnet101(pretrained=True).eval()

def detect_sunlight(image_path):
    """Predicts sunlight vs. shadow areas using DeepLabV3"""
    image = cv2.imread(image_path)
    
    if image is None:
        print(json.dumps({"error": "Invalid image"}))
        sys.exit(1)

    # Resize image for model input
    image_resized = cv2.resize(image, (512, 512))
    transform = T.Compose([T.ToTensor()])
    image_tensor = transform(image_resized).unsqueeze(0)

    # Run DeepLabV3 model
    with torch.no_grad():
        output = model(image_tensor)["out"][0]  # Get segmentation map

    # Convert model output to binary mask (Sunlight vs. Shadow)
    mask = output.argmax(0).byte().numpy()
    sunlight_mask = (mask == 15).astype(np.uint8) * 255  # Class 15 = "sky" in COCO dataset

    # Convert to 3D coordinates for Three.js rendering
    def get_positions(mask, height=0.05, step=20):
        positions = []
        h, w = mask.shape
        scale = 10 / w
        for y in range(0, h, step):
            for x in range(0, w, step):
                if mask[y, x] > 0:
                    positions.append([round((x * scale) - 5, 2), height, round((y * scale) - 5, 2)])
        return positions

    sunlight_positions = get_positions(sunlight_mask)

    # Return JSON output
    print(json.dumps({"sunlight_areas": sunlight_positions}))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No image path provided"}))
        sys.exit(1)

    image_path = sys.argv[1]
    detect_sunlight(image_path)
