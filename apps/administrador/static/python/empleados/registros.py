import pymysql
import pandas as pd
from ..utils import registros as registros_util
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import math
def registros(buscador,limit,value,fecha,clave):
    engine = create_engine(connect_info)
    consulta = "SELECT nombre FROM `usuarios`  where  id_usuario = '"+str(clave)+"'"
    df = pd.read_sql_query(sql=consulta, con=engine)
    return [registros_movimientos(buscador,limit,value,fecha,str(clave),str(df["nombre"][0]))]
def registros_movimientos(buscador,limit,value,fecha,clave,nombre):
    concat = "where m.fecha between CAST('" +str(fecha) + "-01' AS DATE) and  CAST('" +str(fecha) + "-31' AS DATE) "
    count_pag = 1
    longitud = 0
    if len(clave)>0:
        concat += " and m.id_usuario = '" +str(clave)+"' " 
    if len(buscador)>0 :
        concat += "  and  m.id_usuario LIKE '%"+buscador+"%' or m.id_movimiento LIKE '%"+buscador+"%' "
    
    concat += "  order by m.id_movimiento asc "
    buscador =concat
    if str(value)!='0':
        value2 = (int(value)+1) * (int(limit)+1)
        value2 -=1                       
        value1 = (int(value)+1) * (int(limit))
        concat += " limit "+str(value1)+","+str(value2)+" "
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "SELECT  m.id_movimiento,tm.nombre,m.ip,concat(m.fecha,' ',m.hora),u.nombre from movimientos m left join tipo_movimientos tm on tm.id_tipo_movimiento = m.id_tipo_movimiento  left join usuarios u on u.id_usuario = m.id_usuario "+concat+"  "
        cursor.execute(consulta)
        json_data = []
        data_cursor = list(cursor.fetchall())
        
        sql = "SELECT *  from movimientos m  left join usuarios u on u.id_usuario = m.id_usuario   "+buscador+""
        longitud = registros_util.get_count_contenido(sql)
        count_pag = int(longitud) / (int(value))    
        count_pag = math.ceil(count_pag) if count_pag % 1 > 0 else int(count_pag)   
        if count_pag ==0:
            count_pag = count_pag +1
        for result in data_cursor: 
            result_lista = list(result)[0:4]          
            result_lista.append(list(result)) 
            json_data.append(result_lista)
        
        return [[json_data,[""]*int(count_pag)],["Fecha","Total",""],["STR","STR","STR","STR","BUTTON"],"Registro de actividad",[["Clave","Nombre","Ingreso Total"],[clave,nombre,longitud]]]
