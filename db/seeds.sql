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
VALUES   (10, "Manager", 100000.00,1),
         (20, "Intern", 30000.00,2),
         (30, "Ingeneer", 80000.00,3),
         (40, "Supervisor", 60000.00, 4),
         (50, "Sales Assossiate", 40000.00, 5),
         (60, "Web Designer", 70000.00, 3),
         (70, "Rep",30000.00, 7);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (100, "Santiago", "Ibarra",10, 100),
        (200, "Suzanne", "Ryan",30 , 100),
        (300, "Timmothy", "Ryan",60,100 ),
        (400, "Patricia", "Ryan", 40, 100),
        (500, "Klaus", "Mikelsen", 70, 100),
        (600, "Divina", "De la Cuadra", 20, 100),
        (700, "Mia", "Xu", 50, 100);
-- INSERT INTO managers(id, first_name, last_name,managerid)
--             (110, "Santiago","Ibarra",10)
UPDATE employee
SET   manager_id = 100
WHERE role_id !=10;
-- UPDATE employee
-- SET   manager_id = 100
-- WHERE id IN (200,300,400,500,600,700);

