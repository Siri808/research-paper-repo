package com.rpm.dbms.project.Controller;


import com.rpm.dbms.project.DTO.LoginRequest;
import com.rpm.dbms.project.Entity.Teacher;
import com.rpm.dbms.project.Service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;
    
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();
        if (teacherService.validateLogin(email, password)) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
          
        }
    }

    @PostMapping
    public Teacher addTeacher(@RequestBody Teacher teacher) {
        return teacherService.addTeacher(teacher);
    }

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable String id) {
        return teacherService.getTeacherById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id " + id));
    }
    
    @GetMapping("/email/{email}")
    public Teacher getTeacherByEmail(@PathVariable String email) {
        return teacherService.getTeacherByEmail(email)
                .orElseThrow(() -> new RuntimeException("Teacher not found with email " + email));
    }


    @PutMapping("/{id}")
    public Teacher updateTeacher(@PathVariable String id, @RequestBody Teacher teacher) {
        return teacherService.updateTeacher(id, teacher);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteTeacher(@PathVariable String id) {
        teacherService.deleteTeacherById(id);
        return "Teacher with ID " + id + " deleted successfully.";
    }
    
    @GetMapping("/getidbyemail/{email}")
    public String getTeacherIdByEmail(@PathVariable String email) {
        return teacherService.getTeacherIdByEmail(email)
                .orElseThrow(() -> new RuntimeException("Teacher not found with email " + email));
    }

}