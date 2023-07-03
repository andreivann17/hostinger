from . import tipo_contrato
def get_info(clave):
    data = tipo_contrato.get_info(clave)
    error = "OK"
    if data[0][0] == "":
        error =  "404"
        return error
    return data