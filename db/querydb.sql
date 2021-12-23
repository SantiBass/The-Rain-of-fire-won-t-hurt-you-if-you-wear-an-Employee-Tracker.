SELECT * FROM departments;

-- -- selecting data from from all roles.
 SELECT  roles.id, roles.title, roles.salary, department_id AS departments
FROM roles;
 JOIN departments  ON  department_id = d.id;

-- -- -- SELECT
-- -- FROM
-- -- SELECT employee.id, first_name,
-- -- FROM employee