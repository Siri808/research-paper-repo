package com.rpm.dbms.project.Repository;

import com.rpm.dbms.project.Entity.Teacher;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepo extends JpaRepository<Teacher, String> {

	Optional<Teacher> findByEmail(String email);
}