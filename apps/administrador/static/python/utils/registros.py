import pymysql
import base64
import pandas as pd
import math
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
def get_count_contenido(consulta):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        cursor.execute(consulta)
        datacursos = list(cursor.fetchall())

        return len(datacursos)
def cards(buscador,limit,value,tabla,id_campo,nombre_campo):
    concat = ''
    countpag = 1
    if len(buscador)>0 :
        buscador  = "where activo = 1 and nombre LIKE '%"+buscador+"%' or "+str(id_campo)+" LIKE '%"+buscador+"%' order by nombre asc "
    else:
        buscador = "where activo = 1 order by nombre asc"
    concat +=buscador
    if str(value) !="0":
        value2 = (int(value)+1) * (int(limit)+1)
        value2 -=1                       
        value1 = (int(value)+1) * (int(limit))
        concat += " limit "+str(value1)+","+str(value2)+" " 
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "Select  "+str(id_campo)+","+str(nombre_campo)+",img from "+tabla+" "+concat+"  "
        cursor.execute(consulta)
        json_data = []
        datacursos = list(cursor.fetchall())
        if str(value) !="0":
            sql = "SELECT * from "+tabla+"  "+buscador+""
            longitud = get_count_contenido(sql)
            countpag = int(longitud) / (int(value))    
        countpag = math.ceil(countpag) if countpag % 1 > 0 else int(countpag)   
        if countpag ==0:
            countpag = countpag +1
        for result in datacursos: 
            resultlista = list(result)    
            json_data.append({"id":str(resultlista[0]),"nombre":resultlista[1],"img":str(resultlista[2])}) 
          
        return {"contenido":json_data,"count":[""] *int(countpag)}


def codigo_existente(idpast,id,table,id_campo,tipo):
    engine = create_engine(connect_info, pool_pre_ping=True)
    sql = "SELECT * from "+table+" where "+id_campo+" = '"+str(id)+"' and activo = 1"
    df = pd.read_sql_query(sql=sql, con=engine)
    if len(df)==0 or  (len(df)>0 and str(idpast) == str(id) and tipo =="EDITANDO"):
        return True
    else:
        return False

