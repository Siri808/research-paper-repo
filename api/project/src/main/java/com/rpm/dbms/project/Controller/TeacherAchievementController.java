package com.rpm.dbms.project.Controller;

import com.rpm.dbms.project.Entity.TeacherAchievement;
import com.rpm.dbms.project.Service.TeacherAchievementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher-achievements")
public class TeacherAchievementController {

    private final TeacherAchievementService achievementService;

    @Autowired
    public TeacherAchievementController(TeacherAchievementService achievementService) {
        this.achievementService = achievementService;
    }

    @PostMapping("/add")
    public TeacherAchievement addAchievement(@RequestBody TeacherAchievement achievement) {
        return achievementService.addAchievement(achievement);
    }

    @PutMapping("/update/{id}")
    public TeacherAchievement updateAchievement(@PathVariable String id, @RequestBody TeacherAchievement achievement) {
        return achievementService.updateAchievement(id, achievement);
    }

    @GetMapping("/view/{id}")
    public TeacherAchievement getAchievement(@PathVariable String id) {
        return achievementService.getAchievementById(id);
    }

//    @GetMapping("/viewByTeacher/{teacherId}")
//    public List<TeacherAchievement> getAchievementsByTeacher(@PathVariable String teacherId) {
//        return achievementService.getAchievementsByTeacher(teacherId);
//    }

    @GetMapping("/viewAll")
    public List<TeacherAchievement> getAllAchievements() {
        return achievementService.getAllAchievements();
    }
    
    
}
