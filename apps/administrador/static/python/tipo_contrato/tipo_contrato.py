import pymysql
from django.utils.crypto import get_random_string
import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time
def get_info(id):
    engine = create_engine(connect_info) 
    datainfo = {"tipoContratoID":"","nombre":"","fecha":""}
    if  id != None and id!="":
        consulta = """SELECT tipo_contratoID,nombre,usuarioID, fecha  from tipo_contrato where tipo_contratoID = """+str(id)
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            datainfo = df.iloc[0].to_dict()
    return   {"info": datainfo}

def get_info_combo():
    engine = create_engine(connect_info) 
    consultaprod = "Select  tipo_contratoID,nombre from tipo_contrato  where activo = 1 "
    dfprod = pd.read_sql_query(sql=consultaprod, con=engine)
    return dfprod.to_numpy().tolist()
def agregando(data,usuario):
    token = get_random_string(length=50)
    consulta = 'insert into  recursos_humanos.tipo_contrato (nombre,fecha,usuarioID,activo)  VALUES ("'+str(data['nombre'])+'","'+str(time.strftime("%Y-%m-%d %H:%M:%S"))+'","'+str(usuario)+'",1);'
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:  
        cursor.execute(consulta)  
        conexion.commit() 
        #cursor.lastrowid
        #objmenus.editarimg(img,data[0],"usuarios")   
def editando(data,clave,usuario):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.tipo_contrato SET nombre  = '"+str(data['nombre'])+"', usuarioID = '"+str(usuario)+"' where tipo_contratoID="+str(clave)+""
        cursor.execute(consulta)
        conexion.commit()
def eliminando(clave):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "update tipo_contrato set activo = 0 where tipo_contratoID = '" +str(clave)+ "'"
        cursor.execute(consulta)
        conexion.commit() 