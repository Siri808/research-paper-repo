package com.rpm.dbms.project.Service;

import com.rpm.dbms.project.Entity.Student;
import com.rpm.dbms.project.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public Student addStudent(Student student) {
        if (student.getId() == null || student.getId().isEmpty()) {
            student.setId(UUID.randomUUID().toString());
        }
        return studentRepository.save(student);
    }

    public Student updateStudent(String id, Student updatedStudent) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student existingStudent = optionalStudent.get();
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setPhone(updatedStudent.getPhone());
            existingStudent.setPasswordHash(updatedStudent.getPasswordHash());
            existingStudent.setPhotoURL(updatedStudent.getPhotoURL());
            existingStudent.setCourse(updatedStudent.getCourse());
            existingStudent.setYearOfStudy(updatedStudent.getYearOfStudy());
            existingStudent.setIsApproved(updatedStudent.getIsApproved());
            // No need to update researchPapers here unless special logic is needed
            return studentRepository.save(existingStudent);
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    public Student getStudentById(String id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    public void deleteStudent(String studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent()) {
            studentRepository.delete(student.get());
        } else {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
    }
    
    public Optional<Student> login(String email, String password) {
        Optional<Student> studentOpt = studentRepository.findByEmail(email);
        if (studentOpt.isPresent()) {
            Student student = studentOpt.get();
            // Directly compare the raw password
            if (password.equals(student.getPasswordHash())) {
                return Optional.of(student);
            }
        }
        return Optional.empty(); // Return empty if login fails
    }
    
    public Optional<Student> findStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
    public Optional<String> findStudentIdByEmail(String email) {
        return studentRepository.findByEmail(email)
                .map(Student::getId);
    }
}
