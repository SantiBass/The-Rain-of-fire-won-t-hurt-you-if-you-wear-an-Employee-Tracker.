USE employees_db;
INSERT INTO  departments (id, department_name)
VALUES (1, "Marketing"),
       (2, "Finance"),
       (3, "Design"),
       (4, "Accounting"),
       (5, "Sales"),
       (6, "Human Resources"),
       (7, "Customers Service");

INSERT INTO roles (id, title, salary, department_id)
VALUES   (1, "Manager", 100000.00,1),
         (2, "Intern", 30000.00,2),
         (3, "Ingeneer", 80000.00,3),
         (4, "Supervisor", 60000.00, 4),
         (5, "Sales Assossiate", 40000.00, 5),
         (6, "Web Designer", 70000.00, 3),
         (7, "Rep",30000.00, 7);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (100, "Santiago", "Ibarra",1, NULL),
        (200, "Suzanne", "Ryan",3 , 100),
        (300, "Timmothy", "Ryan",6,100 ),
        (400, "Patricia", "Ryan", 4, 100),
        (500, "Klaus", "Mikelsen", 7, 100),
        (600, "Divina", "De la Cuadra", 2, 100),
        (700, "Mia", "Xu", 5, 100);

