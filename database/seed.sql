-- Sample subset of clean data to skip the Python step manually if Python isn't available
INSERT INTO Departments (department_name, budget) VALUES 
('Engineering', 1000000), 
('HR', 200000), 
('Sales', 500000), 
('Marketing', 300000);

INSERT INTO Managers (manager_name) VALUES 
('Alice Manager'), 
('Bob Leader'), 
('Charlie Director');

INSERT INTO Employees (name, email, department_id, job_role, salary, joining_date, performance_score, attendance_percent, manager_id, location, employment_type) VALUES
('John Doe', 'johndoe@email.com', 1, 'Software Eng', 75000, '2021-01-15', 8.5, 95.0, 1, 'New York', 'Full-Time'),
('Jane Smith', 'janesmith@domain.com', 2, 'HR Manager', 62000, '2020-02-15', 9.1, 98.0, 1, 'Chicago', 'Contract'),
('Bob Brown', 'bob@email.com', 3, 'Sales Exec', 55000, '2022-05-20', 5.5, 80.0, 2, 'New York', 'Full-Time'),
('Alice Green', 'alice@email.com', 1, 'Backend Dev', 85000, '2023-01-10', 7.5, 92.0, 1, 'San Francisco', 'Full-Time'),
('Charlie White', 'charlie@white.com', 3, 'Intern', 12000, '2024-06-01', 9.0, 85.0, 2, 'Remote', 'Intern');
