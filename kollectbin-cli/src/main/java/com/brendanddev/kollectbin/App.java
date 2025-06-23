package com.brendanddev.kollectbin;

// App.java
// Brendan Dileo, June 2025

import java.util.Scanner;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.time.Duration;


public class App {

    public static Scanner sc = new Scanner(System.in);
    public static final String YELLOW = "\u001B[33m";

    public static String baseUrl = "http://localhost:5000/comics";
    public static HttpClient client;
    public static HttpRequest request;


    public static void main(String[] args) {
        controlMenu();
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
            sc.nextLine();

            switch (choice) {
                // GET to list all comics
                case 1:
                    System.out.println("Listing all Comics...");
                    getComics(baseUrl);
                    break;
                // POST to add new comic
                case 2:
                    System.out.println("Adding a new Comic...");
                    Comic comic = InputHandler.buildTestComic(sc);
                    postComic(baseUrl, comic);
                    break;
                // DELETE a comic
                case 3:
                    System.out.println("Deleting a Comic...");
                    String id = InputHandler.getStringInput(sc, "Enter the ID of the comic to delete: ");
                    deleteComic(baseUrl, id);
                    break;
                case 4:
                    System.out.println("Have a good day!");
                    break;
                default:
                    System.out.println("Sorry, that was not an option!");
                    break;
            }
        }
    }

    // Makes a GET request to the /comics endpoint
    private static void getComics(String url) {

        // Creates the client and http request
        client = HttpClient.newHttpClient();
        request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .build();
        
        // Sends the http GET asynchronously
        client.sendAsync(request, BodyHandlers.ofString())
            .thenApply(HttpResponse::body) 
            .thenAccept(body -> System.out.println(ObjectToJson.extractGetFields(body)))
            .join();
    }

    // Makes a POST request to the /comics endpoint
    private static void postComic(String url, Comic comic) {
        
        // Create the 
        client = HttpClient.newHttpClient();
        String jsonComic = ObjectToJson.convertObject(comic);

        // Build the POSt request
        request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(Duration.ofMinutes(2))
            .header("Content-Type", "application/json")
            .POST(BodyPublishers.ofString(jsonComic))
            .build();
        try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            System.out.println(response.statusCode());
            System.out.println(ObjectToJson.extractPostFields(response.body()));
        } catch (IOException e) {
            System.out.println("A network error occurred!");
            e.printStackTrace();
        } catch (InterruptedException e) {
            System.out.println("A thread error occurred!");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("An unexpected error occurred!");
            e.printStackTrace();
        }
    }

    // Makes a DELETE request to delete a comic by id
    private static void deleteComic(String url, String id) {
        client = HttpClient.newHttpClient();
        
        // Build the DELETE request
        request = HttpRequest.newBuilder()
            .uri(URI.create(url + "/" + id))
            .timeout(Duration.ofMinutes(1))
            .header("Content-Type", "application/json")
            .DELETE()
            .build();
        
        try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            System.out.println(response.statusCode());
            System.out.println(response.body());
        } catch (IOException e) {
            System.out.println("A network error occurred!");
            e.printStackTrace();
        } catch (InterruptedException e) {
            System.out.println("A thread error occurred!");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("An unexpected error occurred!");
            e.printStackTrace();
        }
    }



}
