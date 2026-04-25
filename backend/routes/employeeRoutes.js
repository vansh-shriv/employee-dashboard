const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Employee Routes
router.get('/employees/search', employeeController.searchEmployees)
router.get('/employees', employeeController.getEmployees);
router.get('/employees/:id', employeeController.getEmployeeById);
router.post('/employees', employeeController.createEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

// Analytics Routes
router.get('/analytics/salary-by-department', employeeController.getSalaryByDepartment);
router.get('/analytics/top-performers', employeeController.getTopPerformers);
router.get('/analytics/attendance-summary', employeeController.getAttendanceSummary);
router.get('/analytics/summary', employeeController.getSummaryData);

module.exports = router;
