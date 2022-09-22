import json
f = open('somethink_json.json')
data = json.load(f)
print(data["age"])
f.close()