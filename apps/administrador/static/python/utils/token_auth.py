import pandas as pd
from sqlalchemy import create_engine
from django.utils.crypto import get_random_string
connect_info = 'mysql+pymysql://root@localhost:3306/recursos_humanos'
def token_auth(token):
    engine = create_engine(connect_info, pool_pre_ping=True) 
    sql = "SELECT usuarioID,nombre from usuarios where token = '"+str(token)+"'"
    df = pd.read_sql_query(sql=sql, con=engine)
    if len(df)>0:
        return df.iloc[0].to_dict()
    return {}
def set_token():
    token = get_random_string(length=30)
    return token
