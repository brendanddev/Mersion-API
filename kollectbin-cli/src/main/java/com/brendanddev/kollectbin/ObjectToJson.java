package com.brendanddev.kollectbin;

import java.io.IOException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
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

    // Extracts fields from the backend json GET response and formats them into a string
    public static String extractGetFields(String json) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            // GET returns 'comics: [] '
            JsonNode rootNode = objectMapper.readTree(json);
            JsonNode comicsNode = rootNode.get("comics");

            if (comicsNode == null || !comicsNode.isArray())
                return "No comics found in response.";
            
            StringBuilder output = new StringBuilder("Comics: \n");

            for (JsonNode comicNode : comicsNode) {
                output.append("Title: ").append(comicNode.get("title").asText()).append("\n")
                    .append("Author: ").append(comicNode.get("author").asText()).append("\n")
                    .append("Issue: ").append(comicNode.get("issue").asInt(-1)).append("\n")
                    .append("Volume: ").append(comicNode.get("volume").asInt(-1)).append("\n");
            }

            return output.toString();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Failed to parse GET response.";
        }
    }

    // Extracts fields from the backend json POST response and formats them into a string
    public static String extractPostFields(String json) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // return res.status(201).json({ message: 'Comic created!', comic: comic });
            JsonNode rootNode = objectMapper.readTree(json);
            JsonNode messageNode = rootNode.get("message");
            JsonNode comicNode = rootNode.get("comic");

            if (comicNode == null)
                return "An error occurred while creating the comic!";
            
            String message = messageNode.asText();
            StringBuilder output = new StringBuilder(message + "\n");

            return output.toString();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return "Failed to parse POST response.";
        }

    }
    
}