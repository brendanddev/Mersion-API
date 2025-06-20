package com.brendanddev.kollectbin;

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
    
}