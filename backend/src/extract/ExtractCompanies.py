# coding: utf-8

import os
import sys
import pandas as pd
import pyodbc
import json
from datetime import datetime

absPath = os.path.dirname(os.path.abspath(__file__))
fileDir = absPath[:absPath.find('backend')]
sys.path.append(os.path.join(fileDir, 'backend/src/extract'))
sys.path.append(os.path.join(fileDir, 'backend/src'))

from ConnectDB import ConnectDB
from ConnectMongo import ConnectMongo
from util.functions import readSql


class ExtractCompanies():
    def __init__(self):
        self._ConnectDB = ConnectDB()
        self._connection = self._ConnectDB.getConnection()
        self._cursor = None

        self._connectionMongo = ConnectMongo()
        self._dbMongo = self._connectionMongo.getConnetion()
        self._collection = self._dbMongo['ExtractCompanies']

    def exportData(self):
        try:
            self._cursor = self._connection.cursor()
            sql = readSql(os.path.dirname(os.path.abspath(__file__)), 'ExtractCompanies.sql')
            self._cursor.execute(sql)

            df = pd.read_sql_query(sql, self._connection)

            data = json.loads(df.to_json(orient='records', date_format='iso'))
            print('- Exportando empresas:')
            for companie in data:
                self._collection.update_one( { "codi_emp": companie['codi_emp'] }, { "$set": companie}, upsert=True )
                print(f"\t -{companie['codi_emp']} - {companie['nome_emp']}")

        except Exception as e:
            print(f"Erro ao executar a consulta. O erro é: {e}")
        finally:
            if self._cursor is not None:
                self._cursor.close()
            self._ConnectDB.closeConnection()
            self._connectionMongo.closeConnection()


if __name__ == "__main__":
    main = ExtractCompanies()
    main.exportData()

