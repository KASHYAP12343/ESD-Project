-- Faculty Grading System - Data Initialization
-- Database: esd_project
-- 50 Students: 25 Freshers (2025) + 25 Seniors (2024)

-- Clear existing data (optional - uncomment if needed)
-- SET FOREIGN_KEY_CHECKS = 0;
-- TRUNCATE TABLE student_courses;
-- TRUNCATE TABLE faculty_courses;
-- TRUNCATE TABLE students;
-- TRUNCATE TABLE courses;
-- TRUNCATE TABLE employees;
-- TRUNCATE TABLE grades;
-- SET FOREIGN_KEY_CHECKS = 1;

-- Insert Grades (New Grading Scheme: A:85+, B:75-84, C:55-74, D:40-54, F:<40)
INSERT IGNORE INTO grades (letter_grade, grade_points) VALUES
('A', 4.0),
('B', 3.0),
('C', 2.0),
('D', 1.0),
('F', 1.0);

-- Insert Faculty
INSERT IGNORE INTO employees (first_name, last_name, email) VALUES
('Muralidhara', 'V N', 'facultyalgo@gmail.com'),
('Sachit', 'Rao', 'facultymml1@gmail.com');

-- Insert Courses
INSERT IGNORE INTO courses (course_code, name, description, credits, year, term) VALUES
('CS101', 'Basic Algo', 'Introduction to Algorithms', 4, 2025, 1),
('CS201', 'Advance Algo', 'Advanced Algorithms', 4, 2025, 3),
('MATH201', 'Linear Algebra', 'Linear Algebra and Matrix Theory', 4, 2025, 1),
('MATH301', 'Probability Statistics', 'Probability and Statistics', 4, 2025, 3);

-- Link Faculty to Courses
INSERT IGNORE INTO faculty_courses (faculty, course_id)
SELECT e.employee_id, c.course_id
FROM employees e
CROSS JOIN courses c
WHERE (e.email = 'facultyalgo@gmail.com' AND c.course_code IN ('CS101', 'CS201'))
   OR (e.email = 'facultymml1@gmail.com' AND c.course_code IN ('MATH201', 'MATH301'));

-- Insert Students - Set 1: Freshers (2025) - 25 students
INSERT IGNORE INTO students (roll_number, first_name, last_name, email) VALUES
('MT2025001', 'Aarav', 'Sharma', 'aarav.sharma@iiitb.ac.in'),
('MT2025002', 'Priya', 'Verma', 'priya.verma@iiitb.ac.in'),
('MT2025003', 'Rohan', 'Mehta', 'rohan.mehta@iiitb.ac.in'),
('MT2025004', 'Kavita', 'Reddy', 'kavita.reddy@iiitb.ac.in'),
('MT2025005', 'Arjun', 'Singh', 'arjun.singh@iiitb.ac.in'),
('MT2025006', 'Sneha', 'Nair', 'sneha.nair@iiitb.ac.in'),
('MT2025007', 'Kunal', 'Kapoor', 'kunal.kapoor@iiitb.ac.in'),
('MT2025008', 'Ananya', 'Iyer', 'ananya.iyer@iiitb.ac.in'),
('MT2025009', 'Varun', 'Gupta', 'varun.gupta@iiitb.ac.in'),
('MT2025010', 'Meera', 'Choudhary', 'meera.choudhary@iiitb.ac.in'),
('MT2025011', 'Siddharth', 'Joshi', 'siddharth.joshi@iiitb.ac.in'),
('MT2025012', 'Pooja', 'Menon', 'pooja.menon@iiitb.ac.in'),
('MT2025013', 'Aditya', 'Deshmukh', 'aditya.deshmukh@iiitb.ac.in'),
('MT2025014', 'Ritu', 'Bhatia', 'ritu.bhatia@iiitb.ac.in'),
('MT2025015', 'Nikhil', 'Malhotra', 'nikhil.malhotra@iiitb.ac.in'),
('MT2025016', 'Neha', 'Pillai', 'neha.pillai@iiitb.ac.in'),
('MT2025017', 'Rohit', 'Patil', 'rohit.patil@iiitb.ac.in'),
('MT2025018', 'Shreya', 'Shinde', 'shreya.shinde@iiitb.ac.in'),
('MT2025019', 'Sameer', 'Rathod', 'sameer.rathod@iiitb.ac.in'),
('MT2025020', 'Aisha', 'Khan', 'aisha.khan@iiitb.ac.in'),
('MT2025021', 'Manish', 'Dubey', 'manish.dubey@iiitb.ac.in'),
('MT2025022', 'Tanvi', 'Saxena', 'tanvi.saxena@iiitb.ac.in'),
('MT2025023', 'Harshit', 'Mishra', 'harshit.mishra@iiitb.ac.in'),
('MT2025024', 'Karishma', 'Yadav', 'karishma.yadav@iiitb.ac.in'),
('MT2025025', 'Pranav', 'Kulkarni', 'pranav.kulkarni@iiitb.ac.in');

