package com.brendanddev.kollectbin;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;

// ObjectToJson.java
// Brendan Dileo, June 2025

import com.fasterxml.jackson.databind.ObjectMapper;

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
    
}