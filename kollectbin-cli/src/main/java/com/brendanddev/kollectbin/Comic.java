package com.brendanddev.kollectbin;

// App.java
// Defines the comic object that will be stored in the users collection
// Brendan Dileo, June 2025

import java.util.Objects;

public class Comic {

    private String id;
    private String title;
    private String author;
    private int issue;
    private int volume;
    private String publisher;
    private String coverVariant;
    private String releaseDate;
    private int rating;
    private double purchasePrice;
    private double currentValue;
    private String condition;
    private boolean isRead;
    private String genre;
    private String[] tags;
    private String notes;

    public Comic() {}

    // Construct a test comic
    public Comic(String id, String title, String author, int issue, int volume) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.issue = issue;
        this.volume = volume;
    }

    // Construct a comic object
    public Comic(String id, String title, String author, int issue, int volume, String publisher,
                 String coverVariant, String releaseDate, int rating, double purchasePrice,
                 double currentValue, String condition, boolean isRead, String genre,
                 String[] tags, String notes) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.issue = issue;
        this.volume = volume;
        this.publisher = publisher;
        this.coverVariant = coverVariant;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.purchasePrice = purchasePrice;
        this.currentValue = currentValue;
        this.condition = condition;
        this.isRead = isRead;
        this.genre = genre;
        this.tags = tags;
        this.notes = notes;
    }

    // Getters and setters for each field
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public int getIssue() { return issue; }
    public void setIssue(int issue) { this.issue = issue; }
    public int getVolume() { return volume; }
    public void setVolume(int volume) { this.volume = volume; }
    public String getPublisher() { return publisher; }
    public void setPublisher(String publisher) { this.publisher = publisher; }
    public String getCoverVariant() { return coverVariant; }
    public void setCoverVariant(String coverVariant) { this.coverVariant = coverVariant; }
    public String getReleaseDate() { return releaseDate; }
    public void setReleaseDate(String releaseDate) { this.releaseDate = releaseDate; }
    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }
    public double getPurchasePrice() { return purchasePrice; }
    public void setPurchasePrice(double purchasePrice) { this.purchasePrice = purchasePrice; }
    public double getCurrentValue() { return currentValue; }
    public void setCurrentValue(double currentValue) { this.currentValue = currentValue; }
    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    public String getGenre() { return genre; }
    public void setGenre(String genre) { this.genre = genre; }
    public String[] getTags() { return tags; }
    public void setTags(String[] tags) { this.tags = tags; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    // Defines how two comic objects are considered equal
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Comic)) return false;
        Comic comic = (Comic) o;
        return Objects.equals(id, comic.id);
    }

    // Hash code based on the comics id
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return String.format("%s, #%d (Vol %d) by %s", title, issue, volume, author);
    }
    
}