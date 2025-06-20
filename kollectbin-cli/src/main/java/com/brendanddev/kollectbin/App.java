package com.brendanddev.kollectbin;

// App.java
// Brendan Dileo, June 2025

import java.util.Scanner;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.file.Paths;
import java.time.Duration;

public class App {

    public static Scanner sc = new Scanner(System.in);
    public static final String YELLOW = "\u001B[33m";

    public static String baseUrl = "http://localhost:5000/";
    public static HttpClient client;
    public static HttpRequest request;



    public static void main(String[] args) {

        controlMenu();


        /**
         * **BASIC** Thought process:
         * 
         * User is prompted with menu (Display icons, or text, colored)
         * Can choose to get all, add a new, or delete (need to add on to this)
         * If they want to get, send GET request to /comics
         * If they want to add, send POST request to /comics
         * If they want to delete, send DELETE request to /comics
         * 
         * Loop until user chooses to quit
         * 
         * 
         */

    }

    public static void printMenu() {
        System.out.println(YELLOW + "Welcome to Kollectbin!");
        // PRINT BANNER HERE
        System.out.println("1: List all Comics");
        System.out.println("2 Add a Comic");
        System.out.println("3. Delete a Comic");
        System.out.println("4. Quit");
        System.out.println("Enter your choice: ");
    }

    public static void controlMenu() {
        printMenu();
        int choice = 0;

        while (choice != 4) {
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("Listing all Comics...");
                    break;
                case 2:
                    System.out.println("Adding a new Comic...");
                    break;
                case 3:
                    System.out.println("Deleting a Comic...");
                    break;
                case 4:
                    System.out.println("Have a good day!");
                    break;
                default:
                    break;
            }
        }
    }

    // Makes a GET request to the /comics endpoint
    private static void getComics(String url) {
        client = HttpClient.newHttpClient;
        request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .build();
        
        client.sendAsync(request, BodyHandlers.ofString())
            .thenApply(HttpResponse::body) 
            .thenAccept(System.out.println)
            .join();
    }

    // Makes a POST request to the /comics endpoint
    private static void postComic(String url, Comic comic) {
        client = HttpClient.newHttpClient();

        // Build the POSt request
        request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(Duration.ofMinutes(2))
            .header("Content-Type", "application/json")
            .POST(BodyPublishers.ofFile(Paths.get("file.json")))
            .build();
    }

     // Builds the comic based on user input for the POST request
    private static Comic buildComic() {
        System.out.println("Enter the comic title: ");
        String title = sc.nextLine();

        System.out.println("Enter the comic author: ");
        String author = sc.nextLine();

        System.out.println("Enter the issue number: ");
        int issue = sc.nextInt();

        System.out.println("Enter the volume number: ");
        int volume = sc.nextInt();

        System.out.println("Enter the publisher: ");
        String publisher = sc.nextLine();

        System.out.println("Enter the cover variant: ");
        String coverVariant = sc.nextLine();

        System.out.println("Enter the release date: ");
        String releaseDate = sc.nextLine();

        System.out.println("Enter the rating: ");
        int rating = sc.nextInt();

        System.out.println("Enter the purchase price: ");
        double purchasePrice = sc.nextDouble();

        System.out.println("Enter the current value: ");
        double currentValue = sc.nextDouble();

        System.out.println("Enter the condition: ");
        String condition = sc.nextLine();

        System.out.println("Is the comic read? (true/false): ");
        boolean isRead = sc.nextBoolean();

        System.out.println("Enter the genre: ");
        String genre = sc.nextLine();

        System.out.println("Enter tags (comma separated): ");
        String tagsInput = sc.nextLine();
        String[] tags = tagsInput.split(",");

        System.out.println("Enter any notes: ");
        String notes = sc.nextLine();

        return new Comic(null, title, author, issue, volume, publisher,
            coverVariant, releaseDate, rating, purchasePrice, currentValue,
            condition, isRead, genre, tags, notes);
    }


}
