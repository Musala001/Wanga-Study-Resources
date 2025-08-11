import os
import json

# Path to your project folder
BASE_DIR = "."


# Folders to scan
CATEGORIES = ["notes", "papers"]

def clean_title(filename):
    # Remove file extension and replace underscores/dashes with spaces
    title = os.path.splitext(filename)[0]
    title = title.replace('_', ' ').replace('-', ' ')
    return title

def scan_folder():
    resources = {}

    for category in CATEGORIES:
        category_path = os.path.join(BASE_DIR, category)
        if not os.path.exists(category_path):
            print(f"Warning: {category_path} does not exist!")
            continue

        # List all subject folders in this category
        subjects = [d for d in os.listdir(category_path) if os.path.isdir(os.path.join(category_path, d))]

        for subject in subjects:
            subject_path = os.path.join(category_path, subject)
            files = [f for f in os.listdir(subject_path) if os.path.isfile(os.path.join(subject_path, f))]

            if subject not in resources:
                resources[subject] = {"notes": [], "papers": []}

            for f in files:
                item = {
                    "title": clean_title(f),
                    "url": f"{category}/{subject}/{f}".replace('\\', '/')
                }
                resources[subject][category].append(item)

    return resources

def main():
    resources = scan_folder()
    with open(os.path.join(BASE_DIR, "resources.json"), "w", encoding="utf-8") as f:
        json.dump(resources, f, indent=2)
    print(f"resources.json generated in {BASE_DIR}/")

if __name__ == "__main__":
    main()
