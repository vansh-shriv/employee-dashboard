import pandas as pd
from datetime import datetime

def clean_data(input_path, output_path):
    print("Loading data...")
    df = pd.read_csv(input_path)

    # 1. Remove duplicates
    print(f"Initial rows: {len(df)}")
    df.drop_duplicates(inplace=True)
    print(f"Rows after removing duplicates: {len(df)}")

    # 2. Standardize string columns
    string_cols = ['name', 'department', 'job_role', 'location', 'employment_type']
    for col in string_cols:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip()
    
    df['department'] = df['department'].str.title()
    df.loc[df['department'].isin(['Eng', 'Engineering']), 'department'] = 'Engineering'

    # 3. Handle missing values
    df['salary'] = pd.to_numeric(df['salary'], errors='coerce')
    median_salary = df['salary'].median()
    df['salary'].fillna(median_salary, inplace=True)

    df['performance_score'] = pd.to_numeric(df['performance_score'], errors='coerce')
    df['performance_score'].fillna(df['performance_score'].median(), inplace=True)
    
    df['attendance_percent'] = pd.to_numeric(df['attendance_percent'], errors='coerce')
    df['attendance_percent'].fillna(df['attendance_percent'].mean(), inplace=True)

    df['manager_id'] = pd.to_numeric(df['manager_id'], errors='coerce').fillna(0).astype('int64')

    # 4. Handle Outliers in salaries
    df.loc[df['salary'] > 500000, 'salary'] = median_salary 

    # 5. Fix invalid dates
    def parse_date(d):
        if pd.isna(d) or str(d).strip() == 'nan': return pd.NaT
        d_str = str(d).strip()
        for fmt in ('%Y-%m-%d', '%d-%m-%Y', '%Y/%m/%d'):
            try:
                return datetime.strptime(d_str, fmt)
            except ValueError:
                continue
        return pd.NaT
    
    df['joining_date'] = df['joining_date'].apply(parse_date)
    df.dropna(subset=['joining_date'], inplace=True) # Drop bad dates

    # 6. Create derived columns
    current_year = datetime.now().year
    df['years_of_experience'] = current_year - df['joining_date'].dt.year

    def get_salary_band(s):
        if s < 40000: return 'Low'
        elif s <= 80000: return 'Medium'
        return 'High'
    df['salary_band'] = df['salary'].apply(get_salary_band)

    def get_perf_cat(p):
        if p > 8: return 'High'
        elif p >= 6: return 'Medium'
        return 'Low'
    df['performance_category'] = df['performance_score'].apply(get_perf_cat)

    print("Cleaning complete. Saving to output...")
    df.to_csv(output_path, index=False)
    print(f"Cleaned data saved to {output_path} with {len(df)} records.")

if __name__ == '__main__':
    clean_data('raw_employees.csv', 'cleaned_employees.csv')
