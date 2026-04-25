CREATE TABLE IF NOT EXISTS Departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    budget NUMERIC(12, 2)
);

CREATE TABLE IF NOT EXISTS Managers (
    manager_id SERIAL PRIMARY KEY,
    manager_name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Employees (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department_id INT REFERENCES Departments(department_id),
    job_role VARCHAR(100),
    salary NUMERIC(10, 2),
    joining_date DATE,
    performance_score NUMERIC(4, 2),
    attendance_percent NUMERIC(5, 2),
    manager_id INT REFERENCES Managers(manager_id),
    location VARCHAR(100),
    employment_type VARCHAR(50),
    years_of_experience NUMERIC(4, 1),
    salary_band VARCHAR(50),
    performance_category VARCHAR(50)
);

-- Indexing for common filters
CREATE INDEX idx_emp_department ON Employees(department_id);
CREATE INDEX idx_emp_salary ON Employees(salary);
CREATE INDEX idx_emp_location ON Employees(location);
