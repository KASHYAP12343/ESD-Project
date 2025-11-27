# Quick Start Guide - Testing the Backend

## 🚀 Quick Setup (5 minutes)

### Step 1: Verify Setup
```bash
./quick_test.sh
```
This will check MySQL, database, data, Java, and Maven.

### Step 2: Load Data (if needed)
```bash
mysql -u root -p9426134175 esd_project < data.sql
```

### Step 3: Start the Application
```bash
mvn spring-boot:run
```

Wait for: `Started FacultyGradingApplication in X.XXX seconds`

### Step 4: Test in Browser
1. Open: **http://localhost:8080/test.html**
2. Click: **"Login with Google"**
3. Use a Google account with "faculty" in the email
4. Test all features through the UI

## 📋 Testing Checklist

### Basic Tests
- [ ] Application starts without errors
- [ ] Can access http://localhost:8080
- [ ] Google OAuth login works
- [ ] Faculty can see courses after login
- [ ] Can view students for a course
- [ ] Can update individual student grade
- [ ] Can add grace marks to all students
- [ ] Can decrease marks for all students

### Data Verification
```bash
# Check faculty
mysql -u root -p9426134175 esd_project -e "SELECT * FROM employees;"

# Check students
mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM students;"

# Check enrollments
mysql -u root -p9426134175 esd_project -e "SELECT c.name, COUNT(*) as students FROM student_courses sc JOIN courses c ON sc.course_id = c.course_id GROUP BY c.name;"
```

## 🔧 Common Issues

### Application won't start
- Check MySQL is running: `sudo systemctl status mysql`
- Verify database exists: `mysql -u root -p9426134175 -e "SHOW DATABASES;"`
- Check port 8080 is free: `lsof -i :8080`

### OAuth login fails
- Verify Google OAuth credentials in `application.properties`
- Check redirect URI in Google Cloud Console matches: `http://localhost:8080/login/oauth2/code/google`

### No data visible
- Load data: `mysql -u root -p9426134175 esd_project < data.sql`
- Verify data: `mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM students;"`

### CORS errors
- Ensure test.html is accessed via `http://localhost:8080/test.html` (not file://)
- Check browser console for specific error messages

## 📚 More Information

- **Detailed Testing Guide**: See `TESTING_GUIDE.md`
- **API Documentation**: See `README.md`
- **Database Schema**: See table descriptions in code

## 🎯 Quick Test URLs

- **Test Page**: http://localhost:8080/test.html
- **Login**: http://localhost:8080/oauth2/authorization/google
- **API - Courses**: http://localhost:8080/api/faculty/courses (requires auth)
- **Error Page**: http://localhost:8080/error

## 💡 Tips

1. **Use Browser DevTools** (F12) to see API calls and responses
2. **Check Application Logs** for detailed error messages
3. **Verify Session Cookie** is set after OAuth login
4. **Test with Both Faculty Accounts**:
   - facultyalgo@gmail.com (CS101, CS201)
   - facultymml1@gmail.com (MATH201, MATH301)

