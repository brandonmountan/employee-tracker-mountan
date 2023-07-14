INSERT INTO departments (department)
VALUES ("Sales"),
       ("Human Resources"),
       ("Accounting"),
       ("CS Agent");

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesman", 80000, 1),
       ("Manager", 100000, 2),
       ("Accountant", 90000, 3),
       ("Customer Service", 50000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "John", "Doe", 1, NULL),
       (2, "Michael", "Scott", 2, NULL),
       (3, "Bum", "Philips", 3, 1),
       (4, "Jane", "Doe", 4, 2);