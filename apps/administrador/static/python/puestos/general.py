from . import puestos
def get_info(clave):
    data = puestos.get_info(clave)
    error = "OK"
    if data[0][0] == "":
        error =  "404"
        return error
    return data