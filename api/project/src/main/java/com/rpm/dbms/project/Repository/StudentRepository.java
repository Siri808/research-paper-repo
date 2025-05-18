package com.rpm.dbms.project.Repository;

import com.rpm.dbms.project.Entity.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {

	Optional<Student> findByEmail(String email);
}
