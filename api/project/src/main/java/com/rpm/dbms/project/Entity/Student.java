package com.rpm.dbms.project.Entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "student")
public class Student {
	
	

    @Id
    private String id = UUID.randomUUID().toString();

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;

    private String passwordHash;

    private String photoURL;

    private String course;

    private String yearOfStudy;

    private Boolean isApproved = false;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    @OneToMany(mappedBy = "student")
    private List<ResearchPaper> researchPapers;
    
   

    // Constructors

    public Student() {
    }

    public Student(String id, String name, String email, String phone, String passwordHash,
                   String photoURL, String course, String yearOfStudy, Boolean isApproved,
                   List<ResearchPaper> researchPapers) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.passwordHash = passwordHash;
        this.photoURL = photoURL;
        this.course = course;
        this.yearOfStudy = yearOfStudy;
        this.isApproved = isApproved;
        this.researchPapers = researchPapers;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(String yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public Boolean getIsApproved() {
        return isApproved;
    }

    public void setIsApproved(Boolean isApproved) {
        this.isApproved = isApproved;
    }

    public List<ResearchPaper> getResearchPapers() {
        return researchPapers;
    }

    public void setResearchPapers(List<ResearchPaper> researchPapers) {
        this.researchPapers = researchPapers;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }
}
