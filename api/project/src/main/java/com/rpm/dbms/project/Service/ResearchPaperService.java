package com.rpm.dbms.project.Service;

import com.rpm.dbms.project.Entity.ResearchPaper;
import com.rpm.dbms.project.Repository.ResearchPaperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResearchPaperService {

    @Autowired
    private ResearchPaperRepository researchPaperRepository;

    public List<ResearchPaper> getAllPapers() {
        return researchPaperRepository.findAll();
    }

    public Optional<ResearchPaper> getPaperById(String id) {
        return researchPaperRepository.findById(id);
    }

    public ResearchPaper createPaper(ResearchPaper researchPaper) {
        return researchPaperRepository.save(researchPaper);
    }

    public ResearchPaper updatePaper(String id, ResearchPaper researchPaper) {
        researchPaper.setPaperId(id);
        return researchPaperRepository.save(researchPaper);
    }

    public void deletePaper(String id) {
        researchPaperRepository.deleteById(id);
    }
}
