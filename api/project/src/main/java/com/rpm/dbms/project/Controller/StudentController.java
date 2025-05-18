package com.rpm.dbms.project.Controller;

import com.rpm.dbms.project.DTO.StudentLogin;
import com.rpm.dbms.project.Entity.Student;
import com.rpm.dbms.project.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @PutMapping("/update/{id}")
    public Student updateStudent(@PathVariable String id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable String id) {
        return studentService.getStudentById(id);
    }

    @GetMapping("/viewAll")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        try {
            studentService.deleteStudent(id);
            return ResponseEntity.ok("Student deleted successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public String login(@RequestBody StudentLogin loginRequest) {
        Optional<Student> studentOpt = studentService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (studentOpt.isPresent()) {
           
            return "Login successful for student: " + studentOpt.get().getName();
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
    
    @GetMapping("/email/{email}")
    public Student getStudentByEmail(@PathVariable String email) {
        return studentService.findStudentByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email " + email));
    }
    @GetMapping("/getidbyemail/{email}")
    public String getStudentIdByEmail(@PathVariable String email) {
        return studentService.findStudentIdByEmail(email)
                .orElseThrow(() -> new RuntimeException("Student not found with email " + email));
    }
}
