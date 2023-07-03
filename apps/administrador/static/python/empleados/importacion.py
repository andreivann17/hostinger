import xml.etree.ElementTree as ET

# Cargar el archivo XML
tree = ET.parse('archivo.xml')
root = tree.getroot()

# Función recursiva para obtener la información de los elementos
def obtener_informacion(elemento):
    informacion = {
        'tag': elemento.tag,
        'atributos': elemento.attrib,
        'texto': elemento.text.strip() if elemento.text else None,
        'hijos': []
    }
    for hijo in elemento:
        informacion['hijos'].append(obtener_informacion(hijo))
    return informacion

# Obtener la información del elemento raíz y sus hijos recursivamente
informacion_xml = obtener_informacion(root)

# Imprimir la información
print(informacion_xml["hijos"][3]["hijos"][0]["atributos"]["FechaInicialPago"])



