package com.esd.facultygrading.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long courseId;
    
    @Column(name = "course_code", length = 50, unique = true, nullable = false)
    private String courseCode;
    
    @Column(name = "name", length = 150)
    private String name;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "credits")
    private Integer credits;
    
    @Column(name = "year")
    private Integer year;
    
    @Column(name = "term")
    private Integer term;
}

