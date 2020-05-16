SELECT emp.codi_emp, emp.nome_emp, emp.cgce_emp, emp.tins_emp, emp.stat_emp, emp.dcad_emp, emp.dina_emp,
       emp.dtinicio_emp
  FROM bethadba.geempre AS emp
 WHERE emp.tins_emp IN (1, 2) -- apenas CNPJ e CPF
ORDER BY emp.codi_emp