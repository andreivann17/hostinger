import pandas as pd
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
def get_count(box):
    count = 0
    for value in box:
        count += float(value)
    return count
def get_info():
    engine = create_engine(connect_info) 
    sql = "SELECT TABLE_NAME AS `Tabla`,(DATA_LENGTH + INDEX_LENGTH) / 1024 /1024  AS `size` FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'recursos_humanos' ORDER BY TABLE_NAME asc;"
    df = pd.read_sql_query(sql=sql, con=engine)
    data = None
    count_master = 0
    count_menus = get_count([df[df.Tabla=='menus']["size"].to_list()[0],df[df.Tabla=='menus_recetas']["size"].to_list()[0],df[df.Tabla=='categorias']["size"].to_list()[0],df[df.Tabla=='area']["size"].to_list()[0]])
    count_master +=count_menus
    count_productos = get_count([df[df.Tabla=='productos']["size"].to_list()[0],df[df.Tabla=='productos_stock']["size"].to_list()[0],df[df.Tabla=='productos_salidas']["size"].to_list()[0]
                                       ,df[df.Tabla=='departamentos']["size"].to_list()[0]])
    count_master +=count_productos
    
    count_promociones = get_count([df[df.Tabla=='promociones']["size"].to_list()[0],df[df.Tabla=='promociones_contenido']["size"].to_list()[0],df[df.Tabla=='promociones_monitor']["size"].to_list()[0]])
    count_master +=count_promociones

    count_proveedores = get_count([df[df.Tabla=='proveedores']["size"].to_list()[0]])
    count_master +=count_proveedores

    count_contabilidad = get_count([df[df.Tabla=='ventas']["size"].to_list()[0],df[df.Tabla=='tipo_salidas']["size"].to_list()[0],df[df.Tabla=='tipo_entradas']["size"].to_list()[0],df[df.Tabla=='ventas_menus']["size"].to_list()[0],df[df.Tabla=='entradas']["size"].to_list()[0],df[df.Tabla=='cortes']["size"].to_list()[0],df[df.Tabla=='salidas']["size"].to_list()[0],df[df.Tabla=='facturas']["size"].to_list()[0],df[df.Tabla=='ventas_recetas']["size"].to_list()[0]])
    count_master +=count_contabilidad

    count_meseros = get_count([df[df.Tabla=='meseros']["size"].to_list()[0]])
    count_master +=count_meseros

    count_mesas = get_count([df[df.Tabla=='mesas']["size"].to_list()[0],df[df.Tabla=='zonas']["size"].to_list()[0]])
    count_master +=count_mesas

    count_usuarios = get_count([df[df.Tabla=='usuarios']["size"].to_list()[0],df[df.Tabla=='usuarios_privilegios']["size"].to_list()[0]])
    count_master +=count_usuarios
   
    count_ajustes = get_count([df[df.Tabla=='images']["size"].to_list()[0],df[df.Tabla=='divisas']["size"].to_list()[0],df[df.Tabla=='casacambio']["size"].to_list()[0],df[df.Tabla=='ajustes']["size"].to_list()[0]])
    count_master +=count_ajustes

    count_movimientos = get_count([df[df.Tabla=='movimientos']["size"].to_list()[0]])
    count_master +=count_movimientos
    
    data_content = [count_menus,count_productos,count_promociones,count_proveedores,count_contabilidad,count_meseros,count_mesas,count_usuarios,count_ajustes,count_movimientos]
    data_title = ["Menus","Productos","Promociones","Proveedores","Contabilidad","Meseros","Mesas","Usuarios","Ajustes","Movimientos"]
    data = {"data":data_content,"title":data_title}     
    return data          
