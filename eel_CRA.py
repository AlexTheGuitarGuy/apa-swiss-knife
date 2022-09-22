"""Main Python application file for the EEL-CRA demo."""

import os
import platform
import random
import sys

import eel

from src.encryption.encode_methods import *

# Use latest version of Eel from parent directory
sys.path.insert(1, '../../')

@eel.expose  # Expose function to JavaScript
def base64_encode_js(string):
    eel.show_log(base64_encode(string))

@eel.expose  # Expose function to JavaScript
def base64_decode_js(string):
    eel.show_log(base64_decode(string))
    


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