#!/usr/bin/env python3
import os
import json
import sys
import hashlib
import base64
import re

non_alphanumeric = re.compile("[^a-zA-Z0-9]")


def js_to_json(in_directory, out_directory):
    for root, dirs, files in os.walk(in_directory):
        for file in files:
            if file.endswith(".js"):
                js_path = os.path.join(root, file)

                try:
                    with open(js_path, "r") as f:
                        content = f.read()

                    data = {
                        "type": "script",
                        "scope": "global",
                        "author": "pamPl3hysgM6NAjV",
                        "sort": 100000,
                        "flags": {"core": {}},
                        "ownership": {"default": 0},
                        "_stats": {
                            "compendiumSource": None,
                            "duplicateSource": None,
                            "exportSource": None,
                            "coreVersion": "13.351",
                            "systemId": "dnd5e",
                            "systemVersion": "5.0.4",
                            "createdTime": 1765900516349,
                            "modifiedTime": 1765900516349,
                            "lastModifiedBy": "pamPl3hysgM6NAjV",
                        },
                    }
                    command_start = 0
                    # Read folder ID from _Folder.json
                    folder_json_path = os.path.join(root, "_Folder.json")
                    if os.path.exists(folder_json_path):
                        with open(folder_json_path, "r") as f:
                            folder_data = json.load(f)
                            if "_id" in folder_data:
                                data["folder"] = folder_data["_id"]

                    lines = content.split("\n")
                    for i, line in enumerate(lines):
                        if line.startswith("// metadata-name: "):
                            data["name"] = line[18:]
                        elif line.startswith("// metadata-img: "):
                            data["img"] = line[17:]
                        elif line.startswith("// end-metadata"):
                            command_start = i + 1
                            break

                    id = base64.b64encode(hashlib.md5(data["name"].encode()).hexdigest().encode()).decode()[0:16]
                    data["_id"] = id
                    data["_key"] = f"!macros!{id}"

                    data["command"] = "\n".join(lines[command_start:]).replace('"', '"')

                    json_filename = f"{non_alphanumeric.sub("_", data["name"])}_{data["_id"]}.json"
                    output_path = os.path.join(out_directory, json_filename)
                    with open(output_path, "w") as f:
                        json.dump(data, f, indent=2)
                    print(f"Converted: {js_path} -> {output_path}")
                except Exception as e:
                    print(f"Error processing {js_path}: {e}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python js_to_json.py <directory>")
        sys.exit(1)

    in_directory = sys.argv[1]
    if not os.path.isdir(in_directory):
        print(f"Error: {in_directory} is not a valid directory")
        sys.exit(1)

    out_directory = sys.argv[2]
    if not os.path.isdir(out_directory):
        print(f"Error: {out_directory} is not a valid directory")
        sys.exit(1)

    js_to_json(in_directory, out_directory)
