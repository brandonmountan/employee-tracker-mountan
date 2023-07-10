INSERT INTO department (id, name)
VALUES (001, "Math"),
       (002, "English"),
       (003, "Science"),
       (004, "History");

INSERT INTO role (id, title, salary, department_id)
VALUES (001, "Professor", 100,000, department(id)),
       (002, "Professor", 100,000, department(id)),
       (003, "Professor", 100,000, department(id)),
       (004, "Professor", 100,000, department(id));

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, "John", "Doe", role(id), employee(id)),
       (002, "John", "Doe", role(id), employee(id)),
       (003, "John", "Doe", role(id), employee(id)),
       (004, "John", "Doe", role(id), employee(id));