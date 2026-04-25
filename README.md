# Employee Analytics Dashboard

A full-stack project demonstrating proficiency in SQL, backend API development, React frontend, data visualization, and Python data cleaning.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Axios, Recharts, Vanilla CSS (minimalist aesthetic)
- **Backend**: Node.js, Express, pg (PostgreSQL Client)
- **Database**: PostgreSQL
- **Data Engineering**: Python, Pandas

---

## 📁 Project Structure

```
employee-dashboard/
│
├── frontend/             # React Vite Application
│   ├── src/components/
│   ├── src/pages/
│   ├── index.css
│   └── App.jsx
│
├── backend/              # Node.js + Express API Server
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── server.js
│
├── database/             # PostgreSQL Design & Sample SQL
│   ├── schema.sql
│   ├── seed.sql
│   └── queries.sql
│
└── python/               # Data Cleaning Script
    ├── clean_data.py
    └── raw_employees.csv
```

---

## 🚀 Setup Instructions

Since `npm` / `node` might need configuration locally, you can initialize the specific folders:

### 1. Data Cleaning (Python)
Ensure Python and Pandas are installed:
```bash
cd python
pip install pandas
python clean_data.py
```
This generates `cleaned_employees.csv` from the messy data.

### 2. Database Schema (PostgreSQL)
Ensure you have a PostgreSQL server running locally. Execute the files against your PostgreSQL console (`psql`):
```bash
cd database
psql -U postgres -f schema.sql
psql -U postgres -f seed.sql
```

### 3. Backend (Node.js)
```bash
cd backend
npm install
npm run dev
```

### 4. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Documentation

### Employee Endpoints
- `GET /api/employees` - Retrieve all employees (Supports query filters: `?department=Engineering`, `?minSalary=50000`, `?location=Mumbai`)
- `GET /api/employees/search?q={term}` - Search by name/email
- `GET /api/employees/:id` - Fetch single employee details
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee details
- `DELETE /api/employees/:id` - Delete employee

### Analytics Endpoints
- `GET /api/analytics/summary` - Aggregated basic metrics
- `GET /api/analytics/salary-by-department` - Used for Bar Chart
- `GET /api/analytics/top-performers` - Get highest performing employees
- `GET /api/analytics/attendance-summary` - Get attendance breakdown
