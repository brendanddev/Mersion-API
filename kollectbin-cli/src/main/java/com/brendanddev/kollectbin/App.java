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
    public static final String RED = "\u001B[31m";
    public static final String GREEN = "\u001B[32m";
    public static final String RESET = "\u001B[0m";

    public static String baseUrl = "http://localhost:5000/comics";
    public static HttpClient client;
    public static HttpRequest request;


    public static void main(String[] args) {
        controlMenu();
    }

    public static void printMenu() {
        System.out.println("\n" + YELLOW + "=== Welcome to Kollectbin ===" + RESET);
        Banner.printBanner();
        System.out.println(YELLOW + "1: List all Comics");
        System.out.println("2 Add a Comic");
        System.out.println("3. Delete a Comic");
        System.out.println("4. Quit" + RESET);
        System.out.println("Enter your choice: ");
    }

    // Controls the cli menu
    public static void controlMenu() {
        int choice = 0;

        while (choice != 4) {
            printMenu();
            String input = sc.nextLine().trim();

            try {
                choice = Integer.parseInt(input);
                
                switch (choice) {
                    // GET to list all comics
                    case 1:
                        System.out.println("Listing all Comics...");
                        getComics(baseUrl);
                        waitForInput();
                        break;
                    // POST to add new comic
                    case 2:
                        System.out.println("Adding a new Comic...");
                        Comic comic = InputHandler.buildTestComic(sc);
                        postComic(baseUrl, comic);
                        waitForInput();
                        break;
                    // DELETE a comic
                    case 3:
                        System.out.println("Deleting a Comic...");
                        String id = InputHandler.getStringInput(sc, "Enter the ID of the comic to delete: ");
                        if (id.isEmpty()) {
                            System.out.println(RED + "Uh oh! The provided ID is invalid. Try again!" + RESET);
                        } else {
                            System.out.println(RED + "Are you sure you want to delete this comic? (Yy/Nn): " + RESET);
                            String confirm = sc.nextLine().trim().toLowerCase();
                            if (confirm.equals("y") || confirm.equals("Y")) {
                                deleteComic(baseUrl, id);
                            } else {
                                System.out.println("Deletion cancelled!");
                            }
                        }

                        waitForInput();
                        break;
                    case 4:
                        System.out.println("Have a good day!");
                        break;
                    default:
                        System.out.println(RED + "That option does not exist!" + RESET);
                        waitForInput();
                        break;
                }
            } catch (NumberFormatException e) {
                System.out.println(RED + "Invalid input! Please enter a valid number!" + RESET);
                break;
            }
        }
    }

    // Waits for user input before proceeding to next operation
    public static void waitForInput() {
        System.out.println("\nPress Enter to continue...");
        sc.nextLine();
    }

    // Prints different HTTP responses based on the response object
    public static void printResponseStatus(HttpResponse<String> response, int successCode, String successMsg, String failMsg) {
        if (response.statusCode() == successCode) {
            System.out.println(GREEN + successMsg + RESET);
        } else {
            System.out.println(RED + failMsg + " Status: " + response.statusCode() + RESET);
            System.out.println(response.body());
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
            .exceptionally(ex -> {
                System.out.println(RED + "Uh oh! An error occurred while connecting to the server!" + RESET);
                return null;
            })
            .join();
    }

    // Makes a POST request to the /comics endpoint
    private static void postComic(String url, Comic comic) {
        
        // Create the 
        client = HttpClient.newHttpClient();
        String jsonComic = ObjectToJson.convertObject(comic);

        // Build the POST request
        request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .timeout(Duration.ofMinutes(2))
            .header("Content-Type", "application/json")
            .POST(BodyPublishers.ofString(jsonComic))
            .build();
        
        try {
            HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
            printResponseStatus(response, 201, "Comic added Successfully!", "Failed to add comic.");

        } catch (IOException e) {
            System.out.println(RED + "Uh oh! A network error occurred!" + RESET);
            e.printStackTrace();
        } catch (InterruptedException e) {
            System.out.println(RED + "Uh oh! A thread error occurred!" + RESET);
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println(RED + "Uh oh! An unexpected error occurred!" + RESET);
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
            printResponseStatus(response, 200, "Comic deleted Successfully!", "Uh oh! Comic not found!");

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
