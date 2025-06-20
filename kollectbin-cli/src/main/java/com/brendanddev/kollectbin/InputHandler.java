package com.brendanddev.kollectbin;

import java.util.InputMismatchException;
import java.util.Scanner;

public class InputHandler {

    
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



    // Builds the comic based on user input for the POST request
    public static Comic buildComic(Scanner sc) {
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
