USE employees_db;
INSERT INTO  departments (id, dep_name)
VALUES (1, "DOG"),
       (2, "cat"),
       (3, "fly");

INSERT INTO roles (id, title, salary, department_id)
VALUES   (10, "manager", 2000.00, 1),
         (20, "intern", 100.00, 2),
         (30, "ingeneer", 300.00, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (100, "Felix", "hi",10,10),
        (200, "Daniela", "low",20,10),
        (300, "Chrity", "bird",30);

UPDATE employee
SET   manager_id = 1
WHERE id IN (2,3);