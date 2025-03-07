import cv2
import numpy as np
import matplotlib.pyplot as plt
import pytesseract
import open3d as o3d
from PIL import Image

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def preprocess_image(image_path):
    # Load image in grayscale
    image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    
    # Apply Gaussian Blur to reduce noise
    blurred = cv2.GaussianBlur(image, (5, 5), 0)
    
    # Use adaptive thresholding to binarize the image
    binary = cv2.adaptiveThreshold(blurred, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 11, 2)
    
    return binary

def extract_text(image_path):
    # Extract height annotations using OCR
    text = pytesseract.image_to_string(Image.open(image_path))
    return text

def detect_walls(image):
    # Detect edges using Canny edge detection
    edges = cv2.Canny(image, 50, 150, apertureSize=3)
    
    # Detect lines using Hough Line Transform
    lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=100, minLineLength=50, maxLineGap=5)
    
    return lines

def detect_gaps_in_walls(image, walls):
    # Create a mask to detect gaps
    mask = np.zeros_like(image)
    
    # Draw walls on the mask
    if walls is not None:
        for line in walls:
            x1, y1, x2, y2 = line[0]
            cv2.line(mask, (x1, y1), (x2, y2), 255, 3)
    
    # Find gaps in the walls
    gap_edges = cv2.Canny(mask, 50, 150, apertureSize=3)
    gaps = cv2.findContours(gap_edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)[0]
    
    return gaps

def detect_obstacles(image):
    # Find contours to detect obstacles
    contours, _ = cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    return contours

def generate_3d_model(walls, heights):
    # Create a 3D point cloud
    mesh = o3d.geometry.TriangleMesh()
    
    if walls is not None:
        for line in walls:
            x1, y1, x2, y2 = line[0]
            height = heights.get((x1, y1, x2, y2), 3)  # Default height if missing
            
            # Create 3D wall segment
            wall = o3d.geometry.TriangleMesh.create_box(width=0.1, height=height, depth=np.linalg.norm([x2-x1, y2-y1]))
            wall.translate([x1, y1, 0])
            mesh += wall
    
    return mesh

def draw_detections(image_path, walls, gaps, obstacles, heights):
    image = cv2.imread(image_path)
    
    # Draw detected walls (lines)
    if walls is not None:
        for line in walls:
            x1, y1, x2, y2 = line[0]
            cv2.line(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
    # Draw detected gaps (doors/windows)
    for gap in gaps:
        x, y, w, h = cv2.boundingRect(gap)
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)  # Blue for doors/windows
    
    # Draw detected obstacles (contours)
    cv2.drawContours(image, obstacles, -1, (0, 0, 255), 2)
    
    # Show final detection result
    plt.figure(figsize=(10, 10))
    plt.imshow(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
    plt.axis("off")
    plt.show()

def main(image_path):
    preprocessed = preprocess_image(image_path)
    walls = detect_walls(preprocessed)
    gaps = detect_gaps_in_walls(preprocessed, walls)
    obstacles = detect_obstacles(preprocessed)
    
    # Extract text (heights) and ask user for missing ones
    extracted_text = extract_text(image_path)
    heights = {}  # Dictionary to store wall heights
    print("Extracted text:", extracted_text)
    
    # Ask user to manually input missing heights
    if walls is not None:
        for line in walls:
            x1, y1, x2, y2 = line[0]
            height = input(f"Enter height for wall ({x1},{y1}) to ({x2},{y2}) [default=3m]: ")
            heights[(x1, y1, x2, y2)] = float(height) if height else 3.0
    
    draw_detections(image_path, walls, gaps, obstacles, heights)
    
    # Generate 3D model
    model = generate_3d_model(walls, heights)
    o3d.visualization.draw_geometries([model])
    
# Example usage:
main(r"C:\Users\ASUS\Desktop\roof-top-farming\backend\testblueprint.jpg")

