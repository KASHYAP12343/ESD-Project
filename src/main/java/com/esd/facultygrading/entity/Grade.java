package com.esd.facultygrading.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Entity
@Table(name = "grades")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long gradeId;
    
    @Column(name = "letter_grade", length = 5, nullable = false)
    private String letterGrade;
    
    @Column(name = "grade_points", precision = 2, scale = 1, nullable = false)
    private BigDecimal gradePoints;
}

