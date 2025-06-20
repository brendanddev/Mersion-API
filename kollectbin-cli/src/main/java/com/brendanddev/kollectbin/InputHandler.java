package com.brendanddev.kollectbin;

import java.util.InputMismatchException;
import java.util.Scanner;

// InputHandler.java
// Reads and validates user input
// Brendan Dileo, June 2025

public class InputHandler {

    // Read and validate int input from user
    public static int getIntInput(Scanner sc, String prompt) {
        while (true) {
            try {
                System.out.println(prompt);
                int value = sc.nextInt();
                sc.nextLine();
                return value;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input! Please enter a valid integer!");
                sc.nextLine();
            }
        }
    }

    // Read and validate double input from user
    public static double getDoubleInput(Scanner sc, String prompt) {
        while (true) {
            try {
                System.out.println(prompt);
                double value = sc.nextDouble();
                sc.nextLine();
                return value;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input! Please enter a valid decimal number!");
                sc.nextLine();
            }
        }
    }

    // Read and validate boolean input from user
    public static boolean getBooleanInput(Scanner sc, String prompt) {
        while (true) {
            System.out.println(prompt + "(true/false)");
            String input = sc.nextLine().trim().toLowerCase();
            if (input.equals("true")) return true;
            if (input.equals("false")) return false;
            System.out.println("Invalid input! Please enter true or false!");
        }
    }

    // Read and validate string input from user
    public static String getStringInput(Scanner sc, String prompt) {
        System.out.println(prompt);
        return sc.nextLine();
    }

    // Builds a comic with only the required fields
    public static Comic buildTestComic(Scanner sc) {
        String title = getStringInput(sc, "Enter the comic title: ");
        String author = getStringInput(sc, "Enter the comic author: ");
        int issue = getIntInput(sc, "Enter the issue number: ");
        int volume = getIntInput(sc, "Enter the volume number:");
        return new Comic(
            null, title, author, issue, volume,
            "Test Publisher", 
            "Test Cover", 
            "2025-06-20T00:00:00.000Z",
            5, 
            0.0, 
            0.0,
            "Good",
            false,
            "Test Genre",
            new String[] { "Test", "Sample" },
            "Test"
        );
    }

    // Builds the comic based on user input for the POST request
    public static Comic buildComic(Scanner sc) {
        String title = getStringInput(sc, "Enter the comic title: ");
        String author = getStringInput(sc, "Enter the comic author: ");
        int issue = getIntInput(sc, "Enter the issue number: ");
        int volume = getIntInput(sc, "Enter the volume number:");
        String publisher = getStringInput(sc, "Enter the publisher:");
        String coverVariant = getStringInput(sc, "Enter the cover variant:");
        String releaseDate = getStringInput(sc, "Enter the release date:");
        int rating = getIntInput(sc, "Enter the rating:");
        double purchasePrice = getDoubleInput(sc, "Enter the purchase price:");
        double currentValue = getDoubleInput(sc, "Enter the current value:");
        String condition = getStringInput(sc, "Enter the condition:");
        boolean isRead = getBooleanInput(sc, "Is the comic read?");
        String genre = getStringInput(sc, "Enter the genre:");
        String tagsInput = getStringInput(sc, "Enter tags (comma separated):");
        String[] tags = tagsInput.split(",");
        String notes = getStringInput(sc, "Enter any notes:");

        return new Comic(null, title, author, issue, volume, publisher,
            coverVariant, releaseDate, rating, purchasePrice, currentValue,
            condition, isRead, genre, tags, notes);
    }
    
}
