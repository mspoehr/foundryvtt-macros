#!/usr/bin/env python3
import os
import json
import sys


def extract_commands(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".json"):
                json_path = os.path.join(root, file)
                js_path = os.path.join(root, file[:-5] + ".js")

                try:
                    with open(json_path, "r") as f:
                        data = json.load(f)

                    if "command" in data:
                        command = data["command"].replace('\\"', '"')
                        
                        content = ""
                        if "name" in data:
                            content += f"// metadata-name: {data['name']}\n"
                        if "img" in data:
                            content += f"// metadata-img: {data['img']}\n"
                        if content:
                            content += "// end-metadata\n"
                        content += command
                        
                        with open(js_path, "w") as f:
                            f.write(content)
                        print(f"Extracted: {json_path} -> {js_path}")
                except Exception as e:
                    print(f"Error processing {json_path}: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python extract_commands.py <directory>")
        sys.exit(1)

    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a valid directory")
        sys.exit(1)

    extract_commands(directory)
