import pymysql
import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time 
import json
def get_info(id):
    engine = create_engine(connect_info) 
    if  id != None:
        consulta = "SELECT id,nombre,usuario,ip,fecha,hora,id_objeto  from movimientos where id = '"+str(id)+"'"
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            result = df.to_dict(orient='records')
            nested_result = [result]
            json_data = json.dumps(nested_result)
            return json_data
    return []
def agregando(id_tipo_movimiento,ip,subid,id_usuario):
    
    consulta = "insert into  recursos_humanos.movimientos (id_tipo_movimiento, ip, id_objeto,fecha,hora,id_usuario)  VALUES ('"+str(id_tipo_movimiento)+"','"+str(ip)+"','"+str(subid)+"','"+str(time.strftime("%Y-%m-%d"))+"','"+str(time.strftime("%H:%M:%S"))+"','"+str(id_usuario)+"');"
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:  
        cursor.execute(consulta)  
        conexion.commit()             
