package com.esd.facultygrading.repository;

import com.esd.facultygrading.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query("SELECT s FROM Student s JOIN StudentCourse sc ON s.studentId = sc.studentId WHERE sc.course.courseId = :courseId")
    List<Student> findStudentsByCourseId(@Param("courseId") Long courseId);
    
    Optional<Student> findByRollNumber(String rollNumber);
}

