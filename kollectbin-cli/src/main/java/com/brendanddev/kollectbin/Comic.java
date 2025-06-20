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