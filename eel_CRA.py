"""Main Python application file for the EEL-CRA demo."""
import logging

logging.basicConfig(filename='C:/Users/andut/Desktop/code/react_projects/CyberChef-ripoff/SwissKnife/App.log',level=logging.DEBUG)

try:
    import os
    import platform
    import random
    import sys

    import eel

    from src.encryption.encode_methods import *
    from src.encryption.cipher_methods import *

    # Use latest version of Eel from parent directory
    sys.path.insert(1, '../../')

    # Encode methods
    @eel.expose  # Expose function to JavaScript
    def base64Encrypt(string):
       return base_64_encrypt(string)
    @eel.expose
    def base64Decrypt(string):
       return base_64_decrypt(string)

    @eel.expose  
    def rot13(string):
       return rot_13(string)

    @eel.expose
    def rot47(string):
       return rot_47(string)

    @eel.expose  
    def morseEncrypt(string):
       return morse_encrypt(string)
    @eel.expose
    def morseDecrypt(string):
       return morse_decrypt(string)    


    # Cipher methods
    @eel.expose
    def vigenereEncode(string, key):
        print(string)
        print(key)
        return vigenere_encode(string, key)
    @eel.expose
    def vigenereDecode(string, key):
        return vigenere_decode(string, key)

    @eel.expose
    def caesarEncode(string, key):
        return caesar_encode(string, key)
    @eel.expose
    def caesarDecode(string, key):
        return caesar_decode(string, key)

    @eel.expose
    def transpositionEncode(string, key):
        return transposition_encode(string, key)
    @eel.expose
    def transpositionDecode(string, key):
        return transposition_decode(string, key)
    


    def start_eel(develop):
        """Start Eel with either production or development configuration."""

        if develop:
            directory = 'src'
            app = None
            page = {'port': 3000}
        else:
            directory = 'build'
            app = 'chrome-app'
            page = 'index.html'

        eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

        eel.show_log('https://github.com/samuelhwilliams/Eel/issues/363 (show_log)')

        eel_kwargs = dict(
            host='localhost',
            port=8080,
            size=(1280, 800),
        )
        try:
            eel.start(page, mode=app, **eel_kwargs)
        except EnvironmentError:
            # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
            if sys.platform in ['win32', 'win64'] and int(platform.release()) >= 10:
                eel.start(page, mode='edge', **eel_kwargs)
            else:
                raise


    if __name__ == '__main__':
        import sys

        # Pass any second argument to enable debugging
        
        start_eel(develop=len(sys.argv) == 2)

except Exception as e:
    logging.info(e)