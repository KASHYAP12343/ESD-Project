package com.esd.facultygrading.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentGradeDTO {
    private Long studentCourseId;
    private Long studentId;
    private String rollNumber;
    private String firstName;
    private String lastName;
    private String email;
    private BigDecimal marks;
    private String comments;
    private Long gradeId;
    private String letterGrade;
}

