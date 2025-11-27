package com.esd.facultygrading.config;

import com.esd.facultygrading.entity.*;
import com.esd.facultygrading.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private FacultyCourseRepository facultyCourseRepository;

    @Autowired
    private StudentCourseRepository studentCourseRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Check if data already exists (from data.sql)
        if (studentRepository.count() > 0) {
            System.out.println("Data already exists in database. Skipping initialization.");
            return;
        }

        // Initialize grades
        initializeGrades();

        // Initialize faculty
        Employee faculty1 = createFaculty("facultyalgo@gmail.com", "Muralidhara", "V N");
        Employee faculty2 = createFaculty("facultymml1@gmail.com", "Sachit", "Rao");

        // Initialize courses
        Course basicAlgo = createCourse("CS101", "Basic Algo", "Introduction to Algorithms", 3, 2024, 1);
        Course advanceAlgo = createCourse("CS201", "Advance Algo", "Advanced Algorithms", 3, 2024, 1);
        Course linearAlgebra = createCourse("MATH201", "Linear Algebra", "Linear Algebra and Matrix Theory", 3, 2024,
                1);
        Course probStats = createCourse("MATH301", "Probability Statistics", "Probability and Statistics", 3, 2024, 1);

        // Assign courses to faculty
        createFacultyCourse(faculty1.getEmployeeId(), basicAlgo);
        createFacultyCourse(faculty1.getEmployeeId(), advanceAlgo);
        createFacultyCourse(faculty2.getEmployeeId(), linearAlgebra);
        createFacultyCourse(faculty2.getEmployeeId(), probStats);

        // Initialize students (25-30 students)
        List<Student> students = createStudents(28);

        // Enroll students in courses
        Random random = new Random();
        for (Student student : students) {
            // Each student enrolled in 2-3 courses randomly
            int numCourses = 2 + random.nextInt(2);
            List<Course> availableCourses = List.of(basicAlgo, advanceAlgo, linearAlgebra, probStats);

            for (int i = 0; i < numCourses; i++) {
                Course course = availableCourses.get(random.nextInt(availableCourses.size()));
                if (!isEnrolled(student.getStudentId(), course.getCourseId())) {
                    createStudentCourse(student.getStudentId(), course, random);
                }
            }
        }

        System.out.println("Data initialization completed!");
    }

    private void initializeGrades() {
        if (gradeRepository.count() == 0) {
            gradeRepository.save(new Grade(null, "A", new BigDecimal("4.0")));
            gradeRepository.save(new Grade(null, "B", new BigDecimal("3.0")));
            gradeRepository.save(new Grade(null, "C", new BigDecimal("2.0")));
            gradeRepository.save(new Grade(null, "D", new BigDecimal("1.0")));
            gradeRepository.save(new Grade(null, "F", new BigDecimal("1.0")));
        }
    }

    private Employee createFaculty(String email, String firstName, String lastName) {
        Employee faculty = employeeRepository.findByEmail(email).orElse(null);
        if (faculty == null) {
            faculty = new Employee();
            faculty.setEmail(email);
            faculty.setFirstName(firstName);
            faculty.setLastName(lastName);
            faculty = employeeRepository.save(faculty);
        }
        return faculty;
    }

    private Course createCourse(String code, String name, String description, int credits, int year, int term) {
        Course course = courseRepository.findByCourseCode(code).orElse(null);
        if (course == null) {
            course = new Course();
            course.setCourseCode(code);
            course.setName(name);
            course.setDescription(description);
            course.setCredits(credits);
            course.setYear(year);
            course.setTerm(term);
            course = courseRepository.save(course);
        }
        return course;
    }

    private void createFacultyCourse(Long facultyId, Course course) {
        var existing = facultyCourseRepository.findByFacultyAndCourse(facultyId, course.getCourseId());
        if (existing == null) {
            FacultyCourse fc = new FacultyCourse();
            fc.setFaculty(facultyId);
            fc.setCourse(course);
            facultyCourseRepository.save(fc);
        }
    }

    private List<Student> createStudents(int count) {
        List<Student> students = new ArrayList<>();

        // Real student data from data.sql
        String[][] studentData = {
                // Freshers (2025)
                { "MT2025001", "Aarav", "Sharma" }, { "MT2025002", "Priya", "Verma" },
                { "MT2025003", "Rohan", "Mehta" }, { "MT2025004", "Kavita", "Reddy" },
                { "MT2025005", "Arjun", "Singh" }, { "MT2025006", "Sneha", "Nair" },
                { "MT2025007", "Kunal", "Kapoor" }, { "MT2025008", "Ananya", "Iyer" },
                { "MT2025009", "Varun", "Gupta" }, { "MT2025010", "Meera", "Choudhary" },
                { "MT2025011", "Siddharth", "Joshi" }, { "MT2025012", "Pooja", "Menon" },
                { "MT2025013", "Aditya", "Deshmukh" }, { "MT2025014", "Ritu", "Bhatia" },
                { "MT2025015", "Nikhil", "Malhotra" }, { "MT2025016", "Neha", "Pillai" },
                { "MT2025017", "Rohit", "Patil" }, { "MT2025018", "Shreya", "Shinde" },
                { "MT2025019", "Sameer", "Rathod" }, { "MT2025020", "Aisha", "Khan" },
                { "MT2025021", "Manish", "Dubey" }, { "MT2025022", "Tanvi", "Saxena" },
                { "MT2025023", "Harshit", "Mishra" }, { "MT2025024", "Karishma", "Yadav" },
                { "MT2025025", "Pranav", "Kulkarni" },
                // Seniors (2024)
                { "MT2024001", "Deepika", "Shetty" }, { "MT2024002", "Mohit", "Sahu" },
                { "MT2024003", "Radhika", "Sengupta" }, { "MT2024004", "Vikram", "Rajput" },
                { "MT2024005", "Sanjana", "Acharya" }, { "MT2024006", "Jayant", "Bhatt" },
                { "MT2024007", "Aditi", "Rao" }, { "MT2024008", "Harsh", "Vora" },
                { "MT2024009", "Nikita", "Shah" }, { "MT2024010", "Amit", "Pal" },
                { "MT2024011", "Swati", "Tiwari" }, { "MT2024012", "Chirag", "Dave" },
                { "MT2024013", "Ishita", "Banerjee" }, { "MT2024014", "Ashwin", "Naidu" },
                { "MT2024015", "Soumya", "Bhattacharya" }, { "MT2024016", "Karan", "Bansal" },
                { "MT2024017", "Nandini", "Ghosh" }, { "MT2024018", "Yash", "Thakur" },
                { "MT2024019", "Rhea", "D Souza" }, { "MT2024020", "Abhishek", "Pathak" },
                { "MT2024021", "Madhuri", "Mangal" }, { "MT2024022", "Rajeev", "Khatri" },
                { "MT2024023", "Sonal", "Jain" }, { "MT2024024", "Tejas", "Soni" },
                { "MT2024025", "Shalini", "Anand" }
        };

        for (String[] data : studentData) {
            String rollNumber = data[0];
            String firstName = data[1];
            String lastName = data[2];
            String email = firstName.toLowerCase() + "." + lastName.toLowerCase().replace(" ", "") + "@iiitb.ac.in";

            // Check if student already exists
            Student existingStudent = studentRepository.findByRollNumber(rollNumber).orElse(null);
            if (existingStudent != null) {
                students.add(existingStudent);
                continue;
            }

            Student student = new Student();
            student.setRollNumber(rollNumber);
            student.setFirstName(firstName);
            student.setLastName(lastName);
            student.setEmail(email);
            student = studentRepository.save(student);
            students.add(student);
        }
        return students;
    }

    private void createStudentCourse(Long studentId, Course course, Random random) {
        // Check if enrollment already exists
        if (isEnrolled(studentId, course.getCourseId())) {
            return;
        }

        StudentCourse sc = new StudentCourse();
        sc.setStudentId(studentId);
        sc.setCourse(course);

        // Random marks between 50-95
        BigDecimal marks = new BigDecimal(50 + random.nextDouble() * 45).setScale(2, java.math.RoundingMode.HALF_UP);
        sc.setMarks(marks);

        // Assign grade based on marks
        Grade grade = determineGrade(marks);
        sc.setGrade(grade);

        sc.setComments("Initial grade");
        studentCourseRepository.save(sc);
    }

    private boolean isEnrolled(Long studentId, Long courseId) {
        return studentCourseRepository.findByStudentIdAndCourse_CourseId(studentId, courseId) != null;
    }

    private Grade determineGrade(BigDecimal marks) {
        double marksValue = marks.doubleValue();
        String letterGrade;

        if (marksValue >= 90) {
            letterGrade = "A";
        } else if (marksValue >= 80) {
            letterGrade = "B";
        } else if (marksValue >= 70) {
            letterGrade = "C";
        } else if (marksValue >= 60) {
            letterGrade = "D";
        } else {
            letterGrade = "F";
        }

        return gradeRepository.findAll().stream()
                .filter(g -> g.getLetterGrade().equals(letterGrade))
                .findFirst()
                .orElse(null);
    }
}
