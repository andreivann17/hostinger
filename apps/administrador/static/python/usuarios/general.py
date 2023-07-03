from . import usuarios
def get_info(clave):
    data = usuarios.get_info(clave)
    error = "OK"
    if data[0][0] == "":
        error =  "404"
        return error
    return data