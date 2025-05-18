package com.rpm.dbms.project.Controller;

import com.rpm.dbms.project.Entity.ResearchPaper;
import com.rpm.dbms.project.Repository.ResearchPaperRepository;
import com.rpm.dbms.project.Service.ResearchPaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/research-papers")
public class ResearchPaperController {
	@Autowired
    private ResearchPaperRepository researchPaperRepository;
    @Autowired
    private ResearchPaperService researchPaperService;
@GetMapping
public List<ResearchPaper> getAllPapers() {
    return researchPaperService.getAllPapers();
}
@GetMapping("/{id}")
public ResponseEntity<ResearchPaper> getPaperById(@PathVariable String id) {
    return researchPaperService.getPaperById(id)
            .map(paper -> ResponseEntity.ok().body(paper))
            .orElse(ResponseEntity.notFound().build());
}
@PostMapping
public ResponseEntity<ResearchPaper> createPaper(@RequestBody ResearchPaper researchPaper) {
    ResearchPaper createdPaper = researchPaperService.createPaper(researchPaper);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPaper);
}
@PutMapping("/{id}")
public ResponseEntity<ResearchPaper> updatePaper(@PathVariable String id, @RequestBody ResearchPaper researchPaper) {
    ResearchPaper  updatedPaper = researchPaperService.updatePaper(id, researchPaper);
    return ResponseEntity.ok(updatedPaper);
}
@DeleteMapping("/{id}")
public ResponseEntity<Void> deletePaper(@PathVariable String id) {
    researchPaperService.deletePaper(id);
    return ResponseEntity.noContent().build();
}

@GetMapping("/teacher/{roleId}")
public List<ResearchPaper> getPapersByRoleId(@PathVariable String roleId) {
    return researchPaperRepository.findByRoleId(roleId);
}
}