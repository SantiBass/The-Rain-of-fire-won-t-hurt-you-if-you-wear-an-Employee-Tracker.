USE employees_db;
INSERT INTO  departments (name)
VALUES
       ( "DOG"),
       ( "cat"),
       ( "fly"), 

INSERT INTO roles (title, salary, department_id)
VALUES
        ("manager", 2000.00, 2 ),
        ("intern", 100.00, 6)
        ("ingeneer", 300.00, 1 );

INSERT INTO employees (id, first_name, last_name, role_id,)
        (1, "Felix", "Dog"2),
        (2, "Daniela", "cat"),
        (3, "Chrity", "bird");

UPDATE employees
SET   manager_id = 1
WHERE id IN (2,3)