-- Insert Students - Set 2: Seniors (2024) - 25 students
INSERT IGNORE INTO students (roll_number, first_name, last_name, email) VALUES
('MT2024001', 'Deepika', 'Shetty', 'deepika.shetty@iiitb.ac.in'),
('MT2024002', 'Mohit', 'Sahu', 'mohit.sahu@iiitb.ac.in'),
('MT2024003', 'Radhika', 'Sengupta', 'radhika.sengupta@iiitb.ac.in'),
('MT2024004', 'Vikram', 'Rajput', 'vikram.rajput@iiitb.ac.in'),
('MT2024005', 'Sanjana', 'Acharya', 'sanjana.acharya@iiitb.ac.in'),
('MT2024006', 'Jayant', 'Bhatt', 'jayant.bhatt@iiitb.ac.in'),
('MT2024007', 'Aditi', 'Rao', 'aditi.rao@iiitb.ac.in'),
('MT2024008', 'Harsh', 'Vora', 'harsh.vora@iiitb.ac.in'),
('MT2024009', 'Nikita', 'Shah', 'nikita.shah@iiitb.ac.in'),
('MT2024010', 'Amit', 'Pal', 'amit.pal@iiitb.ac.in'),
('MT2024011', 'Swati', 'Tiwari', 'swati.tiwari@iiitb.ac.in'),
('MT2024012', 'Chirag', 'Dave', 'chirag.dave@iiitb.ac.in'),
('MT2024013', 'Ishita', 'Banerjee', 'ishita.banerjee@iiitb.ac.in'),
('MT2024014', 'Ashwin', 'Naidu', 'ashwin.naidu@iiitb.ac.in'),
('MT2024015', 'Soumya', 'Bhattacharya', 'soumya.bhattacharya@iiitb.ac.in'),
('MT2024016', 'Karan', 'Bansal', 'karan.bansal@iiitb.ac.in'),
('MT2024017', 'Nandini', 'Ghosh', 'nandini.ghosh@iiitb.ac.in'),
('MT2024018', 'Yash', 'Thakur', 'yash.thakur@iiitb.ac.in'),
('MT2024019', 'Rhea', 'D Souza', 'rhea.dsouza@iiitb.ac.in'),
('MT2024020', 'Abhishek', 'Pathak', 'abhishek.pathak@iiitb.ac.in'),
('MT2024021', 'Madhuri', 'Mangal', 'madhuri.mangal@iiitb.ac.in'),
('MT2024022', 'Rajeev', 'Khatri', 'rajeev.khatri@iiitb.ac.in'),
('MT2024023', 'Sonal', 'Jain', 'sonal.jain@iiitb.ac.in'),
('MT2024024', 'Tejas', 'Soni', 'tejas.soni@iiitb.ac.in'),
('MT2024025', 'Shalini', 'Anand', 'shalini.anand@iiitb.ac.in');

-- Note: Student course enrollments and marks are managed dynamically
-- Total: 50 students (25 from 2025 + 25 from 2024)
-- Course enrollment pattern:
--   CS101 (Basic Algo): 21 students from 2025 batch
--   CS201 (Advance Algo): 23 students from 2024 batch
--   MATH201 (Linear Algebra): 22 students from 2025 batch
--   MATH301 (Probability Statistics): 20 students from 2024 batch
-- Total enrollments: 86
-- 
-- Marks distribution (10% fail, 40% poor, 30% good, 20% excellent)
-- Grading scheme: A (85+), B (75-84), C (55-74), D (40-54), F (<40)

