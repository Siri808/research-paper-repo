 package com.rpm.dbms.project.Repository;

import com.rpm.dbms.project.Entity.ResearchPaper;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResearchPaperRepository extends JpaRepository<ResearchPaper, String> {
	List<ResearchPaper> findByRoleId(String roleId);
}
