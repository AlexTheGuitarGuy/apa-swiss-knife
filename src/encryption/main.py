import json
import encode_methods
import cipher_methods

# Tema --> Codarea și cifrarea cu ajutorul algoritmicilor criptografice  în aplicație.
if __name__ == '__main__':
    with open('somethink_json.json', 'r') as openfile:

        json_object = json.load(openfile)
    print("Your string->", json_object["clear_text"])
    print("Json ->", json_object)

    if json_object["method"] == "rot13":
        json_object["cipher_text"] = encode_methods.rot13(json_object["clear_text"])
    elif json_object["method"] == "rot47":
        json_object["cipher_text"] = encode_methods.rot47(json_object["clear_text"])
    elif json_object["method"] == "base64_encode":
        json_object["cipher_text"] = encode_methods.base64_encode(json_object["clear_text"])
    elif json_object["method"] == "vigenere":
        key = cipher_methods.generateKey(json_object["clear_text"], json_object["key"])
        json_object["cipher_text"] = cipher_methods.vigenere_cipher_cipher(json_object["clear_text"], key)
    elif json_object["method"] == "vigenere_clear":
        key = cipher_methods.generateKey(json_object["clear_text"], json_object["key"])
        json_object["cipher_text"] = cipher_methods.vigenere_cipher_clear(json_object["clear_text"], key)

    print("Json after encode->", json_object)
    with open("somethink_json.json", "w") as outfile:
        json.dump(json_object, outfile)

    """ TO DO IT
    match json_object["method"]:
        case 'rot13':
            cipher_mesage = encode_methods.rot13(json_object["clear_text"])
        case 'rot47':
            cipher_mesage = encode_methods.rot47(json_object["clear_text"])
    """
