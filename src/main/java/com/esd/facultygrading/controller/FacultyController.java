package com.esd.facultygrading.controller;

import com.esd.facultygrading.dto.CourseDTO;
import com.esd.facultygrading.dto.StudentGradeDTO;
import com.esd.facultygrading.entity.Employee;
import com.esd.facultygrading.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    @Autowired
    private FacultyService facultyService;

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses(@AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");
            Employee faculty = facultyService.getFacultyByEmail(email);

            if (faculty == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty not found"));
            }

            List<CourseDTO> courses = facultyService.getCoursesByFaculty(faculty.getEmployeeId());
            Map<String, Object> response = new HashMap<>();
            response.put("faculty", Map.of(
                    "id", faculty.getEmployeeId(),
                    "name", faculty.getFirstName() + " " + faculty.getLastName(),
                    "email", faculty.getEmail()));
            response.put("courses", courses);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/courses/{courseId}/students")
    public ResponseEntity<?> getStudentsByCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");
            Employee faculty = facultyService.getFacultyByEmail(email);

            if (faculty == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty not found"));
            }

            List<StudentGradeDTO> students = facultyService.getStudentsByCourse(courseId, faculty.getEmployeeId());
            return ResponseEntity.ok(students);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/courses/{courseId}/students/{studentCourseId}/grade")
    public ResponseEntity<?> updateStudentGrade(
            @PathVariable Long courseId,
            @PathVariable Long studentCourseId,
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");
            Employee faculty = facultyService.getFacultyByEmail(email);

            if (faculty == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty not found"));
            }

            BigDecimal marks = request.get("marks") != null ? new BigDecimal(request.get("marks").toString()) : null;
            String comments = (String) request.get("comments");

            StudentGradeDTO updated = facultyService.updateStudentGrade(
                    courseId, studentCourseId, marks, comments, faculty.getEmployeeId());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/courses/{courseId}/grace-marks")
    public ResponseEntity<?> addGraceMarksToAll(
            @PathVariable Long courseId,
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");
            Employee faculty = facultyService.getFacultyByEmail(email);

            if (faculty == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty not found"));
            }

            BigDecimal graceMarks = new BigDecimal(request.get("graceMarks").toString());

            // Convert studentCourseIds from JSON (may be Integer[]) to List<Long>
            List<Long> studentCourseIds = null;
            if (request.containsKey("studentCourseIds") && request.get("studentCourseIds") != null) {
                List<?> rawIds = (List<?>) request.get("studentCourseIds");
                studentCourseIds = rawIds.stream()
                        .map(id -> id instanceof Number ? ((Number) id).longValue() : Long.parseLong(id.toString()))
                        .collect(java.util.stream.Collectors.toList());
            }

            facultyService.addGraceMarksToAll(courseId, graceMarks, faculty.getEmployeeId(), studentCourseIds);
            return ResponseEntity.ok(Map.of("message", "Grace marks added successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/courses/{courseId}/decrease-marks")
    public ResponseEntity<?> decreaseMarksForAll(
            @PathVariable Long courseId,
            @RequestBody Map<String, Object> request,
            @AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");
            Employee faculty = facultyService.getFacultyByEmail(email);

            if (faculty == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Faculty not found"));
            }

            BigDecimal marksToDecrease = new BigDecimal(request.get("marksToDecrease").toString());

            // Convert studentCourseIds from JSON (may be Integer[]) to List<Long>
            List<Long> studentCourseIds = null;
            if (request.containsKey("studentCourseIds") && request.get("studentCourseIds") != null) {
                List<?> rawIds = (List<?>) request.get("studentCourseIds");
                studentCourseIds = rawIds.stream()
                        .map(id -> id instanceof Number ? ((Number) id).longValue() : Long.parseLong(id.toString()))
                        .collect(java.util.stream.Collectors.toList());
            }

            facultyService.decreaseMarksForAll(courseId, marksToDecrease, faculty.getEmployeeId(), studentCourseIds);
            return ResponseEntity.ok(Map.of("message", "Marks decreased successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
