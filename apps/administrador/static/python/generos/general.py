from . import generos
def get_info(clave):
    data = generos.get_info(clave)
    error = "OK"
    if data[0][0] == "":
        error =  "404"
        return error
    return data