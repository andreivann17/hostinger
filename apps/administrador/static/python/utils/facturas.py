import pymysql
from django.utils.crypto import get_random_string
import pandas as pd
from datetime import date, datetime, timedelta
import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
engine = create_engine(connect_info) 
import base64
import time
def getinfo(id):
    data = ["","","","","","","","","","","",""]
    if  id != None:
        consulta = "SELECT id,nombre,total,fecha,hora,proveedor,folio,factura from facturas where id = '"+str(id)+"'"
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            data =df.to_numpy().tolist()[0] 
    return data
def getinfoitems(id):
    datareturn = []
    if  id != None:
        consulta = "SELECT id,idfactura,idproducto,fecha,hora,total,cantidad from facturas_items where idfactura = '"+str(id)+"'"
        df = pd.read_sql_query(sql=consulta, con=engine)
        data = df.to_numpy().tolist()
        counter = 0
        while(counter<len(df)):
            datareturn.append({"id":str(data[counter][0]),"idfactura":data[counter][1],"idproducto":str(data[counter][2]),"fecha":data[counter][3],"hora":data[counter][4],"total":data[counter][5],"cantidad":data[counter][6]})
            counter +=1
    return datareturn
def contenido(buscador,limit,value):
    concat = ''
    value1 = ''
    value2 = ''
    if len(buscador)>0 :
        concat  = "where nombre LIKE '%"+buscador+"%' or id LIKE '%"+buscador+"%' order by fecha desc "
    else:
        concat = "order by fecha desc "
    if limit!='0':
        value2 = int(value) * int(limit)
        value1 = str(int(value2) - int(limit))
        concat += " limit "+str(value1)+","+str(value2)+" "  
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "Select  id,nombre,total,fecha,hora from facturas "+concat+"  "
        cursor.execute(consulta)
        json_data = []
        for result in cursor.fetchall():
            json_data.append({"id":str(result[0]),"nombre":result[1],"total":str(result[2]),"fecha":str(result[3]),"hora":str(result[4])})
        return json_data

def agregando(data):
    consulta = "insert into  recursos_humanos.facturas (nombre,total,factura,proveedor,folio,fecha,hora,fechacreacion,horacreacion)  VALUES ('"+data[0]+"', '"+data[1]+"','"+data[2]+"','"+data[3]+"','"+data[4]+"','"+time.strftime("%d-%m-%Y")+"','"+time.strftime("%H:%M:%S")+"','"+time.strftime("%d-%m-%Y")+"','"+time.strftime("%H:%M:%S")+"');"
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:  
        cursor.execute(consulta)  
        conexion.commit()
        agregandoitems(data[5])
def agregandoitems(data):
    consulta = "SELECT id from facturas order by id desc limit 0,1"
    df = pd.read_sql_query(sql=consulta, con=engine)
    counter = 0
    while(counter<len(data)):
        consulta = "insert into  recursos_humanos.facturas_items (idfactura,idproducto,total,cantidad)  VALUES ('"+str(df["id"][0])+"','"+data[counter][0]+"', '"+data[counter][1]+"','"+data[counter][2]+"');"
        conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
        with conexion.cursor() as cursor:  
            cursor.execute(consulta)  
            conexion.commit()
        counter+=1             
def editando(data):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.facturas SET nombre  = '"+str(data[0])+"',total='"+str(data[1])+"',factura='"+str(data[2])+"' ,proveedor='"+str(data[3])+"' ,folio='"+str(data[4])+"'" 
        consulta +=" ,hora='"+str(time.strftime("%H:%M:%S"))+"' ,fecha='"+str(time.strftime("%d-%m-%Y"))+"'  where id="+str(data[5])+""
        cursor.execute(consulta)
        conexion.commit()
def delete(clave):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "update facturas set activo = 0 where id = '" +str(clave)+ "'"
        cursor.execute(consulta)
        conexion.commit() 
    