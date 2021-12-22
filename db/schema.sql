DATABASE IF EXISTS employees_db;
CREATE employees_db;

USE employees_db;

CREATE TABLE  departments(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
);

CREATE TABLE  role(
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30), 
    salary DECIMAL(10,2),
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
CREATE TABLE  employees(
    id INTEGER  AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER ,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);