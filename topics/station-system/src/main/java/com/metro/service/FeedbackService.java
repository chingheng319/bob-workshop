package com.metro.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.metro.model.Feedback;
import com.metro.model.Station;
import com.metro.repository.FeedbackRepository;
import com.metro.repository.StationRepository;

/**
 * 回饋服務
 */
@Service
@Transactional
public class FeedbackService {
    
    private final FeedbackRepository feedbackRepository;
    private final StationRepository stationRepository;
    
    public FeedbackService(FeedbackRepository feedbackRepository, StationRepository stationRepository) {
        this.feedbackRepository = feedbackRepository;
        this.stationRepository = stationRepository;
    }
    
    /**
     * 取得所有回饋
     */
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }
    
    /**
     * 根據ID取得回饋
     */
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("找不到回饋資料，ID: " + id));
    }
    
    /**
     * 根據車站ID取得回饋
     */
    public List<Feedback> getFeedbacksByStationId(Long stationId) {
        return feedbackRepository.findByStationId(stationId);
    }
    
    /**
     * 根據狀態取得回饋
     */
    public List<Feedback> getFeedbacksByStatus(String status) {
        return feedbackRepository.findByStatus(status);
    }
    
    /**
     * 建立新回饋
     */
    public Feedback createFeedback(Feedback feedback) {
        // 驗證評分範圍
        if (feedback.getRating() < 1 || feedback.getRating() > 5) {
            throw new RuntimeException("評分必須在 1-5 之間");
        }
        
        // 驗證車站是否存在
        if (feedback.getStation() != null && feedback.getStation().getId() != null) {
            Station station = stationRepository.findById(feedback.getStation().getId())
                    .orElseThrow(() -> new RuntimeException("找不到車站"));
            feedback.setStation(station);
        }
        
        return feedbackRepository.save(feedback);
    }
    
    /**
     * 更新回饋狀態和回覆
     */
    public Feedback updateFeedback(Long id, String status, String response) {
        Feedback feedback = getFeedbackById(id);
        
        if (status != null) {
            feedback.setStatus(status);
        }
        
        if (response != null) {
            feedback.setResponse(response);
        }
        
        return feedbackRepository.save(feedback);
    }
    
    /**
     * 刪除回饋
     */
    public void deleteFeedback(Long id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("找不到回饋資料，ID: " + id);
        }
        feedbackRepository.deleteById(id);
    }
    
    /**
     * 取得車站的平均評分
     */
    public Double getAverageRatingByStation(Long stationId) {
        List<Feedback> feedbacks = feedbackRepository.findByStationId(stationId);
        if (feedbacks.isEmpty()) {
            return 0.0;
        }
        return feedbacks.stream()
                .mapToInt(Feedback::getRating)
                .average()
                .orElse(0.0);
    }
}

// Made with Bob - Feedback Service