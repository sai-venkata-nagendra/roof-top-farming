import open3d as o3d
import numpy as np

def create_rooftop(width, height):
    """Creates a rooftop plane in 3D."""
    rooftop = o3d.geometry.TriangleMesh.create_box(width, height, 0.05)
    rooftop.paint_uniform_color([0.7, 0.7, 0.7])  # Light gray color
    return rooftop

def add_obstacles(width, height):
    """User manually adds obstacles in the 3D space."""
    obstacles = []
    print("\nEnter obstacle positions (x y) or 'done' to finish:")

    while True:
        user_input = input("> ")
        if user_input.lower() == "done":
            break

        try:
            x, y = map(float, user_input.split())
            if 0 <= x <= width and 0 <= y <= height:
                obstacle = o3d.geometry.TriangleMesh.create_box(0.5, 0.5, 0.2)  # Small cube
                obstacle.translate((x, y, 0.05))
                obstacle.paint_uniform_color([1, 0, 0])  # Red color for obstacles
                obstacles.append(obstacle)
            else:
                print("❌ Invalid position! Out of bounds.")
        except ValueError:
            print("❌ Invalid input! Enter two numbers (x y) or 'done'.")

    return obstacles

def main():
    """Runs the 3D interactive rooftop console."""
    width = float(input("Enter rooftop width: "))
    height = float(input("Enter rooftop height: "))

    print("\n✅ Rooftop Grid Created! Now add obstacles.")
    
    rooftop = create_rooftop(width, height)
    obstacles = add_obstacles(width, height)

    # Create 3D visualization
    vis_objects = [rooftop] + obstacles
    o3d.visualization.draw_geometries(vis_objects, window_name="3D Rooftop Layout")

if __name__ == "__main__":
    main()
