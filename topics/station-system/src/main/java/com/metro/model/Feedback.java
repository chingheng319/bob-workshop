package com.metro.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * 乘客回饋實體
 *
 * 記錄乘客對車站服務的回饋意見
 */
@Entity
@Table(name = "feedback")
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "station_id", nullable = false)
    private Station station;
    
    @Column(nullable = false, length = 100)
    private String passengerName;
    
    @Column(nullable = false, length = 100)
    private String email;
    
    @Column(nullable = false)
    private Integer rating; // 1-5 星評分
    
    @Column(nullable = false, length = 50)
    private String category; // 類別：服務品質、設施狀況、清潔度、安全性、其他
    
    @Column(nullable = false, length = 1000)
    private String content;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(length = 20)
    private String status; // 狀態：待處理、處理中、已完成
    
    @Column(length = 500)
    private String response; // 管理員回覆
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = "待處理";
        }
    }
    
    // Constructors
    public Feedback() {
    }
    
    public Feedback(Station station, String passengerName, String email, Integer rating, 
                   String category, String content) {
        this.station = station;
        this.passengerName = passengerName;
        this.email = email;
        this.rating = rating;
        this.category = category;
        this.content = content;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Station getStation() {
        return station;
    }
    
    public void setStation(Station station) {
        this.station = station;
    }
    
    public String getPassengerName() {
        return passengerName;
    }
    
    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public Integer getRating() {
        return rating;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getResponse() {
        return response;
    }
    
    public void setResponse(String response) {
        this.response = response;
    }
    
    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", stationId=" + (station != null ? station.getId() : null) +
                ", passengerName='" + passengerName + '\'' +
                ", rating=" + rating +
                ", category='" + category + '\'' +
                ", status='" + status + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}

// Made with Bob - Feedback Model