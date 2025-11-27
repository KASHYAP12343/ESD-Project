#!/bin/bash

# Quick Test Script for Faculty Grading System
# This script helps verify the setup before testing

echo "=========================================="
echo "Faculty Grading System - Quick Test"
echo "=========================================="
echo ""

# Check MySQL connection
echo "1. Testing MySQL connection..."
mysql -u root -p9426134175 -e "USE esd_project;" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "   ✓ MySQL connection successful"
else
    echo "   ✗ MySQL connection failed. Please check your MySQL setup."
    exit 1
fi

# Check database exists
echo ""
echo "2. Checking database..."
DB_EXISTS=$(mysql -u root -p9426134175 -e "SHOW DATABASES LIKE 'esd_project';" 2>/dev/null | grep esd_project)
if [ -n "$DB_EXISTS" ]; then
    echo "   ✓ Database 'esd_project' exists"
else
    echo "   ✗ Database 'esd_project' not found. Creating..."
    mysql -u root -p9426134175 -e "CREATE DATABASE esd_project;" 2>/dev/null
    echo "   ✓ Database created"
fi

# Check tables exist
echo ""
echo "3. Checking tables..."
TABLES=$(mysql -u root -p9426134175 esd_project -e "SHOW TABLES;" 2>/dev/null | wc -l)
if [ $TABLES -gt 1 ]; then
    echo "   ✓ Tables exist ($((TABLES-1)) tables found)"
else
    echo "   ⚠ No tables found. Tables will be created when you run the application."
fi

# Check data exists
echo ""
echo "4. Checking data..."
FACULTY_COUNT=$(mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM employees;" 2>/dev/null | tail -1)
STUDENT_COUNT=$(mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM students;" 2>/dev/null | tail -1)
COURSE_COUNT=$(mysql -u root -p9426134175 esd_project -e "SELECT COUNT(*) FROM courses;" 2>/dev/null | tail -1)

if [ -n "$FACULTY_COUNT" ] && [ "$FACULTY_COUNT" -gt 0 ]; then
    echo "   ✓ Faculty data: $FACULTY_COUNT faculty members"
else
    echo "   ⚠ No faculty data found. Run: mysql -u root -p9426134175 esd_project < data.sql"
fi

if [ -n "$STUDENT_COUNT" ] && [ "$STUDENT_COUNT" -gt 0 ]; then
    echo "   ✓ Student data: $STUDENT_COUNT students"
else
    echo "   ⚠ No student data found. Run: mysql -u root -p9426134175 esd_project < data.sql"
fi

if [ -n "$COURSE_COUNT" ] && [ "$COURSE_COUNT" -gt 0 ]; then
    echo "   ✓ Course data: $COURSE_COUNT courses"
else
    echo "   ⚠ No course data found. Run: mysql -u root -p9426134175 esd_project < data.sql"
fi

# Check Java
echo ""
echo "5. Checking Java..."
if command -v java &> /dev/null; then
    JAVA_VERSION=$(java -version 2>&1 | head -1)
    echo "   ✓ Java found: $JAVA_VERSION"
else
    echo "   ✗ Java not found. Please install Java 17+"
    exit 1
fi

# Check Maven
echo ""
echo "6. Checking Maven..."
if command -v mvn &> /dev/null; then
    MVN_VERSION=$(mvn -version | head -1)
    echo "   ✓ Maven found: $MVN_VERSION"
else
    echo "   ✗ Maven not found. Please install Maven 3.6+"
    exit 1
fi

# Summary
echo ""
echo "=========================================="
echo "Test Summary"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. If data is missing, run: mysql -u root -p9426134175 esd_project < data.sql"
echo "2. Build the project: mvn clean install"
echo "3. Run the application: mvn spring-boot:run"
echo "4. Open browser: http://localhost:8080/test.html"
echo "5. Login with Google (email must contain 'faculty')"
echo ""
echo "For detailed testing guide, see: TESTING_GUIDE.md"
echo ""

