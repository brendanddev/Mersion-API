package cli;

import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        printHeader();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("> ");
            if (!scanner.hasNextLine()) break;
            String input = scanner.nextLine().trim().toLowerCase();

            switch (input) {
                case "list":
                    break;
                case "add":
                    break;
                case "delete":
                    break;
                case "update":
                    break;
                case "help":
                    break;
                case "exit":
                    return;
                default:
                    System.out.println("Unknown command: " + input);
                    System.out.println("Type 'help' for a list of commands.");
                    break;
            }
        }
    }


     private static void printHeader() {
        System.out.println("Comic CLI");
        System.out.println("=====================");
    }
}
