import pymysql
import pandas as pd
from ..Utils import registros as registros_util
import math
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
def registros(buscador,limit,value,clave):
    engine = create_engine(connect_info) 
    consulta = "SELECT id_usuario,nombre FROM `usuarios`  where  id_usuario = '"+str(clave)+"'"
    df = pd.read_sql_query(sql=consulta, con=engine)
    return [registros_movimientos(buscador,limit,value,str(df["id_usuario"][0]),str(df["nombre"][0]))]
    
def registros_movimientos(buscador,limit,value,clave,nombre):
    concat = " "
    count_pag = 1
    longitud = 0
    if len(clave)>0:
        concat += " where u.id_usuario = '" +clave+"' " 
    if len(buscador)>0 :
        if len(clave)>0:
            concat  +=  "  and  tm.nombre LIKE '%"+buscador+"%' or m.id_movimiento LIKE '%"+buscador+"%' "
        else:
            concat  +=  "  where  tm.nombre LIKE '%"+buscador+"%'  or m.id_movimiento LIKE '%"+buscador+"%' "
        
    
    concat +=  "  order by m.fecha desc "
    buscador =concat    
    if str(value)!='0':
        value2 = (int(value)+1) * (int(limit)+1)
        value2 -=1                       
        value1 = (int(value)+1) * (int(limit))
        concat += " limit "+str(value1)+","+str(value2)+" " 
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "Select  m.id_movimiento,tm.nombre,m.ip,m.fecha,m.hora from movimientos m  inner join tipo_movimientos tm on m.id_tipo_movimiento = tm.id_tipo_movimiento   inner join usuarios u on u.id_usuario = m.id_usuario "+concat+"  "
        cursor.execute(consulta)
        json_data = []
        data_cursor = list(cursor.fetchall())
        if str(value)!='0':
            sql = "Select  m.id_movimiento from movimientos m inner join tipo_movimientos tm on m.id_tipo_movimiento = tm.id_tipo_movimiento  inner join usuarios u on u.id_usuario = m.id_usuario   "+buscador+""
            longitud = registros_util.get_count_registros(sql)
            count_pag = int(longitud) / (int(value))    
        count_pag = math.ceil(count_pag) if count_pag % 1 > 0 else int(count_pag)   
        if count_pag ==0:
            count_pag = count_pag +1
        for result in data_cursor: 
            result_lista = list(result)[0:5]          
            json_data.append(result_lista)
     
        return [[json_data,[""] *int(count_pag)],["ID","Nombre","IP","Fecha"],["STR","STR","STR","STR"],"Registro de movimientos",[["Clave","Nombre de usuario","# Acciones"],[clave,nombre,longitud]]]
