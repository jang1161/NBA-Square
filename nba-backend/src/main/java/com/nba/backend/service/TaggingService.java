package com.nba.backend.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TaggingService {
    @Value("${huggingface.token}")
    private String hfApiToken;

    private final RestTemplate restTemplate = new RestTemplate();
    private final String HF_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli";

    List<String> candidateLabels = List.of(
            "Atlanta Hawks",
            "Boston Celtics",
            "Brooklyn Nets",
            "Charlotte Hornets",
            "Chicago Bulls",
            "Cleveland Cavaliers",
            "Dallas Mavericks",
            "Denver Nuggets",
            "Detroit Pistons",
            "Golden State Warriors",
            "Houston Rockets",
            "Indiana Pacers",
            "Los Angeles Clippers",
            "Los Angeles Lakers",
            "Memphis Grizzlies",
            "Miami Heat",
            "Milwaukee Bucks",
            "Minnesota Timberwolves",
            "New Orleans Pelicans",
            "New York Knicks",
            "Oklahoma City Thunder",
            "Orlando Magic",
            "Philadelphia 76ers",
            "Phoenix Suns",
            "Portland Trail Blazers",
            "Sacramento Kings",
            "San Antonio Spurs",
            "Toronto Raptors",
            "Utah Jazz",
            "Washington Wizards");

    public List<String> extractTags(String content) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setAccept(List.of(MediaType.APPLICATION_JSON));
            headers.setBearerAuth(hfApiToken);

            Map<String, Object> body = new HashMap<>();
            body.put("inputs", content);

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("candidate_labels", candidateLabels);
            parameters.put("multi_label", true);
            body.put("parameters", parameters);

            HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(HF_API_URL, request, Map.class);

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                List<String> labels = (List<String>) response.getBody().get("labels");
                List<Double> scores = (List<Double>) response.getBody().get("scores");

                List<String> result = new ArrayList<>();
                for (int i = 0; i < labels.size(); i++) {
                    if (scores.get(i) >= 0.5) { // 0.5 이상인 태그만 선택
                        result.add(labels.get(i));
                        System.out.println(labels.get(i) + " 태그 추가");
                    }
                }
                return result;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return List.of(); // 실패 시 빈 리스트 반환
    }
}
