INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Cullen', 'Powell', 1, NULL),
    ('Cedric', 'Hampton', 2, 1),
    ('Karen', 'Foley', 3, NULL),
    ('Anaya', 'Hale', 4, 3),
    ('Theresa', 'Ellison', 5, NULL),
    ('Tamara', 'George', 6, 5),
    ('Shayna', 'Garrison', 7, NULL),
    ('Katrina', 'French', 8, 7);