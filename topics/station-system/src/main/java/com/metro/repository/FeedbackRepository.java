package com.metro.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.metro.model.Feedback;
import com.metro.model.Station;

/**
 * 回饋資料存取介面
 */
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    
    /**
     * 根據車站查詢回饋
     */
    List<Feedback> findByStation(Station station);
    
    /**
     * 根據車站ID查詢回饋
     */
    List<Feedback> findByStationId(Long stationId);
    
    /**
     * 根據狀態查詢回饋
     */
    List<Feedback> findByStatus(String status);
    
    /**
     * 根據評分查詢回饋
     */
    List<Feedback> findByRating(Integer rating);
    
    /**
     * 根據類別查詢回饋
     */
    List<Feedback> findByCategory(String category);
}

// Made with Bob - Feedback Repository