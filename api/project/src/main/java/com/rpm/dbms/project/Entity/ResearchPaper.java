package com.rpm.dbms.project.Entity;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "research_papers")
public class ResearchPaper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String paperId;

    private String role;
    private String roleId;
    private String paperName;
    private String category;


	private String branch;
    private String topic;
    private String paperUrl;
    private String paperDescription;
    private String visibility;
    
    @ManyToOne
    @JoinColumn(name = "student_id") // Assuming you have a foreign key column
    private Student student;
    
    @ManyToOne
    @JoinColumn(name = "teacher_id") // Foreign key column
    private Teacher teacher;


    // Getters and Setters
    public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}
    public String getPaperId() {
        return paperId;
    }

    public void setPaperId(String paperId) {
        this.paperId = paperId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getPaperUrl() {
        return paperUrl;
    }

    public void setPaperUrl(String paperUrl) {
        this.paperUrl = paperUrl;
    }

    public String getPaperDescription() {
        return paperDescription;
    }

    public void setPaperDescription(String paperDescription) {
        this.paperDescription = paperDescription;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }
}
