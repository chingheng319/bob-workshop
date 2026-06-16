package com.metro.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * 車站實體
 *
 * 代表捷運的一個車站
 */
@Entity
@Table(name = "station")
public class Station {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 10)
    private String code;
    
    @Column(nullable = false, length = 100)
    private String name;
    
    @Column(nullable = false, length = 20)
    private String line;
    
    @Column(length = 200)
    private String address;
    
    @Column(name = "latitude")
    private Double latitude;
    
    @Column(name = "longitude")
    private Double longitude;
    
    @Column(name = "exit_count")
    private Integer exitCount;
    
    @Column(name = "has_elevator")
    private Boolean hasElevator;
    
    @Column(name = "has_escalator")
    private Boolean hasEscalator;
    
    @Column(name = "has_restroom")
    private Boolean hasRestroom;
    
    @Column(name = "first_train_time", length = 10)
    private String firstTrainTime;
    
    @Column(name = "last_train_time", length = 10)
    private String lastTrainTime;
    
    @Column(name = "daily_passengers")
    private Integer dailyPassengers;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public Station() {
    }
    
    public Station(String code, String name, String line) {
        this.code = code;
        this.name = name;
        this.line = line;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getLine() {
        return line;
    }
    
    public void setLine(String line) {
        this.line = line;
    }
    
    public String getAddress() {
        return address;
    }
    
    public void setAddress(String address) {
        this.address = address;
    }
    
    public Double getLatitude() {
        return latitude;
    }
    
    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }
    
    public Double getLongitude() {
        return longitude;
    }
    
    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
    
    public Integer getExitCount() {
        return exitCount;
    }
    
    public void setExitCount(Integer exitCount) {
        this.exitCount = exitCount;
    }
    
    public Boolean getHasElevator() {
        return hasElevator;
    }
    
    public void setHasElevator(Boolean hasElevator) {
        this.hasElevator = hasElevator;
    }
    
    public Boolean getHasEscalator() {
        return hasEscalator;
    }
    
    public void setHasEscalator(Boolean hasEscalator) {
        this.hasEscalator = hasEscalator;
    }
    
    public Boolean getHasRestroom() {
        return hasRestroom;
    }
    
    public void setHasRestroom(Boolean hasRestroom) {
        this.hasRestroom = hasRestroom;
    }
    
    public String getFirstTrainTime() {
        return firstTrainTime;
    }
    
    public void setFirstTrainTime(String firstTrainTime) {
        this.firstTrainTime = firstTrainTime;
    }
    
    public String getLastTrainTime() {
        return lastTrainTime;
    }
    
    public void setLastTrainTime(String lastTrainTime) {
        this.lastTrainTime = lastTrainTime;
    }
    
    public Integer getDailyPassengers() {
        return dailyPassengers;
    }
    
    public void setDailyPassengers(Integer dailyPassengers) {
        this.dailyPassengers = dailyPassengers;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    @Override
    public String toString() {
        return "Station{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", line='" + line + '\'' +
                ", address='" + address + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}

// Made with Bob - Enhanced Model
