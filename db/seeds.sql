INSERT INTO departments (id, department)
VALUES (1, "Math"),
       (2, "English"),
       (3, "Science"),
       (4, "History");

INSERT INTO roles (id, title, salary, department_id)
VALUES (5, "Professor", 100000, 1),
       (6, "Researcher", 100000, 2),
       (7, "Administrator", 100000, 3),
       (8, "Associate Professor", 100000, 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (9, "John", "Doe", 5, NULL),
       (10, "Brian", "Hansen", 6, 9),
       (11, "Bum", "Philips", 7, 9),
       (12, "Jane", "Doe", 8, 9);