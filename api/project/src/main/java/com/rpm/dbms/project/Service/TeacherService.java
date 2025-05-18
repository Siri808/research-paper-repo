package com.rpm.dbms.project.Service;

import com.rpm.dbms.project.Entity.Teacher;
import com.rpm.dbms.project.Repository.TeacherRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepo teacherRepository;
    
    public Optional<Teacher> findByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }

    public Teacher addTeacher(Teacher teacher) {
        if (teacher.getId() == null || teacher.getId().isEmpty()) {
            teacher.setId(java.util.UUID.randomUUID().toString());
        }
        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(String id) {
        return teacherRepository.findById(id);
    }

    public Teacher updateTeacher(String id, Teacher updatedTeacher) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Teacher not found with id " + id));

        teacher.setName(updatedTeacher.getName());
        teacher.setEmail(updatedTeacher.getEmail());
        teacher.setPhone(updatedTeacher.getPhone());
        teacher.setPasswordHash(updatedTeacher.getPasswordHash());
        teacher.setPhotoURL(updatedTeacher.getPhotoURL());
        teacher.setQualification(updatedTeacher.getQualification());
        teacher.setExpertise(updatedTeacher.getExpertise());
        teacher.setIsApproved(updatedTeacher.getIsApproved());

        return teacherRepository.save(teacher);
    }
    
    public void deleteTeacherById(String id) {
        Optional<Teacher> teacherOptional = teacherRepository.findById(id);
        if (teacherOptional.isPresent()) {
            teacherRepository.deleteById(id);
        } else {
            throw new RuntimeException("Teacher not found with ID: " + id);
        }
    }
    
    public boolean validateLogin(String email, String password) {
        Optional<Teacher> teacherOpt = findByEmail(email);
        if (teacherOpt.isPresent()) {
            Teacher teacher = teacherOpt.get();
            // Compare the raw password directly
            return password.equals(teacher.getPasswordHash());
        }
        return false;
    }
    
    

    public Optional<Teacher> getTeacherByEmail(String email) {
        return teacherRepository.findByEmail(email);
    }
    
    public Optional<String> getTeacherIdByEmail(String email) {
        return teacherRepository.findByEmail(email).map(Teacher::getId); 
    }
  
}