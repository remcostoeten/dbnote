import os

def replace_in_file(file_path, search_str, replace_str):
    with open(file_path, 'r') as file:
        filedata = file.read()
    filedata = filedata.replace(search_str, replace_str)
    with open(file_path, 'w') as file:
        file.write(filedata)

def search_and_replace_in_current_directory(search_str, replace_str):
    current_directory = os.getcwd()
    for root, dirs, files in os.walk(current_directory):
        for file in files:
            if file.endswith(".js") or file.endswith(".jsx"):
                file_path = os.path.join(root, file)
                replace_in_file(file_path, search_str, replace_str)

search_string = "shadCn"
replace_string = "remcostoeten"

search_and_replace_in_current_directory(search_string, replace_string)
print("Search and replace complete.")
