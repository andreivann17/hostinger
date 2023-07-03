import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
from ..utils import dashboard
def get_info_card(fecha,clave):
    engine = create_engine(connect_info)
    consulta  = """SELECT  COALESCE(( SELECT COUNT(*) FROM movimientos WHERE id_usuario = u.id_usuario AND  id_tipo_movimiento = 66 AND fecha BETWEEN CAST('"""+fecha+"""-01' AS DATE) AND CAST('"""+fecha+"""-31' AS DATE) ), 0) AS iniciado_sesion,COALESCE(count(m.id_usuario), 0) AS total FROM
        usuarios u LEFT JOIN ( SELECT id_usuario FROM movimientos WHERE fecha BETWEEN CAST('"""+fecha+"""-01' AS DATE) AND CAST('"""+fecha+"""-31' AS DATE) )
          AS m ON u.id_usuario = m.id_usuario AND u.clave_usuario = '"""+str(clave)+"""'"""
    
    df = pd.read_sql_query(sql=consulta, con=engine)
    fechalast = dashboard.get_fecha_last(fecha)
    
    consulta  =  """SELECT  COALESCE(( SELECT COUNT(*) FROM movimientos WHERE id_usuario = u.id_usuario AND id_tipo_movimiento = 66 AND fecha BETWEEN CAST('"""+fechalast+"""-01' AS DATE) AND CAST('"""+fechalast+"""-31' AS DATE) ), 0) AS iniciado_sesion,COALESCE(count(m.id_usuario), 0) AS total FROM
        usuarios u LEFT JOIN ( SELECT id_usuario FROM movimientos WHERE fecha BETWEEN CAST('"""+fechalast+"""-01' AS DATE) AND CAST('"""+fechalast+"""-31' AS DATE) )
          AS m ON u.id_usuario = m.id_usuario AND u.clave_usuario = '"""+str(clave)+"""'"""
    dfv = pd.read_sql_query(sql=consulta, con=engine)
    data = dashboard.set_info_card(df.values[0][0:2],dfv.values[0][0:2],["",""])
    return [[data[0],["# inicio de sesion","# Total Actividades"]],[dfv["total"][0],df["total"][0],"movimientos","Ingreso","# Actividades"]]
def get_query(fecha,clave):
    total = "count(m.id_usuario)"
    prefijo = "m"
    inner = " inner join usuarios u on u.id_usuario = m.id_usuario"
    where = " and u.clave_usuario = '"+str(clave)+"'"
    return {"inner":inner,"where":where,"total":total,"prefijo":prefijo,"tabla":"movimientos m ","fecha":fecha}
def get_query_mes(fecha,clave):
    total = "count(m.id_usuario)"
    prefijo = "m"
    inner = "left join movimientos m  ON MONTH(m.fecha) = meses.mes_id left usuarios u on u.id_usuario = m.id_usuario"
    where = " where u.clave_usuario = '"+str(clave)+"'"
    return {"inner":inner,"where":where,"total":total,"prefijo":prefijo,"tabla":"","fecha":fecha}
def get_query_dias():
     return """
            SELECT DAY(m.fecha), count(m.id_movimiento)
            FROM  movimientos m  
            left join usuarios u on u.id_usuario = id_usuario
            
           
            WHERE MONTH(m.fecha) = %s
            AND YEAR(m.fecha) = %s
               and  u.clave_usuario = %s
            GROUP BY DAY(m.fecha)
       
            """
def get_sql_comparacion(fecha,clave,total_value):
    total = "count(m.id_usuario)"
    prefijo = "m"
    nombre = "u.nombre "
    campo = " u.id_usuario, u.nombre,1"
    tabla = "usuarios u) u "
    inner = " left join movimientos m on m.id_usuario = u.id_usuario "
    tabla_total = "movimientos m"
    group_by = "u.nombre"
    return {"currency":"","data_table":["Nombre","Actividades","Resultado"],"data_tabletipo":["STR","STR","STR"],"columna_total":"count(m.id_usuario)","tabla_total":tabla_total,"total_value":total_value,"fecha":fecha,"inner":inner,"total":total,"prefijo":prefijo,"tabla":tabla,"nombre":nombre,"group_by":group_by,"campo":campo}
def dashboard(fecha,clave):
    data = []
    sub_data = []   
    for value in list(range(0,1)):
        box_master = []
        box = get_info_card(fecha,clave) 
        box_master.append(box[0])
        box_master.append(box[1])
        box_master.append(dashboard.get_sql_semana(get_query(fecha,clave)))
        box_master.append(dashboard.get_sql_hora(get_query(fecha,clave)))
        box_master.append(dashboard.get_sql_dias(fecha,clave,get_query_dias()))
        box_master.append(dashboard.get_sql_mes(get_query_mes(fecha,clave)))
        box_master.append(dashboard.get_info_comparacion(get_sql_comparacion(fecha,clave,box[1][1]),"Comparacion de actividades entre usuarios"))
        sub_data.append(box_master)
        
    data.append(sub_data)
    data.append(dashboard.get_info_meses())


    return data