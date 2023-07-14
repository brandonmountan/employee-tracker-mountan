SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id, manager.first_name
FROM employees 
JOIN roles ON employees.role_id=roles.id
JOIN departments ON roles.department_id=departments.id
JOIN employees manager ON employees.id=manager.id