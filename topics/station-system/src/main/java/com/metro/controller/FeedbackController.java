package com.metro.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.metro.model.Feedback;
import com.metro.service.FeedbackService;

/**
 * 回饋 REST API 控制器
 * 
 * 提供乘客回饋管理的 RESTful API
 */
@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin(origins = "*")
public class FeedbackController {
    
    private final FeedbackService feedbackService;
    
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }
    
    /**
     * 取得所有回饋
     */
    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }
    
    /**
     * 根據ID取得回饋
     */
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
        try {
            Feedback feedback = feedbackService.getFeedbackById(id);
            return ResponseEntity.ok(feedback);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * 根據車站ID取得回饋
     */
    @GetMapping("/station/{stationId}")
    public ResponseEntity<List<Feedback>> getFeedbacksByStation(@PathVariable Long stationId) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByStationId(stationId);
        return ResponseEntity.ok(feedbacks);
    }
    
    /**
     * 根據狀態取得回饋
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Feedback>> getFeedbacksByStatus(@PathVariable String status) {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByStatus(status);
        return ResponseEntity.ok(feedbacks);
    }
    
    /**
     * 取得車站平均評分
     */
    @GetMapping("/station/{stationId}/average-rating")
    public ResponseEntity<Map<String, Double>> getAverageRating(@PathVariable Long stationId) {
        Double avgRating = feedbackService.getAverageRatingByStation(stationId);
        return ResponseEntity.ok(Map.of("averageRating", avgRating));
    }
    
    /**
     * 建立新回饋
     */
    @PostMapping
    public ResponseEntity<?> createFeedback(@RequestBody Feedback feedback) {
        try {
            Feedback createdFeedback = feedbackService.createFeedback(feedback);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdFeedback);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    /**
     * 更新回饋（管理員回覆）
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateFeedback(
            @PathVariable Long id,
            @RequestBody Map<String, String> updates) {
        try {
            String status = updates.get("status");
            String response = updates.get("response");
            Feedback updatedFeedback = feedbackService.updateFeedback(id, status, response);
            return ResponseEntity.ok(updatedFeedback);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    /**
     * 刪除回饋
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFeedback(@PathVariable Long id) {
        try {
            feedbackService.deleteFeedback(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

// Made with Bob - Feedback Controller