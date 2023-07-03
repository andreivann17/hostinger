import pymysql
import pandas as pd
import base64
import os
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
from sqlalchemy import create_engine
engine = create_engine(connect_info) 
import base64
def AUTH(data):
    consulta ="select up.cajero as cajero from usuarios u inner join usuarios_privilegios up on u.id_usuario = up.id_usuario where nombre =  '"+str(data[0])+"' and cast(AES_DECRYPT(u.password,'admin') as char)  =  '"+str(data[1])+"'"
    df = pd.read_sql_query(sql=consulta, con=engine)
    if len(df)==0:
        return {"value":"0","msg":"Nombre de usuario o contraseña incorrecto"}
    if int(df["cajero"][0]) <2:
        return {"value":"0","msg":"Usuario no autorizado"}
    return {"value":"1"}
def desincreptar(value):
    password  = bytes (str(value), encoding='windows-1255') 
    salt = os.urandom(16)
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=480000,
    )
    key = base64.urlsafe_b64encode(kdf.derive(password))
    f = Fernet(key)
           
    return f.decrypt(value)
def newpassword(clave,password):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.usuarios SET password=AES_ENCRYPT('"+str(password)+"','admin')  where clave_usuario="+str(clave)+""
        cursor.execute(consulta)
        conexion.commit()
def login(users,passw):
    sql = "select token from usuarios_privilegios ac inner join usuarios u on u.id_usuario = ac.id_usuario where  cast(AES_DECRYPT(u.password,'admin') as char)   = '"+passw+"' and UPPER(u.nombre) = '"+users+"' "
    df = pd.read_sql_query(sql=sql, con=engine)
    if len(df)>0:
        return {"status":"1","value":str(df["token"][0])}
    return {"status":False}