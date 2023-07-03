from . import empleados
def get_info(clave):
    data = empleados.get_info(clave)
    error = "OK"
    if data["info"]["numEmpleado"] == "":
        error =  "404"
        return error
    return data