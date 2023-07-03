import pymysql
from django.utils.crypto import get_random_string
import pandas as pd
import base64
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time
from . import privilegios
def get_info(id):
    engine = create_engine(connect_info) 
    data = [["","","","",""]]
    img = ""
    if  id != None and id!="":
        consulta = """SELECT u.clave_usuario,u.nombre ,cast(AES_DECRYPT(u.password,'admin') as char),u.token,u.img from usuarios u where u.id_usuario = """+str(id)
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            if len(df['img'][0])>0:
                base64_bytes = base64.b64encode(df['img'][0])
                base64_string = base64_bytes.decode("ascii")
                img = "data:image/png;base64,"+base64_string
            data =[]
            data.append(df.to_numpy().tolist()[0][0:4]) 
    data.append(img)
    data.append(privilegios.get_info(id))
            
    return data

def agregando(data,usuario,img):
    token = get_random_string(length=50)
    consulta = 'insert into  recursos_humanos.usuarios (clave_usuario,nombre,password,token,fecha,hora,id_usuario_create,activo)  VALUES ("'+str(data[0])+'", "'+str(data[1])+'",AES_ENCRYPT("'+str(data[3])+'","admin"), "'+str(token)+'","'+str(time.strftime("%Y-%m-%d"))+'","'+str(time.strftime("%H:%M:%S"))+'","'+str(usuario)+'",1);'
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:  
        cursor.execute(consulta)  
        conexion.commit() 
        #objmenus.editarimg(img,data[0],"usuarios")   
def editando(data,clave,usuario):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.usuarios SET clave_usuario  = '"+str(data[0])+"',nombre  = '"+str(data[1])+"',password=AES_ENCRYPT('"+str(data[2])+"','admin'),activo  = '1' , id_usuario_create = '"+str(usuario)+"' where clave_usuario="+str(clave)+""
        cursor.execute(consulta)
        conexion.commit()
def eliminando(clave):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "update usuarios set activo = 0 where clave_usuario = '" +str(clave)+ "'"
        cursor.execute(consulta)
        conexion.commit() 