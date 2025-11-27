package com.esd.facultygrading.repository;

import com.esd.facultygrading.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT c FROM Course c JOIN FacultyCourse fc ON c.courseId = fc.course.courseId WHERE fc.faculty = :facultyId")
    List<Course> findCoursesByFacultyId(@Param("facultyId") Long facultyId);
    
    Optional<Course> findByCourseCode(String courseCode);
}

