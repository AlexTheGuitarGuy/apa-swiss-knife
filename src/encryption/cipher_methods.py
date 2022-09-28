# import pyperclip
import math
import hashlib
from Crypto.Hash import MD5, MD4, MD2


# Vigenere Cipher
def generateKey(string, key):
    key = list(key)
    if len(string) == len(key):
        return (key)
    else:
        for i in range(len(string) -
                       len(key)):
            key.append(key[i % len(key)])
    return ("".join(key))


def vigenere_cipher(string, key):
    cipher_text = []
    for i in range(len(string)):
        x = (ord(string[i]) +
             ord(key[i])) % 26
        x += ord('A')
        cipher_text.append(chr(x))
    return ("".join(cipher_text))


def vigenere_decode(cipher_text, key):
    orig_text = []
    for i in range(len(cipher_text)):
        x = (ord(cipher_text[i]) -
             ord(key[i]) + 26) % 26
        x += ord('A')
        orig_text.append(chr(x))
    return ("".join(orig_text))


# Caesar Cipher
def caesar_encode(text, s):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if (char.isupper()):
            result += chr((ord(char) + s - 65) % 26 + 65)
        else:
            result += chr((ord(char) + s - 97) % 26 + 97)
    return result


def caesar_decode(text, s):
    result = ""
    for i in range(len(text)):
        char = text[i]
        if (char.isupper()):
            result += chr((ord(char) - s - 65) % 26 + 65)
        else:
            result += chr((ord(char) - s - 97) % 26 + 97)
    return result


def caesar_brut_force(message):
    LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    str = message.upper()
    for key in range(len(LETTERS)):
        translated = ''
        for symbol in str:
            if symbol in LETTERS:
                num = LETTERS.find(symbol)
                num = num - key
                if num < 0:
                    num = num + len(LETTERS)
                translated = translated + LETTERS[num]
            else:
                translated = translated + symbol
        print('Hacking key #%s: %s' % (key, translated))


# Transpozition cipher
def transpozition_encode(key, message):
    ciphertext = [''] * key

    for col in range(key):
        position = col
        while position < len(message):
            ciphertext[col] += message[position]
            position += key
    return ''.join(ciphertext)  # Cipher text


def transpozition_decode(key, message):  # print(transpozition_encode(6,'Toners raiCntisippoh'))
    numOfColumns = math.ceil(len(message) / key)
    numOfRows = key
    numOfShadedBoxes = (numOfColumns * numOfRows) - len(message)
    plaintext = float('') * numOfColumns
    col = 0
    row = 0

    for symbol in message:
        plaintext[col] += symbol
        col += 1
        if (col == numOfColumns) or (col == numOfColumns - 1 and row >= numOfRows - numOfShadedBoxes):
            col = 0
            row += 1
            return ''.join(plaintext)


def revers_encode(message):
    translated = ''
    i = len(message) - 1

    while i >= 0:
        translated = translated + message[i]
        i = i - 1
    return translated


# Shashing algorithm
def hash_md4(messoge):
    text = messoge
    hashObject = MD4.new(text.encode('utf-8'))
    digest = hashObject.hexdigest()
    return digest


def hash_md5(messoge):
    text = messoge
    hashObject = MD5.new(text.encode('utf-8'))
    digest = hashObject.hexdigest()
    return digest


def hash_md2(messoge):
    text = messoge
    hashObject = MD2.new(text.encode('utf-8'))
    digest = hashObject.hexdigest()
    return digest


# BrainFuke--only decode
def block(code):
    opened = []
    blocks = {}
    for i in range(len(code)):
        if code[i] == '[':
            opened.append(i)
        elif code[i] == ']':
            blocks[i] = opened[-1]
            blocks[opened.pop()] = i
    return blocks


def parse(code):
    return ''.join(c for c in code if c in '><+-.,[]')


def run(code):
    code = parse(code)
    x = i = 0
    bf = {0: 0}
    blocks = block(code)
    l = len(code)
    while i < l:
        sym = code[i]
        if sym == '>':
            x += 1
            bf.setdefault(x, 0)
        elif sym == '<':
            x -= 1
        elif sym == '+':
            bf[x] += 1
        elif sym == '-':
            bf[x] -= 1
        elif sym == '.':
            print(chr(bf[x]), end='')
        elif sym == ',':
            bf[x] = int(input('Input: '))
        elif sym == '[':
            if not bf[x]: i = blocks[i]
        elif sym == ']':
            if bf[x]: i = blocks[i]
        i += 1


run("++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.")
print(hash_md4("hfbcuerbc"))
print(hash_md5("hfbcuerbc"))
print(hash_md2("hfbcuerbc"))
