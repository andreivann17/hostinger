import pandas as pd
from datetime import date, datetime, timedelta
import base64
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import base64
meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
semana = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo']
def last_day_of_month(any_day):
    next_month = any_day.replace(day=28) + timedelta(days=4)  # this will never fail
    return next_month - timedelta(days=next_month.day)
def get_final_fecha(today):
    month1 = ""
    month2 = ""
    fecha1 = str(today)[0:4]+"-"+str(today)[5:7]+"-16"
    fecha2 = last_day_of_month(date(int(str(today)[0:4]),int(str(today)[5:7]),16))
    #fecha2 = str(today)[0:4]+"-"+month2+str(today)[5:7]+"-31"
    if int(str(today)[8:10])<16:
        fecha1 = str(today)[0:4]+"-"+month1+str(today)[5:7]+"-01"
        fecha2 = str(today)[0:4]+"-"+month2+str(today)[5:7]+"-15"
    return [fecha1,fecha2]
def get_info_meses():
    fechas = pd.date_range(start='2023-01', end=pd.Timestamp.now().strftime('%Y-%m-%d'), freq='MS')

    meses_espanol = {
    'January': 'Enero',
    'February': 'Febrero',
    'March': 'Marzo',
    'April': 'Abril',
    'May': 'Mayo',
    'June': 'Junio',
    'July': 'Julio',
    'August': 'Agosto',
    'September': 'Septiembre',
    'October': 'Octubre',
    'November': 'Noviembre',
    'December': 'Diciembre'
}

    # Formatea las fechas en el formato deseado con el nombre completo del mes en español
    meses_anos = fechas.strftime('%Y-%B').tolist()
    meses_anos_espanol = [meses_anos[i].replace(meses_anos[i].split('-')[1], meses_espanol[meses_anos[i].split('-')[1]]) for i in range(len(meses_anos))]
    
    return [meses_anos_espanol,fechas.strftime('%Y-%m').tolist()]

def get_images_billetes(value):
    engine = create_engine(connect_info) 
    sql = "SELECT nombre,valor,img from images where nombre='"+str(value)+"'  order by id asc"
    df = pd.read_sql_query(sql=sql, con=engine)
    data = df.to_numpy().tolist()
    json_data = []
    count= 0
    while count<len(df):
        base64_bytes = base64.b64encode(data[count][2])
        base64_string = base64_bytes.decode("ascii")
        text = "data:image/png;base64,"+base64_string
        json_data.append({"name":str(data[count][0]),"value":str(data[count][1]),"img":str(text)})
        count+=1
    return json_data
