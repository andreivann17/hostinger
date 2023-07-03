import pymysql
from django.utils.crypto import get_random_string
import pandas as pd
import base64
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import time
import json
from ..departamentos import departamentos
from ..puestos import puestos
from ..tipo_contrato import tipo_contrato
from ..generos import generos
from ..utils import ilustracion
def get_info(id):
    engine = create_engine(connect_info) 
    datainfo = {"numEmpleado":"","nombre":"","apellido":"","salario":"",
               "rfc":"","curp":"","generoID":"-1","departamentoID":"-1","puestoID":"-1",
               "tipoContratoID":"-1","descripcion":"","fecha":"","nombreDepartamento":""
               ,"fechaNacimiento":"","fechaIngreso":"","nombrePuesto":"","nombreTipoContrato":"","nombreGenero":"","jefeArea":"0"}
    if  id != None and id!="":
        consulta = """SELECT e.empleadoID as id,e.num_empleado as numEmpleado,e.nombre as nombre,e.apellido as apellido,e.salario_diario as salario,e.rfc as rfc, e.curp as curp, e.fecha_nacimiento as fecha_nacimiento, e.fecha_ingreso as fecha_ingreso,
        e.generoID as generoID, e.departamentoID as departamentoID, e.puestoID as puestoID,e.tipo_contratoID as tipoContratoID,e.usuarioID as usuarioID, e.jefe_area  as jefeArea from empleados e where e.num_empleado = """+str(id)
        df = pd.read_sql_query(sql=consulta, con=engine)
        if len(df)>0:
            datainfo = df.iloc[0].to_dict()
    return   {"info": datainfo,"generos":generos.get_info_combo(), "departamentos": departamentos.get_info_combo(), "puestos": puestos.get_info_combo(), "tipoContratos": tipo_contrato.get_info_combo()}

def agregando(data,usuario,img):
    token = get_random_string(length=50)
    consulta = 'insert into  recursos_humanos.empleados (num_empleado,nombre,apellido,salario_diario,rfc,curp,generoID,departamentoID,puestoID,tipo_contratoID,fecha_nacimiento,fecha_ingreso,descripcion,jefe_area,fecha,usuarioID,activo)  VALUES ("'+str(data["numEmpleado"])+'", "'+str(data["nombre"])+'","'+str(data["apellido"])+'","'+str(data["salario"])+'","'+str(data["rfc"])+'","'+str(data["curp"])+'","'+str(data["generoID"])+'","'+str(data["departamentoID"])+'","'+str(data["puestoID"])+'","'+str(data["tipoContratoID"])+'","'+str(data["fechaNacimiento"])+'","'+str(data["fechaIngreso"])+'","'+str(data["descripcion"])+'","'+str(data["jefeArea"])+'","'+str(time.strftime("%%Y-%m-%d H:%M:%S"))+'","'+str(usuario)+'",1);'
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:  
        cursor.execute(consulta)  
        conexion.commit() 
        ilustracion.agregando(img,"empleados_"+str(data["numEmpleado"])+".jpg")   
def editando(data,clave,usuario):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "UPDATE recursos_humanos.empleados SET num_empleado = '"+str(data["numEmpleado"])+"', nombre = '"+str(data["nombre"])+"',apellido = '"+str(data["apellido"])+"', salario_diario = '"+str("salario")+"',  rfc = '"+str(data["rfc"])+"', curp = '"+str(data["curp"])+"', generoID = '"+str(data["generoID"])+"', departamentoID = '"+str(data["departamentoID"])+"', puestoID = '"+str(data["puestoID"])+"', tipo_contradoID = '"+str(data["tipoContratoID"])+"', fecha_nacimiento = '"+str(data["fechaNacimiento"])+"', fechaIngreso = '"+str(data["fechaIngreso"])+"', descripcion = '"+str(data["descripcion"])+"', usuarioID = '"+str(usuario)+"'   where num_empleado="+str(clave)+""
        cursor.execute(consulta)
        conexion.commit()
def eliminando(clave):
    conexion = pymysql.connect(host='localhost',user='root',password='',db='recursos_humanos')
    with conexion.cursor() as cursor:
        consulta = "update empleados set activo = 0 where numEmpleado = '" +str(clave)+ "'"
        cursor.execute(consulta)
        conexion.commit() 