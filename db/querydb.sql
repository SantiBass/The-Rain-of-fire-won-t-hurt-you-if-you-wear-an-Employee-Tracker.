SELECT * FROM departments;

-- -- selecting data from from all roles.
 SELECT  roles.id, roles.title, roles.salary, department_id AS departments
FROM roles
JOIN departments  ON  departments.id = department_id;

 

SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id
FROM employee;
-- JOIN roles ON  roles.;