# Testing Guide - Faculty Grading System Backend

## Prerequisites Check

1. **MySQL is running:**
   ```bash
   sudo systemctl status mysql
   # or
   mysql --version
   ```

2. **Java 17+ is installed:**
   ```bash
   java -version
   ```

3. **Maven is installed:**
   ```bash
   mvn -version
   ```

## Step 1: Database Setup

1. **Create the database:**
   ```bash
   mysql -u root -p9426134175 -e "CREATE DATABASE IF NOT EXISTS esd_project;"
   ```

2. **Load the dummy data:**
   ```bash
   mysql -u root -p9426134175 esd_project < data.sql
   ```

3. **Verify data is loaded:**
   ```bash
   mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) as faculty_count FROM employees;"
   mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) as student_count FROM students;"
   mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) as course_count FROM courses;"
   ```

## Step 2: Build and Run the Application

1. **Build the project:**
   ```bash
   mvn clean install
   ```

2. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

   You should see:
   ```
   Started FacultyGradingApplication in X.XXX seconds
   ```

3. **Verify the application is running:**
   - Open browser: `http://localhost:8080`
   - You should be redirected to Google OAuth login

## Step 3: Testing Methods

### Method 1: Using the Test HTML File (Recommended)

1. **Open test.html in your browser:**
   ```bash
   # If using a local file, you may need to serve it via HTTP
   # Or use a simple HTTP server:
   python3 -m http.server 8000
   # Then open: http://localhost:8000/test.html
   ```

2. **Or serve it with the Spring Boot app:**
   - Copy `test.html` to `src/main/resources/static/test.html`
   - Access it at: `http://localhost:8080/test.html`

3. **Test Flow:**
   - Click "Login with Google"
   - Use `facultyalgo@gmail.com` or `facultymml1@gmail.com` (must be a real Google account with "faculty" in email)
   - After login, you'll see your courses
   - Select a course to see enrolled students
   - Test updating individual grades
   - Test bulk operations (grace marks, decrease marks)

### Method 2: Using cURL (Command Line)

**Note:** OAuth2 requires browser authentication first. After logging in via browser, you can use the session cookie.

1. **Login via browser first:**
   - Go to: `http://localhost:8080/oauth2/authorization/google`
   - Complete Google OAuth
   - Copy the session cookie from browser dev tools

2. **Get Faculty Courses:**
   ```bash
   curl -X GET "http://localhost:8080/api/faculty/courses" \
     -H "Cookie: JSESSIONID=YOUR_SESSION_ID" \
     -H "Content-Type: application/json"
   ```

3. **Get Students for a Course:**
   ```bash
   curl -X GET "http://localhost:8080/api/faculty/courses/1/students" \
     -H "Cookie: JSESSIONID=YOUR_SESSION_ID" \
     -H "Content-Type: application/json"
   ```

4. **Update Student Grade:**
   ```bash
   curl -X PUT "http://localhost:8080/api/faculty/students/1/grade" \
     -H "Cookie: JSESSIONID=YOUR_SESSION_ID" \
     -H "Content-Type: application/json" \
     -d '{
       "marks": 85.5,
       "comments": "Good performance"
     }'
   ```

5. **Add Grace Marks to All:**
   ```bash
   curl -X POST "http://localhost:8080/api/faculty/courses/1/grace-marks" \
     -H "Cookie: JSESSIONID=YOUR_SESSION_ID" \
     -H "Content-Type: application/json" \
     -d '{
       "graceMarks": 5.0
     }'
   ```

6. **Decrease Marks for All:**
   ```bash
   curl -X POST "http://localhost:8080/api/faculty/courses/1/decrease-marks" \
     -H "Cookie: JSESSIONID=YOUR_SESSION_ID" \
     -H "Content-Type: application/json" \
     -d '{
       "marksToDecrease": 2.0
     }'
   ```

### Method 3: Using Postman

1. **Setup:**
   - Import the collection (create manually)
   - Set base URL: `http://localhost:8080`

2. **Authentication:**
   - Go to `http://localhost:8080/oauth2/authorization/google` in browser
   - After login, copy cookies from browser
   - In Postman, go to Cookies tab and add:
     - Domain: `localhost`
     - Name: `JSESSIONID`
     - Value: (your session ID)

3. **Test Endpoints:**
   - `GET /api/faculty/courses`
   - `GET /api/faculty/courses/{courseId}/students`
   - `PUT /api/faculty/students/{studentCourseId}/grade`
   - `POST /api/faculty/courses/{courseId}/grace-marks`
   - `POST /api/faculty/courses/{courseId}/decrease-marks`

