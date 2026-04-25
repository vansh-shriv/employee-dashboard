import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const initMockData = () => {
     setSummary({ total_employees: 5, average_salary: 57800, average_attendance: 90 });
     setEmployees([
       { employee_id: 1, name: 'John Doe', department_name: 'Engineering', salary: 75000 },
       { employee_id: 2, name: 'Jane Smith', department_name: 'HR', salary: 62000 },
       { employee_id: 3, name: 'Bob Brown', department_name: 'Sales', salary: 55000 },
       { employee_id: 4, name: 'Alice Green', department_name: 'Engineering', salary: 85000 },
       { employee_id: 5, name: 'Charlie White', department_name: 'Sales', salary: 12000 }
     ]);
     setSalaryData([
       { department: 'Engineering', avg_salary: 80000 }, 
       { department: 'HR', avg_salary: 62000 },
       { department: 'Sales', avg_salary: 33500 }
     ]);
  };

  useEffect(() => {
    // Try to fetch real data
    const fetchData = async () => {
      try {
        const [sumRes, empRes, salRes] = await Promise.all([
          axios.get('http://localhost:5000/api/analytics/summary').catch(() => null),
          axios.get('http://localhost:5000/api/employees').catch(() => null),
          axios.get('http://localhost:5000/api/analytics/salary-by-department').catch(() => null)
        ]);

        if (sumRes && empRes) {
            setSummary(sumRes.data);
            setEmployees(empRes.data);
            setSalaryData(salRes ? salRes.data.map(d => ({...d, avg_salary: Number(d.avg_salary)})) : []);
        } else {
            console.warn("Backend unavailable, using mock data for display format.");
            initMockData();
        }
      } catch (err) {
        initMockData();
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/search?q=${searchTerm}`);
      setEmployees(res.data);
    } catch {
      alert("Backend search failed. Server might be off.");
    }
  };

  if (!summary) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid">
        <div className="card">
          <h3 style={{color: 'var(--text-secondary)'}}>Total Employees</h3>
          <h2>{summary.total_employees}</h2>
        </div>
        <div className="card">
          <h3 style={{color: 'var(--text-secondary)'}}>Average Salary</h3>
          <h2>${Number(summary.average_salary).toLocaleString(undefined, {maximumFractionDigits: 0})}</h2>
        </div>
        <div className="card">
          <h3 style={{color: 'var(--text-secondary)'}}>Avg Attendance</h3>
          <h2>{Number(summary.average_attendance).toFixed(1)}%</h2>
        </div>
      </div>

      <div className="grid">
          <div className="card" style={{height: '350px'}}>
             <h3>Salary by Department</h3>
             <ResponsiveContainer width="100%" height="90%">
                <BarChart data={salaryData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avg_salary" fill="#3b82f6" />
                </BarChart>
             </ResponsiveContainer>
          </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
           <h3>Employee Directory</h3>
           <div>
               <input 
                 type="text" 
                 placeholder="Search by name or email..." 
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 style={{padding: '0.5rem', marginRight: '0.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
               />
               <button className="btn" onClick={handleSearch}>Search</button>
           </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.employee_id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.department_name}</td>
                  <td>${emp.salary}</td>
                  <td>
                    <button style={{marginRight: '0.5rem'}} className="btn" onClick={() => alert("Edit Modal WIP")}>Edit</button>
                    <button className="btn btn-danger" onClick={() => alert("Delete WIP")}>Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && <tr><td colSpan="5">No employees found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
