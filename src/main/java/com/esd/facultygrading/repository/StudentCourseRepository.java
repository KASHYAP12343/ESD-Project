package com.esd.facultygrading.repository;

import com.esd.facultygrading.entity.StudentCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface StudentCourseRepository extends JpaRepository<StudentCourse, Long> {
    List<StudentCourse> findByCourse_CourseId(Long courseId);
    
    StudentCourse findByStudentIdAndCourse_CourseId(Long studentId, Long courseId);
    
    @Modifying
    @Transactional
    @Query("UPDATE StudentCourse sc SET sc.marks = sc.marks + :marks WHERE sc.course.courseId = :courseId")
    void addGraceMarksToAll(@Param("courseId") Long courseId, @Param("marks") BigDecimal marks);
    
    @Modifying
    @Transactional
    @Query("UPDATE StudentCourse sc SET sc.marks = sc.marks - :marks WHERE sc.course.courseId = :courseId")
    void decreaseMarksForAll(@Param("courseId") Long courseId, @Param("marks") BigDecimal marks);
}