## Step 4: Testing Scenarios

### Scenario 1: Faculty Login
1. Go to `http://localhost:8080`
2. Should redirect to Google OAuth
3. Login with email containing "faculty"
4. Should redirect to courses page or home

### Scenario 2: Non-Faculty Login (Should Fail)
1. Try to login with email NOT containing "faculty"
2. Should see error page: "Access Denied: Only faculty members can login"

### Scenario 3: View Courses
1. After login, call `GET /api/faculty/courses`
2. Should return courses for logged-in faculty:
   - `facultyalgo@gmail.com` → CS101, CS201
   - `facultymml1@gmail.com` → MATH201, MATH301

### Scenario 4: View Students
1. Select a course (e.g., courseId=1 for CS101)
2. Call `GET /api/faculty/courses/1/students`
3. Should return list of enrolled students with their grades

### Scenario 5: Update Individual Grade
1. Get a studentCourseId from students list
2. Call `PUT /api/faculty/students/{id}/grade` with new marks
3. Verify marks and grade are updated

### Scenario 6: Bulk Operations
1. Select a course
2. Add grace marks (e.g., 5 points)
3. Verify all students' marks increased by 5
4. Decrease marks (e.g., 2 points)
5. Verify all students' marks decreased by 2

## Step 5: Verify Database Changes

After testing, verify changes in database:

```bash
# Check updated marks
mysql -u root -p9426134175 esd_project -e "
SELECT sc.id, s.roll_number, s.first_name, c.name as course, sc.marks, g.letter_grade 
FROM student_courses sc
JOIN students s ON sc.student_id = s.student_id
JOIN courses c ON sc.course_id = c.course_id
LEFT JOIN grades g ON sc.grade_id = g.grade_id
WHERE c.course_code = 'CS101'
LIMIT 10;
"
```

## Troubleshooting

### Issue: Cannot connect to database
- Check MySQL is running: `sudo systemctl status mysql`
- Verify credentials in `application.properties`
- Check database exists: `mysql -u root -p9426134175 -e "SHOW DATABASES;"`

### Issue: OAuth2 login fails
- Verify Google OAuth credentials in `application.properties`
- Check redirect URI is configured in Google Cloud Console
- Ensure redirect URI includes: `http://localhost:8080/login/oauth2/code/google`

### Issue: "Faculty not found" error
- Verify faculty data is loaded: `mysql -u root -p9426134175 esd_project -e "SELECT * FROM employees;"`
- Ensure email matches exactly (case-sensitive)

### Issue: No students in course
- Check enrollments: `mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM student_courses;"`
- Verify course ID is correct

### Issue: CORS errors in browser
- Check `CorsConfig.java` is properly configured
- Verify test.html is accessing correct URL

## Quick Test Checklist

- [ ] Database created and data loaded
- [ ] Application starts without errors
- [ ] Can access `http://localhost:8080`
- [ ] Google OAuth login works
- [ ] Faculty can see their courses
- [ ] Can view students for a course
- [ ] Can update individual student grade
- [ ] Can add grace marks to all
- [ ] Can decrease marks for all
- [ ] Grades update automatically based on marks

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/faculty/courses` | Get all courses for logged-in faculty |
| GET | `/api/faculty/courses/{courseId}/students` | Get students enrolled in a course |
| PUT | `/api/faculty/students/{studentCourseId}/grade` | Update individual student grade |
| POST | `/api/faculty/courses/{courseId}/grace-marks` | Add grace marks to all students |
| POST | `/api/faculty/courses/{courseId}/decrease-marks` | Decrease marks for all students |

## Expected Response Examples

### GET /api/faculty/courses
```json
{
  "faculty": {
    "id": 1,
    "name": "John Smith",
    "email": "facultyalgo@gmail.com"
  },
  "courses": [
    {
      "courseId": 1,
      "courseCode": "CS101",
      "name": "Basic Algo",
      "description": "Introduction to Algorithms",
      "credits": 3,
      "year": 2024,
      "term": 1
    }
  ]
}
```

### GET /api/faculty/courses/1/students
```json
[
  {
    "studentCourseId": 1,
    "studentId": 1,
    "rollNumber": "STU001",
    "firstName": "Alice",
    "lastName": "Anderson",
    "email": "student1@university.edu",
    "marks": 75.50,
    "comments": "Initial grade",
    "gradeId": 3,
    "letterGrade": "C"
  }
]
```

