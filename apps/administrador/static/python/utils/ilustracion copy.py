from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os
def agregando(file_obj, name):
    print(file_obj)
    ruta_destino = os.path.join("media", name)
    default_storage.save(ruta_destino, ContentFile(file_obj))
    return True
