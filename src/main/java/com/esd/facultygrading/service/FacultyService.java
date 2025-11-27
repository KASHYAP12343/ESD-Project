package com.esd.facultygrading.service;

import com.esd.facultygrading.dto.CourseDTO;
import com.esd.facultygrading.dto.StudentGradeDTO;
import com.esd.facultygrading.entity.*;
import com.esd.facultygrading.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacultyService {

    private static final BigDecimal MIN_MARKS = new BigDecimal("0.00");
    private static final BigDecimal MAX_MARKS = new BigDecimal("100.00");

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentCourseRepository studentCourseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GradeRepository gradeRepository;

    @Autowired
    private FacultyCourseRepository facultyCourseRepository;

    public Employee getFacultyByEmail(String email) {
        return employeeRepository.findByEmail(email).orElse(null);
    }

    public List<CourseDTO> getCoursesByFaculty(Long facultyId) {
        List<Course> courses = courseRepository.findCoursesByFacultyId(facultyId);
        return courses.stream()
                .map(c -> new CourseDTO(
                        c.getCourseId(),
                        c.getCourseCode(),
                        c.getName(),
                        c.getDescription(),
                        c.getCredits(),
                        c.getYear(),
                        c.getTerm()))
                .collect(Collectors.toList());
    }

    public List<StudentGradeDTO> getStudentsByCourse(Long courseId, Long facultyId) {
        // Verify faculty teaches this course
        FacultyCourse fc = facultyCourseRepository.findByFacultyAndCourse(facultyId, courseId);
        if (fc == null) {
            throw new RuntimeException("Faculty does not teach this course");
        }

        List<StudentCourse> studentCourses = studentCourseRepository.findByCourse_CourseId(courseId);
        return studentCourses.stream()
                .map(sc -> {
                    Long studentId = sc.getStudentId();
                    if (studentId == null)
                        return null;
                    Student student = studentRepository.findById(studentId).orElse(null);
                    if (student == null)
                        return null;

                    StudentGradeDTO dto = new StudentGradeDTO();
                    dto.setStudentCourseId(sc.getId());
                    dto.setStudentId(student.getStudentId());
                    dto.setRollNumber(student.getRollNumber());
                    dto.setFirstName(student.getFirstName());
                    dto.setLastName(student.getLastName());
                    dto.setEmail(student.getEmail());
                    dto.setMarks(sc.getMarks());
                    dto.setComments(sc.getComments());
                    if (sc.getGrade() != null) {
                        dto.setGradeId(sc.getGrade().getGradeId());
                        dto.setLetterGrade(sc.getGrade().getLetterGrade());
                    }
                    return dto;
                })
                .filter(dto -> dto != null)
                .collect(Collectors.toList());
    }

    @Transactional
    public StudentGradeDTO updateStudentGrade(Long courseId, Long studentCourseId, BigDecimal marks, String comments,
            Long facultyId) {
        if (studentCourseId == null) {
            throw new IllegalArgumentException("Student course ID cannot be null");
        }
        StudentCourse studentCourse = studentCourseRepository.findById(studentCourseId)
                .orElseThrow(() -> new RuntimeException("Student course not found"));

        // Verify the student-course record belongs to the specified course
        if (!studentCourse.getCourse().getCourseId().equals(courseId)) {
            throw new RuntimeException("Student does not belong to this course");
        }

        // Verify faculty teaches this course
        FacultyCourse fc = facultyCourseRepository.findByFacultyAndCourse(
                facultyId, courseId);
        if (fc == null) {
            throw new RuntimeException("Faculty does not teach this course");
        }

        studentCourse.setMarks(marks != null ? clampMarks(marks) : null);

        // Only update comments if a non-empty value is provided
        if (comments != null && !comments.trim().isEmpty()) {
            studentCourse.setComments(comments);
        }
        // If comments is null or empty, keep the existing comment (don't overwrite)

        // Auto-assign grade based on marks
        if (studentCourse.getMarks() != null) {
            Grade grade = determineGrade(studentCourse.getMarks());
            System.out.println("DEBUG: Determined grade: " + (grade != null ? grade.getLetterGrade() : "null") +
                    " for marks: " + studentCourse.getMarks());
            studentCourse.setGrade(grade);
        } else {
            studentCourse.setGrade(null);
        }

        studentCourse = studentCourseRepository.save(studentCourse);

        Long studentId = studentCourse.getStudentId();
        if (studentId == null) {
            throw new RuntimeException("Student ID is null for student course");
        }
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        StudentGradeDTO dto = new StudentGradeDTO();
        dto.setStudentCourseId(studentCourse.getId());
        dto.setStudentId(student.getStudentId());
        dto.setRollNumber(student.getRollNumber());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setMarks(studentCourse.getMarks());
        dto.setComments(studentCourse.getComments());
        if (studentCourse.getGrade() != null) {
            dto.setGradeId(studentCourse.getGrade().getGradeId());
            dto.setLetterGrade(studentCourse.getGrade().getLetterGrade());
        }
        return dto;
    }

    @Transactional
    public void addGraceMarksToAll(Long courseId, BigDecimal graceMarks, Long facultyId, List<Long> studentCourseIds) {
        // Verify faculty teaches this course
        FacultyCourse fc = facultyCourseRepository.findByFacultyAndCourse(facultyId, courseId);
        if (fc == null) {
            throw new RuntimeException("Faculty does not teach this course");
        }

        List<StudentCourse> studentCourses = studentCourseRepository.findByCourse_CourseId(courseId);
        if (studentCourses != null && !studentCourses.isEmpty()) {
            // Filter by selected student course IDs if provided
            if (studentCourseIds != null && !studentCourseIds.isEmpty()) {
                studentCourses = studentCourses.stream()
                        .filter(sc -> studentCourseIds.contains(sc.getId()))
                        .collect(Collectors.toList());
            }

            // Ensure we still have students to update after filtering
            if (studentCourses.isEmpty()) {
                return;
            }

            for (StudentCourse sc : studentCourses) {
                BigDecimal currentMarks = sc.getMarks() != null ? sc.getMarks() : BigDecimal.ZERO;
                BigDecimal updatedMarks = clampMarks(currentMarks.add(graceMarks));
                sc.setMarks(updatedMarks);
                Grade grade = determineGrade(updatedMarks);
                sc.setGrade(grade);
            }
            studentCourseRepository.saveAll(studentCourses);
        }
    }

    @Transactional
    public void decreaseMarksForAll(Long courseId, BigDecimal marksToDecrease, Long facultyId,
            List<Long> studentCourseIds) {
        // Verify faculty teaches this course
        FacultyCourse fc = facultyCourseRepository.findByFacultyAndCourse(facultyId, courseId);
        if (fc == null) {
            throw new RuntimeException("Faculty does not teach this course");
        }

        List<StudentCourse> studentCourses = studentCourseRepository.findByCourse_CourseId(courseId);
        if (studentCourses != null && !studentCourses.isEmpty()) {
            // Filter by selected student course IDs if provided
            if (studentCourseIds != null && !studentCourseIds.isEmpty()) {
                studentCourses = studentCourses.stream()
                        .filter(sc -> studentCourseIds.contains(sc.getId()))
                        .collect(Collectors.toList());
            }

            // Ensure we still have students to update after filtering
            if (studentCourses.isEmpty()) {
                return;
            }

            for (StudentCourse sc : studentCourses) {
                BigDecimal currentMarks = sc.getMarks() != null ? sc.getMarks() : BigDecimal.ZERO;
                BigDecimal updatedMarks = clampMarks(currentMarks.subtract(marksToDecrease));
                sc.setMarks(updatedMarks);
                Grade grade = determineGrade(updatedMarks);
                sc.setGrade(grade);
            }
            studentCourseRepository.saveAll(studentCourses);
        }
    }

    private Grade determineGrade(BigDecimal marks) {
        if (marks == null)
            return null;

        double marksValue = marks.doubleValue();
        String letterGrade;
        BigDecimal gradePoints;

        if (marksValue >= 85) {
            letterGrade = "A";
            gradePoints = new BigDecimal("4.0");
        } else if (marksValue >= 70) {
            letterGrade = "B";
            gradePoints = new BigDecimal("3.0");
        } else if (marksValue >= 50) {
            letterGrade = "C";
            gradePoints = new BigDecimal("2.0");
        } else if (marksValue >= 35) {
            letterGrade = "D";
            gradePoints = new BigDecimal("1.0");
        } else {
            letterGrade = "F";
            gradePoints = new BigDecimal("1.0"); // Minimum allowed by DB constraint
        }

        BigDecimal minPoints = new BigDecimal("1.0");
        BigDecimal maxPoints = new BigDecimal("4.0");
        if (gradePoints.compareTo(minPoints) < 0) {
            gradePoints = minPoints;
        }
        if (gradePoints.compareTo(maxPoints) > 0) {
            gradePoints = maxPoints;
        }

        final BigDecimal finalGradePoints = gradePoints;
        return gradeRepository.findByLetterGrade(letterGrade)
                .orElseGet(() -> {
                    Grade newGrade = new Grade();
                    newGrade.setLetterGrade(letterGrade);
                    newGrade.setGradePoints(finalGradePoints);
                    return gradeRepository.save(newGrade);
                });
    }

    private BigDecimal clampMarks(BigDecimal marks) {
        if (marks == null) {
            return null;
        }
        BigDecimal normalized = marks.setScale(2, RoundingMode.HALF_UP);
        if (normalized.compareTo(MIN_MARKS) < 0) {
            normalized = MIN_MARKS;
        }
        if (normalized.compareTo(MAX_MARKS) > 0) {
            normalized = MAX_MARKS;
        }
        return normalized;
    }
}
