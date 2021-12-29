SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employee;

-- --  --selecting data from from all roles.
-- SELECT roles.id AS Role_Id, roles.title AS Job_title, roles.salary AS Salary, department_id AS Department_id FROM roles JOIN departments  ON  departments.id = department_id;

-- -- --  --  selecting data from all employees.

-- SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role_title, roles.department_id, roles.salary, employee.manager_id
-- FROM employee
-- JOIN roles ON  employee.role_id = roles.id;


-- -- view employees By department name
-- SELECT  employee.id AS employee_id, employee.first_name, employee.last_name,employee.role_id, roles.department_id, departments.department_name
-- FROM  employee
-- INNER JOIN  roles ON employee.role_id = roles.id
-- INNER JOIN departments ON roles.department_id=departments.id;

-- --  total budget of each department
-- SELECT   departments.id, departments.department_name,roles.department_id,
-- SUM(roles.salary) AS Department_budget
-- FROM departments
-- INNER JOIN roles ON roles.department_id=departments.id
-- GROUP BY departments.id; 


-- -- Update employee's Manager
-- SELECT employee.id, employee.manager_id
-- FROM employee
-- INNER JOIN roles ON employee.role_id = roles.id;
-- -- update employee role
-- UPDATE employee SET employee.role_id = 2 WHERE  employee.id = 300;

-- SELECT employee.id, employee.first_name, employee.last_name, employee.role_id FROM employee WHERE employee.role_id = 1;
