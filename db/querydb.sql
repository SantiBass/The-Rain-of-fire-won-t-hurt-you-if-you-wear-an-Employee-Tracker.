SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employee;

-- -- selecting data from from all roles.
 SELECT  roles.id, roles.title, roles.salary, department_id AS departments_id
FROM roles
JOIN departments  ON  departments.id = department_id;

 --  selecting data from all employees.

SELECT employee.id, employee.first_name, employee.last_name, employee.role_id AS role_id
FROM employee
JOIN roles ON  roles.id = role_id;

-- SELECT manager.id 
-- FROM managers
-- JOIN employee ON employee.first_name = first_name;
-- JOIN ON employee.last_name = last_name;
-- JOIN ON employee.manager_id = manager_id;