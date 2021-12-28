SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employee;

--  --selecting data from from all roles.
-- SELECT roles.id, roles.title, roles.salary, department_id AS departments_id
-- FROM roles
-- JOIN departments  ON  departments.id = department_id;

-- --  --  selecting data from all employees.

SELECT employee.id, employee.first_name, employee.last_name, employee.role_id 
FROM employee
JOIN roles ON  roles.id = role_id;



SELECT  employee.first_name, employee.last_name,employee.role_id, roles.department_id, departments.department_name
FROM  employee
INNER JOIN  roles ON employee.role_id = roles.id
INNER JOIN departments on roles.department_id=departments.id;





-- UPDATE employee.role_id
-- SET    manager_id = 100
-- WHERE role_id !=10; 
-- UPDATE employee
-- SET   manager_id = 100
-- WHERE id IN (200,300,400,500,600,700);


-- SELECT employee.id, roles.title 
-- FROM employee
-- JOIN roles ON roles.title = employee.id;
-- SELECT manager.id 

-- FROM managers
-- JOIN employee ON employee.first_name = first_name;
-- JOIN ON employee.last_name = last_name;
-- JOIN ON employee.manager_id = manager_id;