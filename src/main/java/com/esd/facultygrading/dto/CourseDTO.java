package com.esd.facultygrading.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private Long courseId;
    private String courseCode;
    private String name;
    private String description;
    private Integer credits;
    private Integer year;
    private Integer term;
}