-- Enroll students in courses with marks, grades, and comments
-- Comments are randomly distributed across all courses

INSERT INTO student_courses (student_id, course_id, marks, grade_id, comments)
SELECT s.student_id, c.course_id, marks, grade_id, comments FROM (
  SELECT
    'MT2024001' as roll, 'CS201' as code, 95.72 as marks, 1 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024001' as roll, 'MATH301' as code, 84.92 as marks, 2 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024002' as roll, 'CS201' as code, 57.83 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024002' as roll, 'MATH301' as code, 66.14 as marks, 3 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024003' as roll, 'CS201' as code, 36.45 as marks, 6 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024004' as roll, 'CS201' as code, 79.40 as marks, 2 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024004' as roll, 'MATH301' as code, 32.22 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024005' as roll, 'CS201' as code, 70.27 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024005' as roll, 'MATH301' as code, 82.09 as marks, 2 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024006' as roll, 'CS201' as code, 51.44 as marks, 4 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024006' as roll, 'MATH301' as code, 19.47 as marks, 6 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024007' as roll, 'CS201' as code, 51.24 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024008' as roll, 'CS201' as code, 43.04 as marks, 4 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024008' as roll, 'MATH301' as code, 63.54 as marks, 3 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024009' as roll, 'CS201' as code, 46.68 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024009' as roll, 'MATH301' as code, 93.01 as marks, 1 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024010' as roll, 'CS201' as code, 93.90 as marks, 1 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024010' as roll, 'MATH301' as code, 90.77 as marks, 1 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024011' as roll, 'MATH301' as code, 22.55 as marks, 6 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024012' as roll, 'CS201' as code, 85.78 as marks, 1 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024012' as roll, 'MATH301' as code, 56.21 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024013' as roll, 'CS201' as code, 86.69 as marks, 1 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024014' as roll, 'CS201' as code, 83.19 as marks, 2 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024014' as roll, 'MATH301' as code, 71.48 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024015' as roll, 'CS201' as code, 19.52 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024015' as roll, 'MATH301' as code, 62.62 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024016' as roll, 'CS201' as code, 58.00 as marks, 3 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024016' as roll, 'MATH301' as code, 96.85 as marks, 1 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024017' as roll, 'CS201' as code, 48.47 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024018' as roll, 'CS201' as code, 35.37 as marks, 6 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024018' as roll, 'MATH301' as code, 77.92 as marks, 2 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024019' as roll, 'MATH301' as code, 71.47 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024020' as roll, 'CS201' as code, 73.15 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024020' as roll, 'MATH301' as code, 67.30 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024021' as roll, 'CS201' as code, 65.62 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024021' as roll, 'MATH301' as code, 54.37 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2024022' as roll, 'CS201' as code, 98.94 as marks, 1 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2024022' as roll, 'MATH301' as code, 50.08 as marks, 4 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024023' as roll, 'CS201' as code, 65.54 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024024' as roll, 'CS201' as code, 54.09 as marks, 4 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2024024' as roll, 'MATH301' as code, 24.93 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024025' as roll, 'CS201' as code, 24.93 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2024025' as roll, 'MATH301' as code, 75.58 as marks, 2 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025001' as roll, 'CS101' as code, 25.00 as marks, 6 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025001' as roll, 'MATH201' as code, 85.67 as marks, 1 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025002' as roll, 'CS101' as code, 66.65 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025002' as roll, 'MATH201' as code, 61.66 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025003' as roll, 'CS101' as code, 68.81 as marks, 3 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025003' as roll, 'MATH201' as code, 36.33 as marks, 6 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025004' as roll, 'CS101' as code, 50.65 as marks, 4 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025004' as roll, 'MATH201' as code, 79.50 as marks, 2 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025005' as roll, 'CS101' as code, 71.63 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025005' as roll, 'MATH201' as code, 48.99 as marks, 4 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025006' as roll, 'MATH201' as code, 38.22 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025007' as roll, 'CS101' as code, 76.97 as marks, 2 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025007' as roll, 'MATH201' as code, 75.26 as marks, 2 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025008' as roll, 'CS101' as code, 59.69 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025009' as roll, 'CS101' as code, 63.68 as marks, 3 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025009' as roll, 'MATH201' as code, 67.30 as marks, 3 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025010' as roll, 'CS101' as code, 37.80 as marks, 6 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025010' as roll, 'MATH201' as code, 72.34 as marks, 3 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025011' as roll, 'CS101' as code, 82.61 as marks, 2 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025011' as roll, 'MATH201' as code, 40.10 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025012' as roll, 'MATH201' as code, 56.43 as marks, 3 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025013' as roll, 'CS101' as code, 74.94 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025013' as roll, 'MATH201' as code, 15.71 as marks, 6 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025014' as roll, 'CS101' as code, 12.81 as marks, 6 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025014' as roll, 'MATH201' as code, 57.15 as marks, 3 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025015' as roll, 'CS101' as code, 46.94 as marks, 4 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025016' as roll, 'CS101' as code, 73.16 as marks, 3 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025016' as roll, 'MATH201' as code, 50.76 as marks, 4 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025017' as roll, 'CS101' as code, 76.78 as marks, 2 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025017' as roll, 'MATH201' as code, 46.42 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025018' as roll, 'MATH201' as code, 41.08 as marks, 4 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025019' as roll, 'CS101' as code, 38.06 as marks, 6 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025019' as roll, 'MATH201' as code, 46.41 as marks, 4 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025020' as roll, 'CS101' as code, 87.59 as marks, 1 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025020' as roll, 'MATH201' as code, 54.42 as marks, 4 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025021' as roll, 'CS101' as code, 88.22 as marks, 1 as grade_id, 'Assignment Is pending' as comments
  UNION ALL SELECT
    'MT2025021' as roll, 'MATH201' as code, 35.81 as marks, 6 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025022' as roll, 'CS101' as code, 53.99 as marks, 4 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025023' as roll, 'CS101' as code, 13.01 as marks, 6 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025023' as roll, 'MATH201' as code, 90.12 as marks, 1 as grade_id, 'Initial Comment' as comments
  UNION ALL SELECT
    'MT2025024' as roll, 'MATH201' as code, 81.15 as marks, 2 as grade_id, 'Contact Student' as comments
  UNION ALL SELECT
    'MT2025025' as roll, 'CS101' as code, 47.80 as marks, 4 as grade_id, 'Review Answer Sheet' as comments
  UNION ALL SELECT
    'MT2025025' as roll, 'MATH201' as code, 36.02 as marks, 6 as grade_id, 'Initial Comment' as comments
) data
JOIN students s ON s.roll_number = data.roll
JOIN courses c ON c.course_code = data.code;

