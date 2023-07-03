import pandas as pd
from datetime import date, datetime, timedelta
import base64
from sqlalchemy import create_engine
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
import base64
import json
def get_info ():
    engine = create_engine(connect_info) 
    sql = "SELECT menuID from menus ordey by orden asc "
    df = pd.read_sql_query(sql=sql, con=engine)
    result = df.to_dict(orient='records')
    nested_result = [result]
    json_data = json.dumps(nested_result)
    return json_data