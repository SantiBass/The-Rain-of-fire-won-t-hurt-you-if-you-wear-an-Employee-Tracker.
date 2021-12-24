SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employee;

-- -- selecting data from from all roles.
 SELECT  roles.id, roles.title, roles.salary, department_id AS departments
FROM roles
JOIN departments  ON  departments.id = department_id;

 --  selecting data from all employees.

SELECT employee.id, employee.first_name, employee.last_name, 
-- employee.role_id
FROM employee;
-- JOIN roles ON  roles.;