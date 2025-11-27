# Faculty Grading System - Spring Boot Backend

A Spring Boot application for faculty to manage student grades with Google OAuth2 authentication.

## Features

- Google OAuth2 authentication (faculty-only access)
- Faculty can view courses they teach
- View students enrolled in each course
- Update individual student grades
- Add grace marks to all students
- Decrease marks for all students
- Automatic grade assignment based on marks

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Google OAuth2 credentials (already configured)

## Database Setup

1. Create MySQL database:
```sql
CREATE DATABASE esd_project;
```

2. The database connection is already configured in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/esd_project
spring.datasource.username=root
spring.datasource.password=9426134175
```

3. Load dummy data into the database:
   - Option 1: Run the SQL file directly:
     ```bash
     mysql -u root -p9426134175 esd_project < data.sql
     ```
   - Option 2: Use the provided script:
     ```bash
     ./load_data.sh
     ```
   - Option 3: The application will auto-create tables on first run, but you'll need to load data manually using the SQL file

## Running the Application

1. Build the project:
```bash
mvn clean install
```

2. Run the application:
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## Dummy Data

The `data.sql` file contains all the dummy data:
- **2 Faculty members:**
  - `facultyalgo@gmail.com` (John Smith) - teaches "Basic Algo" (CS101) and "Advance Algo" (CS201)
  - `facultymml1@gmail.com` (Jane Doe) - teaches "Linear Algebra" (MATH201) and "Probability Statistics" (MATH301)
- **28 Students** (STU001 to STU028) enrolled in various courses
- **4 Courses:**
  - CS101: Basic Algo (20 students)
  - CS201: Advance Algo (14 students)
  - MATH201: Linear Algebra (14 students)
  - MATH301: Probability Statistics (14 students)
- **Grades** automatically assigned based on marks (A, B, C, D, F)

**Note:** Run `data.sql` to populate the database with this data. The application's DataInitializer will also create data on first run, but using the SQL file is recommended for consistency.

## Testing

1. Open `test.html` in your browser
2. Click "Login with Google" and use a faculty email (must contain "faculty" keyword)
3. Test all functionality through the test interface

## API Endpoints

- `GET /api/faculty/courses` - Get all courses for logged-in faculty
- `GET /api/faculty/courses/{courseId}/students` - Get students enrolled in a course
- `PUT /api/faculty/students/{studentCourseId}/grade` - Update individual student grade
- `POST /api/faculty/courses/{courseId}/grace-marks` - Add grace marks to all students
- `POST /api/faculty/courses/{courseId}/decrease-marks` - Decrease marks for all students

## Security

- Only users with "faculty" keyword in their email can login
- Faculty must exist in the database to access the system
- OAuth2 authentication required for all API endpoints

