import pymysql
import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time
def get_info():
    data=[]
    engine = create_engine(connect_info) 

    consulta = "SELECT dlls from divisas where id  = 1"
    df = pd.read_sql_query(sql=consulta, con=engine)
    if len(df)>0:
        data =df.to_numpy().tolist()[0] 
    return data

def editando(data,usuario): 
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.divisas SET dlls  = '"+str(data)+"',hora='"+str(time.strftime("%H:%M:%S"))+"' ,fecha='"+str(time.strftime("%Y-%m-%d"))+"', id_usuario = '"+str(usuario)+"'  where id=1"
        cursor.execute(consulta)
        conexion.commit()