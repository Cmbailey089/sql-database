INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal"),
       ("Finance");

INSERT INTO roles (department_id, title, salary)
VALUES (1,"Sales Lead",80000)
       (1,"Salesperson",60000),
       (2,"Lead Engineer",120000),
       (2,"Software Engineer",1000000),
       (4,"Account Manager",70000),
       (4,"Accountant",60000),
       (3,"Legal Team Lead",100000),
       (3,"Lawyer",80000);

       INSERT INTO employees (first_name,last_name, role_id, manager_id)
       VALUES ("John", 'Doe', 1, NULL),
              ('Mike', 'Chan', 2, 1),
              ('Ashely', 'Rodrieguez', 3, NULL),
              ('Kevin', 'Tupik', 4, NULL),
              ('Kunal', 'Singh', 5, NULL),
              ('Malia', 'Brown', 6, 5),
              ('Sarah', 'Lourd', 7, NULL),
              ('Tom', 'Allen', 8, 7);
