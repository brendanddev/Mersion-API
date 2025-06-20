package com.brendanddev.kollectbin;

import com.fasterxml.jackson.databind.ObjectMapper;

public class ObjectToJson {

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