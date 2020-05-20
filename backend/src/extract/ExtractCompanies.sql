SELECT emp.codi_emp, emp.nome_emp, TRIM(emp.cgce_emp) AS cgce_emp, emp.tins_emp, emp.stat_emp, 
       emp.dcad_emp, emp.dina_emp,
       emp.dtinicio_emp
  FROM bethadba.geempre AS emp
 WHERE emp.tins_emp IN (1, 2) -- apenas CNPJ e CPF
   --AND emp.codi_emp IN (94, 437) -- filtro pra teste de poucas empresas
   AND emp.codi_emp < 9969 -- empresas exemplos não
   AND cgce_emp <> '' AND cgce_emp IS NOT NULL
ORDER BY emp.codi_emp