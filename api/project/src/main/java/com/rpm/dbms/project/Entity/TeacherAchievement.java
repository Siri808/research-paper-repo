package com.rpm.dbms.project.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherAchievement {

    @Id
    private String id = UUID.randomUUID().toString();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id", nullable = false)
    private Teacher teacher; // mapped to Teacher Entity

    @Column(nullable = false)
    private String title; // Achievement title

    public TeacherAchievement() {
		super();
	}

	public TeacherAchievement(String id, Teacher teacher, String title, String description, String certificateURL,
			Instant achievementDate, Instant createdAt, Instant updatedAt) {
		super();
		this.id = id;
		this.teacher = teacher;
		this.title = title;
		this.description = description;
		this.certificateURL = certificateURL;
		this.achievementDate = achievementDate;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Teacher getTeacher() {
		return teacher;
	}

	public void setTeacher(Teacher teacher) {
		this.teacher = teacher;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCertificateURL() {
		return certificateURL;
	}

	public void setCertificateURL(String certificateURL) {
		this.certificateURL = certificateURL;
	}

	public Instant getAchievementDate() {
		return achievementDate;
	}

	public void setAchievementDate(Instant achievementDate) {
		this.achievementDate = achievementDate;
	}

	public Instant getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Instant createdAt) {
		this.createdAt = createdAt;
	}

	public Instant getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Instant updatedAt) {
		this.updatedAt = updatedAt;
	}

	private String description; // Brief about achievement

    private String certificateURL; // Link to certificate (optional)

    private Instant achievementDate; // When achievement was earned

    private Instant createdAt = Instant.now();

    private Instant updatedAt = Instant.now();
}
