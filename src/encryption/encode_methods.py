
"""
Prin librarie:-_-
def encode64_with_import_library(s):
    import base64
    mesage_in_bytes=mesage.encode("ascii")
    base64_mesage=base64.b64encode(mesage_in_bytes)
    return base64_mesage
"""

MORSE_CODE_DICT = {'A': '.-','a':'.-', 'B': '-...','b': '-...',
                       'c': '-.-.','C': '-.-.','d': '-..' ,'D': '-..','e': '.', 'E': '.',
                       'f': '..-.','F': '..-.', 'g': '--.','G': '--.',  'h': '....','H': '....',
                       'I': '..',  'i': '..', 'J': '.---', 'j': '.---','K': '-.-','k': '-.-',
                       'L': '.-..','l': '.-..', 'M': '--','m': '--', 'N': '-.','n': '-.',
                       'O': '---','o': '---', 'P': '.--.','p': '.--.', 'Q': '--.-','q': '--.-',
                       'R': '.-.','r': '.-.', 'S': '...','s': '...', 'T': '-','t': '-',
                       'U': '..-','u': '..-', 'V': '...-','v': '...-', 'W': '.--','w': '.--',
                       'X': '-..-','x': '-..-', 'Y': '-.--','y': '-.--', 'Z': '--..','z': '--..',
                       '1': '.----', '2': '..---', '3': '...--',
                       '4': '....-', '5': '.....', '6': '-....',
                       '7': '--...', '8': '---..', '9': '----.',
                       '0': '-----', ', ': '--..--', '.': '.-.-.-',
                       '?': '..--..', '/': '-..-.', '-': '-....-',
                       '(': '-.--.', ')': '-.--.-'}

def base64_encode(s):
    """
    Base64 este o notație pentru codificarea datelor arbitrare de octet folosind un set restricționat de simboluri care
    pot fi utilizate în mod convenabil de oameni și prelucrate de computere.

    Această operație codifică datele brute într-un șir ASCII Base64.

    De exemplu, hello devine aGVsbG8=
    :param s:
    :return encode:
    """
    i = 0
    base64 = ending = ''
    base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    pad = 3 - (len(s) % 3)
    if pad != 3:
        s += "A" * pad
        ending += '=' * pad

    while i < len(s):
        b = 0

        for j in range(0, 3, 1):

            n = ord(s[i])
            i += 1

            b += n << 8 * (2 - j)

        base64 += base64chars[(b >> 18) & 63]
        base64 += base64chars[(b >> 12) & 63]
        base64 += base64chars[(b >> 6) & 63]
        base64 += base64chars[b & 63]
    if pad != 3:
        base64 = base64[:-pad]
        base64 += ending

    return base64

def base64_decode(s):
    """
    Base64 este o notație pentru codificarea datelor arbitrare de octet folosind un set restricționat de simboluri care
    pot fi utilizate în mod convenabil de oameni și prelucrate de computere.

    Această operațiune decodează datele dintr-un șir ASCII Base64 înapoi în formatul său brut.

    De exemplu, aGVsbG8= devine hello
    :param s:
    :return decode:
    """
    i = 0
    base64 = decoded = ''
    base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

    if s[-2:] == '==':
        s = s[0:-2] + "AA"
        padd = 2
    elif s[-1:] == '=':
        s = s[0:-1] + "A"
        padd = 1
    else:
        padd = 0

    while i < len(s):
        d = 0
        for j in range(0, 4, 1):
            d += base64chars.index(s[i]) << (18 - j * 6)
            i += 1

        decoded += chr((d >> 16) & 255)
        decoded += chr((d >> 8) & 255)
        decoded += chr(d & 255)

    decoded = decoded[0:len(decoded) - padd]

    return decoded

def drawing_authors():
    """
     Deseneaza autori,denumirea.
    """
    print("""
                                     .:^
            ^                      /   :
'`.       /;/                     /    /
\ \      /;/                     /    /
 \\ \    /;/                     /  ///
  \\ \  /;/                     /  ///
   \  \/_/____________________/    /
    `/                         \  /
    |  Swiss knife              |
     \_________________________/
Authors=======> Seremet A. Chihai A. Chirita S 
----------------------------------------------------------------------
 """, end="")

def rot13(s):
    """
    "rotație de 13 poziții", câteodată scris ca și ROT-13) este o metodă simplă de codificare folosită în special pe
    forum-urile online pentru a masca spoilere, glume, soluțiile unui puzzle, precum și materiale ofensatoare.
    """
    chars = "abcdefghijklmnopqrstuvwxyz"
    trans = chars[13:] + chars[:13]
    rot_char = lambda c: trans[chars.find(c)] if chars.find(c) > -1 else c
    return ''.join(rot_char(c) for c in s)

"""
Nu lucreaza to do it
def rot13_decode(s):
    chars = "abcdefghijklmnopqrstuvwxyz"
    trans = chars[13:] - chars[:13]
    rot_char = lambda c: trans[chars.find(c)] if chars.find(c) > -1 else c
    return ''.join(rot_char(c) for c in s)
"""

def rot47(data):
    """
    O variație puțin mai complexă a unui cifru cezar, care include caractere ASCII de la 33 '!' la 126 '~'. Rotire
    implicită: 47.
    :param data:
    :return ''.join(decode)
    """
    decode = []
    for i in range(len(data)):
        encoded = ord(data[i])
        if encoded >= 33 and encoded <= 126:
            decode.append(chr(33 + ((encoded + 14) % 94)))
        else:
            decode.append(data[i])
    return ''.join(decode)

def morse_encrypt(message):
    """
    Codul Morse sau alfabetul Morse este o metodă de transmitere a informației folosind secvențe standardizate de semne
     sau pulsații scurte și lungi - cunoscute în mod comun ca „puncte” și „linii” - pentru litere, cifre și caracterele
     speciale specifice oricărui mesaj.
    :param message:
    :return cipher :
    """
    cipher = ''
    for letter in message:
        if letter != ' ':
            cipher += MORSE_CODE_DICT[letter] + ' '
        else:
            cipher += ' '

    return cipher

def morse_decrypt(message):
    """
        Codul Morse sau alfabetul Morse este o metodă de transmitere a informației folosind secvențe standardizate de semne
         sau pulsații scurte și lungi - cunoscute în mod comun ca „puncte” și „linii” - pentru litere, cifre și caracterele
         speciale specifice oricărui mesaj.
        :param message:
        :return decipher:
        """
    message += ' '
    decipher = ''
    citext = ''
    for letter in message:
        if (letter != ' '):
            i = 0
            citext += letter
        else:
            i += 1
            if i == 2:
                decipher += ' '
            else:
                decipher += list(MORSE_CODE_DICT.keys())[list(MORSE_CODE_DICT
                                                              .values()).index(citext)]
                citext = ''
    return decipher

drawing_authors()
