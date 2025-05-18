package com.rpm.dbms.project.Service;

import com.rpm.dbms.project.Entity.Teacher;
import com.rpm.dbms.project.Entity.TeacherAchievement;
import com.rpm.dbms.project.Repository.TeacherAchievementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TeacherAchievementService {

    private final TeacherAchievementRepository achievementRepository;

    @Autowired
    public TeacherAchievementService(TeacherAchievementRepository achievementRepository) {
        this.achievementRepository = achievementRepository;
    }

    public TeacherAchievement addAchievement(TeacherAchievement achievement) {
        if (achievement.getId() == null || achievement.getId().isEmpty()) {
            achievement.setId(UUID.randomUUID().toString());
        }
        achievement.setCreatedAt(Instant.now());
        achievement.setUpdatedAt(Instant.now());
        return achievementRepository.save(achievement);
    }

    public TeacherAchievement updateAchievement(String id, TeacherAchievement updatedAchievement) {
        Optional<TeacherAchievement> optionalAchievement = achievementRepository.findById(id);
        if (optionalAchievement.isPresent()) {
            TeacherAchievement existingAchievement = optionalAchievement.get();
            existingAchievement.setTitle(updatedAchievement.getTitle());
            existingAchievement.setDescription(updatedAchievement.getDescription());
            existingAchievement.setCertificateURL(updatedAchievement.getCertificateURL());
            existingAchievement.setAchievementDate(updatedAchievement.getAchievementDate());
            existingAchievement.setUpdatedAt(Instant.now());
            return achievementRepository.save(existingAchievement);
        } else {
            throw new RuntimeException("Achievement not found with id: " + id);
        }
    }

    public TeacherAchievement getAchievementById(String id) {
        return achievementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Achievement not found with id: " + id));
    }

//    public List<TeacherAchievement> getAchievementsByTeacher(Teacher teacher) {
//        return achievementRepository.findByTeacher(teacher);
//    }


    public List<TeacherAchievement> getAllAchievements() {
        return achievementRepository.findAll();
    }
}
