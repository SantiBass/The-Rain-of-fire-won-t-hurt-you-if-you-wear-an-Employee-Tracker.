SELECT * FROM departments

-- selecting data from from all roles.
SELECT  r.id, title, salary, d.department_name AS department
FROM roles role_id
JOIN departments  ON  d.department_id = d.id;

SELECT employee.id, first_name,
FROM employees