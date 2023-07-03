import pymysql
import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time
import base64
def get_info():
    data=[]
    engine = create_engine(connect_info) 
    consulta = "SELECT img from logos"
    df = pd.read_sql_query(sql=consulta, con=engine)
    if len(df)>0:
        for box in df["img"].tolist():
            base64_bytes = base64.b64encode(box)
            base64_string = base64_bytes.decode("ascii")
            img = "data:image/png;base64,"+base64_string
            data.append(img)
    return data      
def editando(data,usuario):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        count = 0
        while count<2:
            binary_data = None
            if len(data[count])>0:
                with open(data[count], 'rb') as File:
                    binary_data = File.read()
                    consulta = "UPDATE recursos_humanos.logos SET img  = %s,hora='"+str(time.strftime("%H:%M:%S"))+"' ,fecha='"+str(time.strftime("%Y-%m-%d"))+"', id_usuario = '"+str(usuario)+"' where id="+count+""
                    cursor.execute(consulta,(binary_data))
                    conexion.commit()
            count+=1

