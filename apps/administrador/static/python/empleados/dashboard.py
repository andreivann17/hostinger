import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
from ..utils.dashboard import get_fecha_last,set_info_card,get_info_comparacion,get_info_meses,get_sql_dias,get_sql_hora,get_sql_mes,get_sql_semana
def get_info_card(fecha,clave):
    engine = create_engine(connect_info)
    consulta  = """SELECT ifnull(sum(na.ausentismos),0) as ausencias,ifnull(sum(na.incapacidades),0) as incapacidades,ifnull(sum(na.horas_extras),0) as horas,ifnull(sum(retardos),0) as retardos,ifnull(sum(permisos_goce),0) as permisos,(select ifnull(sum(cfdi.total),0) from nominas_cfdi cfdi inner join nominas n on n.nominaID = cfdi.nominaID) as total  FROM nominas_asistencia na  inner join nominas n on n.nominaID= na.nominaID 
       where n.empleadoID='"""+str(clave)+"""' and fecha_inicial_pago between CAST('"""+fecha+"""-01' AS DATE) and  CAST('"""+fecha+"""-31' AS DATE);"""
    
    df = pd.read_sql_query(sql=consulta, con=engine)
    fechalast = get_fecha_last(fecha)
    
    consulta  =  """SELECT ifnull(sum(na.ausentismos),0) as ausencias,ifnull(sum(na.incapacidades),0) as incapacidades,ifnull(sum(na.horas_extras),0) as horas,ifnull(sum(retardos),0) as retardos,ifnull(sum(permisos_goce),0) as permisos,(select ifnull(sum(cfdi.total),0) from nominas_cfdi cfdi inner join nominas n on n.nominaID = cfdi.nominaID) as total  FROM nominas_asistencia na  inner join nominas n on n.nominaID= na.nominaID 
       where n.empleadoID='"""+str(clave)+"""' and fecha_inicial_pago between CAST('"""+fechalast+"""-01' AS DATE) and  CAST('"""+fechalast+"""-31' AS DATE);"""
    dfv = pd.read_sql_query(sql=consulta, con=engine)
    data = set_info_card(df.values[0][0:6],dfv.values[0][0:6],["","","","",""])
    return {"contentCards": data[0], "titleCards": ["Ausentismos","Incapacidades","Horas Extras","Retardos","Permisos c/goce","Ingreso total"], "mesPasado": dfv["total"][0], "mesActual": df["total"][0]}
   
def get_query(fecha,clave):
    total = "count(n.empleadoID)"
    inner = " inner join nominas_cfdi cfdi on n.nominaID = cfdi.nominaID"
    where = " and n.empleadoID = '"+str(clave)+"'"
    return {"inner":inner,"where":where,"total":total,"prefijoFecha":"DATE(fecha_inicial_pago)","prefijoHora":"SUBSTRING_INDEX(fecha_inicial_pago, ' ', -1)","tabla":"nominas n ","fecha":fecha}
def get_query_mes(fecha,clave):
    total = "count(n.empleadoID)"
    inner = "left join nominas n  ON MONTH(n.fecha_inicial_pago) = meses.mes_id left join nominas_cfdi cfdi on cfdi.nominaID = n.nominaID"
    where = " where n.empleadoID = '"+str(clave)+"'"
    return {"inner":inner,"where":where,"total":total,"prefijoFecha":"DATE(fecha_inicial_pago)","prefijoHora":"SUBSTRING_INDEX(fecha_inicial_pago, ' ', -1)","tabla":"","fecha":fecha}
def get_query_dias():
     return """
            SELECT DAY(n.fecha_inicial_pago), count(cfdi.nominaID)
            FROM  nominas n  
            left join nominas_cfdi cfdi on cfdi.nominaID = n.nominaID
            WHERE MONTH(n.fecha_inicial_pago) = %s
            AND YEAR(n.fecha_inicial_pago) = %s
            and  n.empleadoID = %s
            GROUP BY DAY(n.fecha_inicial_pago)
            """
def get_sql_comparacion(fecha):
    total = "count(n.empleadoID)"
    prefijoFecha = "n.fecha_inicial_pago"
    nombre = "e.nombre "
    campo = " e.empleadoID ,e.nombre"
    tabla = "empleados e) e "
    inner = " left join nominas n on n.nominaID = e.empleadoID "
    tabla_total = "nominas n"
    group_by = "e.nombre"
    return {"where":"","currency":"","data_table":["Nombre","Actividades","Resultado"],"data_tabletipo":["STR","STR","STR"],"columna_total":"count(n.empleadoID)","tabla_total":tabla_total,"fecha":fecha,"inner":inner,"total":total,"prefijoFecha":prefijoFecha,"tabla":tabla,"nombre":nombre,"group_by":group_by,"campo":campo}
def dashboard(fecha,clave):

    return {
        "mes":  get_sql_mes(get_query_mes(fecha, clave)),
        "semana":  get_sql_semana(get_query(fecha, clave)),
        "dias":  get_sql_dias(fecha, clave, get_query_dias()),
        "horas":  get_sql_hora(get_query(fecha, clave)),
        "comparacion":  get_info_comparacion(get_sql_comparacion(fecha), "Comparacion de  entre menus"),
        "cards":  get_info_card(fecha, clave),
        "tablaNombre":  "Ventas",
        "meses": get_info_meses(),
        "campoNombre":  "Ingreso",
        "title":  "Ventas",
        "countCard":  [["ventas"]],
        "contabilidad":  False,
    }


