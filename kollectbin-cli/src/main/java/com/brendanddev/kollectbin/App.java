package com.brendanddev.kollectbin;

import java.util.Scanner;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;

public class App {

    public static Scanner sc = new Scanner(System.in);
    public static final String YELLOW = "\u001B[33m";

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

    private static void postComic(String url, Comic comic) {
        client = HttpClient.newHttpClient;


    }


}
