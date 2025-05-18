package com.rpm.dbms.project.Repository;

import com.rpm.dbms.project.Entity.TeacherAchievement;
import com.rpm.dbms.project.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherAchievementRepository extends JpaRepository<TeacherAchievement, String> {
    List<TeacherAchievement> findByTeacher(Teacher teacher);
}
