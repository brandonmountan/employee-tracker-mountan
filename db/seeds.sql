INSERT INTO departments (id, department)
VALUES (1, "Sales"),
       (2, "Human Resources"),
       (3, "Accounting"),
       (4, "Intern");

INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "Salesman", 80000, 1),
       (6, "HR Representative", 100000, 2),
       (7, "Accountant", 90000, 3),
       (8, "Student", 40000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (9, "John", "Doe", 5, NULL),
       (10, "Michael", "Scott", 6, 9),
       (11, "Bum", "Philips", 7, 9),
       (12, "Jane", "Doe", 8, 9);