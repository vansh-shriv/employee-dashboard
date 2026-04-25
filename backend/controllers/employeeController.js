const pool = require('../models/db');

exports.getEmployees = async (req, res) => {
    try {
        let query = `
            SELECT e.*, d.department_name, m.manager_name 
            FROM Employees e
            LEFT JOIN Departments d ON e.department_id = d.department_id
            LEFT JOIN Managers m ON e.manager_id = m.manager_id
            WHERE 1=1
        `;
        const values = [];
        let paramCount = 1;

        // Filtering
        if (req.query.department) {
            query += ` AND d.department_name = $${paramCount++}`;
            values.push(req.query.department);
        }
        if (req.query.location) {
            query += ` AND e.location = $${paramCount++}`;
            values.push(req.query.location);
        }
        if (req.query.minSalary) {
            query += ` AND e.salary >= $${paramCount++}`;
            values.push(req.query.minSalary);
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Employees WHERE employee_id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    const { name, email, department_id, job_role, salary, joining_date, performance_score, attendance_percent, location, employment_type } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO Employees 
            (name, email, department_id, job_role, salary, joining_date, performance_score, attendance_percent, location, employment_type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [name, email, department_id, job_role, salary, joining_date, performance_score, attendance_percent, location, employment_type]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, job_role, salary, location } = req.body; // Sample fields
    try {
        const result = await pool.query(
            `UPDATE Employees SET name=$1, email=$2, job_role=$3, salary=$4, location=$5 WHERE employee_id=$6 RETURNING *`,
            [name, email, job_role, salary, location, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await pool.query('DELETE FROM Employees WHERE employee_id = $1', [req.params.id]);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.searchEmployees = async (req, res) => {
    try {
        const searchTerm = `%${req.query.q || ''}%`;
        const result = await pool.query(
            `SELECT * FROM Employees WHERE name ILIKE $1 OR email ILIKE $1`,
            [searchTerm]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Analytics Handlers
exports.getSalaryByDepartment = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT d.department_name as department, AVG(e.salary) as avg_salary
            FROM Employees e
            JOIN Departments d ON e.department_id = d.department_id
            GROUP BY d.department_name
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTopPerformers = async (req, res) => {
    try {
        const result = await pool.query(`SELECT name, performance_score FROM Employees ORDER BY performance_score DESC LIMIT 10`);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAttendanceSummary = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                AVG(attendance_percent) as average_attendance,
                MIN(attendance_percent) as min_attendance,
                MAX(attendance_percent) as max_attendance
            FROM Employees
        `);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getSummaryData = async (req, res) => {
    try {
        const total = await pool.query("SELECT COUNT(*) FROM Employees");
        const avgSalary = await pool.query("SELECT AVG(salary) FROM Employees");
        const avgAttendance = await pool.query("SELECT AVG(attendance_percent) FROM Employees");
        
        res.json({
            total_employees: total.rows[0].count,
            average_salary: avgSalary.rows[0].avg,
            average_attendance: avgAttendance.rows[0].avg
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
