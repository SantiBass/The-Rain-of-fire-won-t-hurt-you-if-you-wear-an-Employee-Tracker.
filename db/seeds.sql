USE employees_db;
INSERT INTO  departments (dep_name)
VALUES ("DOG"),
       ("cat"),
       ('fly');

INSERT INTO roles (title, salary, department_id)
VALUES ("manager", 2000.00, 1);
         ("intern", 100.00, 6),
         ("ingeneer", 300.00, 1 );

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES  (1, "Felix", "hi",1),
        (2, "Daniela", "low", 1),
        (3, "Chrity", "bird", 1);

UPDATE employee
SET   manager_id = 1
WHERE id IN (2,3);