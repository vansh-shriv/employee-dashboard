-- Employees by department
SELECT d.department_name, e.name, e.job_role
FROM Employees e
JOIN Departments d ON e.department_id = d.department_id;

-- Average salary per department
SELECT d.department_name, AVG(e.salary) as avg_salary
FROM Employees e
JOIN Departments d ON e.department_id = d.department_id
GROUP BY d.department_name;

-- Top performers (Score > 8)
SELECT name, performance_score 
FROM Employees 
WHERE performance_score > 8 
ORDER BY performance_score DESC;

-- Low attendance employees (< 85%)
SELECT name, attendance_percent 
FROM Employees 
WHERE attendance_percent < 85;

-- Recent hires (last 2 years)
SELECT name, joining_date 
FROM Employees 
WHERE joining_date >= NOW() - INTERVAL '2 years';

-- Highest paid employees
SELECT name, salary 
FROM Employees 
ORDER BY salary DESC 
LIMIT 5;

-- Employee count by department
SELECT d.department_name, COUNT(e.employee_id) as count
FROM Employees e
JOIN Departments d ON e.department_id = d.department_id
GROUP BY d.department_name;
