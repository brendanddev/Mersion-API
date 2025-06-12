package cli.models;

public class Comic {
    public String id;
    public String title;
    public String author;
    public int issue;
    public int volume;
    public String publisher;
    public String coverVariant;
    public String releaseDate;
    public int rating;
    public double purchasePrice;
    public double currentValue;
    public String condition;
    public boolean isRead;
    public String genre;
    public String[] tags;
    public String notes;

    @Override
    public String toString() {
        return String.format("%s, #%d (Vol %d) by %s", title, issue, volume, author);
    }
    
}