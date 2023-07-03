import pymysql
import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
label = ["Menus","Productos","Promociones","Proveedores","Contabilidad","Meseros","Mesas","Usuarios"]
privilegios = ["Sin privilegio","Solo consulta","Editar y eliminar"]
def get_info(id):
    engine = create_engine(connect_info) 
    data = []
    if  id != None and id!="":
        consulta = """SELECT menus,productos,promociones,proveedores,contabilidad,meseros,mesas,usuarios from usuarios_privilegios up inner join usuarios up.id_usuario = p.id_usuario    where clave_usuario = """+str(id)        
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            return [label,df.values[0],privilegios]
    return [label,data,privilegios] 
def agregando(data,id_clave):
    engine = create_engine(connect_info) 
    consulta = "SELECT id_usuario FROM `usuarios`  where  clave_usuario = '"+str(id_clave)+"'"
    df = pd.read_sql_query(sql=consulta, con=engine)
    clave = df["id_usuario"][0]
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        values = "', '".join(data)
        consulta = f"INSERT INTO recursos_humanos.usuarios_privilegios (id_usuario, menus, productos, promociones, proveedores, contabilidad, meseros, mesas, usuarios) VALUES ('{clave}', '{values}');"
        cursor.execute(consulta)
        conexion.commit()
def editando(data,id_clave):
    engine = create_engine(connect_info) 
    consulta = "SELECT id_usuario FROM `usuarios`  where  clave_usuario = '"+str(id_clave)+"'"
    df = pd.read_sql_query(sql=consulta, con=engine)
    clave = df["id_usuario"][0]
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.usuarios_privilegios SET menus  = '"+str(data[0])+"',productos  = '"+str(data[1])+"',promociones  = '"+str(data[2])+"',proveedores='"+str(data[3])+"',contabilidad='"+str(data[4])+"',meseros='"+str(data[5])+"',mesas='"+str(data[6])+"',usuarios='"+str(data[7])+"' where id_usuario="+str(clave)+""
        cursor.execute(consulta)
        conexion.commit()   