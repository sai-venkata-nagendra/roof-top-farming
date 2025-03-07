import numpy as np
import json

def optimize_layout(grid_size, obstacles, sunlight_map, plant_count=5):
    """Automatically arranges plants for best efficiency."""
    layout = np.zeros(grid_size)  # Empty grid

    # Sort positions by highest sunlight value
    sunlight_sorted = np.dstack(np.unravel_index(np.argsort(-sunlight_map.ravel()), sunlight_map.shape))

    placed_plants = 0
    plant_positions = []

    for y, x in sunlight_sorted[0]:
        if (y, x) not in obstacles:
            layout[y, x] = 1  # Place plant
            plant_positions.append((x, y))  # Store position
            placed_plants += 1
            if placed_plants >= plant_count:
                break

    return plant_positions  # Return optimized positions


# Example Usage
grid_size = (10, 10)
obstacles = [(3, 4), (5, 5)]
sunlight_map = np.random.rand(10, 10)  # Mock sunlight intensity map

optimized_positions = optimize_layout(grid_size, obstacles, sunlight_map)

# Output JSON format to send to Unity
print(json.dumps({"plants": optimized_positions}))
