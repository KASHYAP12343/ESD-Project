package com.esd.facultygrading.repository;

import com.esd.facultygrading.entity.FacultyCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FacultyCourseRepository extends JpaRepository<FacultyCourse, Long> {
    List<FacultyCourse> findByFaculty(Long facultyId);
    
    @Query("SELECT fc FROM FacultyCourse fc WHERE fc.faculty = :facultyId AND fc.course.courseId = :courseId")
    FacultyCourse findByFacultyAndCourse(@Param("facultyId") Long facultyId, @Param("courseId") Long courseId);
}

