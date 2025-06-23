package com.brendanddev.kollectbin;

// Banner.java
// Defines the banner to be displayed in the cli app
// Brendan Dileo, June 2025

import com.github.lalyos.jfiglet.FigletFont;


public class Banner {

    public static void main(String[] args) {
        try {
            String banner = FigletFont.convertOneLine("Kollectbin");
            System.out.println(banner);
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }



}
