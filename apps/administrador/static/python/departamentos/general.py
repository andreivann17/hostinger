from . import departamentos
def get_info(clave):
    data = departamentos.get_info(clave)
    error = "OK"
    if data[0][0] == "":
        error =  "404"
        return error
    return data