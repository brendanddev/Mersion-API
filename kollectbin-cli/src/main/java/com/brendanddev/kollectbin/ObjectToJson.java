package com.brendanddev.kollectbin;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;

// ObjectToJson.java
// Brendan Dileo, June 2025

public class ObjectToJson {

    // Converts a object to json
    public static String convertObject(Comic comic) {
        ObjectMapper objMapper = new ObjectMapper();
        try {
            return objMapper.writeValueAsString(comic);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // Pretty prints a json string
    public static String prettyPrint(String comicJson) {
        ObjectMapper objMapper = new ObjectMapper();
        
        try {
            Object jsonObject = objMapper.readValue(comicJson, Object.class);
            String prettyJson = 
                objMapper.writerWithDefaultPrettyPrinter()
                .writeValueAsString(jsonObject);
        
            return prettyJson;

        } catch (IOException e) {
            System.out.println("");
            e.printStackTrace();
        } catch (Exception e) {
            System.out.println("");
            e.printStackTrace();
        }
        return null;
    }

    // Extracts fields from the backend json response and formats them into a string
    public static String extractData(String comicJson) {
        
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            JsonNode rootNode = objectMapper.readTree(comicJson);
            String message = rootNode.get("message").asText();
            JsonNode comicNode = rootNode.get("comic");

            String output = message + "\n" +
                "Title: " + "\n" +
                "Author: " + "\n" + 
                "Issue: " + "\n" + 
                "Volume: " + "\n";
            
            return output;
        } catch (JsonProcessingException e) {
            System.out.println("");
            e.printStackTrace();
        }
        return null;
    }
    
}