-- ==============================================================================
-- ENROLLMENT SUMMARY
-- ==============================================================================
-- Total Students: 50 (25 from MT2025 batch + 25 from MT2024 batch)
-- Total Enrollments: 86
--
-- Course Distribution:
--   - CS101 (Basic Algo): 21 students
--     • Initial Comment: 5, Assignment Is pending: 8, Contact Student: 5, Review Answer Sheet: 3
--   - CS201 (Advance Algo): 23 students
--     • Initial Comment: 3, Assignment Is pending: 8, Contact Student: 6, Review Answer Sheet: 6
--   - MATH201 (Linear Algebra): 22 students
--     • Initial Comment: 6, Assignment Is pending: 4, Contact Student: 6, Review Answer Sheet: 6
--   - MATH301 (Probability Statistics): 20 students
--     • Initial Comment: 8, Assignment Is pending: 4, Contact Student: 2, Review Answer Sheet: 6
--
-- Marks Distribution:
--   - Fail (<35): 9 students (10%)
--   - Poor (35-60): 34 students (40%)
--   - Good (60-80): 26 students (30%)
--   - Excellent (80-100): 17 students (20%)
--
-- Grade Distribution:
--   - A (85+): 12 students
--   - B (75-84): 12 students
--   - C (55-74): 25 students
--   - D (40-54): 20 students
--   - F (<40): 17 students
--
-- Overall Comments Distribution (Randomized):
--   - "Initial Comment": ~22 students
--   - "Assignment Is pending": ~24 students
--   - "Contact Student": ~19 students
--   - "Review Answer Sheet": ~21 students
-- ==============================================================================
