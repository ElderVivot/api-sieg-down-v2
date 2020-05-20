# coding: utf-8

import os
import sys
import json
from datetime import datetime

absPath = os.path.dirname(os.path.abspath(__file__))
fileDir = absPath[:absPath.find('backend')]
sys.path.append(os.path.join(fileDir, 'backend/src/extract'))
sys.path.append(os.path.join(fileDir, 'backend/src'))

from util.functions import returnCompetenceStartEnd, returnMonthsOfYear


class OpenExecutionsCmd():
    def __init__(self):
        self._competenceInicial = input('- Informe a competência inicial (mm/aaaa): ')
        self._competenceFinal = input('- Informe a competência final (mm/aaaa): ')
        self._competenceInicialAndFinal = returnCompetenceStartEnd(self._competenceInicial, self._competenceFinal)
        self._startMonth = self._competenceInicialAndFinal['monthInicial']
        self._startYear = self._competenceInicialAndFinal['yearInicial']
        self._endMonth = self._competenceInicialAndFinal['monthFinal']
        self._endYear = self._competenceInicialAndFinal['yearFinal']

    def process(self):
        year = self._startYear

        while year <= self._endYear:

            months = returnMonthsOfYear(year, self._startMonth, self._startYear, self._endMonth, self._endYear)

            for month in months:
                competence = f'{month:0>2}/{year}'
                wayFileActual = absPath.replace('\\', '/')
                command = f"node {wayFileActual}/main/Applicattion.js {competence} {competence}"
                os.system(f"start cmd /c {command}")
            
            year += 1


openExecutionsCmd = OpenExecutionsCmd()
openExecutionsCmd.process()
