package com.nba.backend.util;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

public class NbaApiTestRest {
    public static void main(String[] args) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://stats.nba.com/stats/commonteamroster?TeamID=1610612742&Season=2024-25";

        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        headers.set("Referer", "https://stats.nba.com/");
        headers.set("Host", "stats.nba.com");
        // headers.set("Accept", "*/*");
        headers.set("Accept-Language", "en-US,en;q=0.9");  // 필요하면 추가

        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                System.out.println(response.getBody());
            } else {
                System.out.println("Response status: " + response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
