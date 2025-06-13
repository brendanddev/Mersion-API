package cli.api;

import java.net.URI;
import java.net.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


public class Client {

    private static final String BASE_URL = "http://localhost:5000/comics";
    private static final HttpClient client = HttpClient.newHttpClient();

    // Sends a GET request to the backend api
    public void getComics() {
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BASE_URL))
                    .GET()
                    .build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Response: " + response.body());
        } catch (Exception e) {
            System.err.println("Error fetching comics: " + e.getMessage());
        }
    }
    
}
