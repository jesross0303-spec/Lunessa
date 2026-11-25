"""
Servidor local ultraligero para BEAUTE CRM & Catálogo
Abre automáticamente el navegador en http://localhost:8000
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def run():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}/index.html"
        print("=" * 60)
        print("  BEAUTE - Software CRM & Catalogo Dermo-Estetico")
        print("  Directora: Jesmary Rossell")
        print("  WhatsApp: +57 3134880917")
        print("=" * 60)
        print(f"  Servidor iniciado en: {url}")
        print("  Presiona CTRL + C para detener el servidor.")
        print("=" * 60)
        try:
            webbrowser.open(url)
        except Exception:
            pass
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServidor detenido.")
            sys.exit(0)

if __name__ == "__main__":
    run()
