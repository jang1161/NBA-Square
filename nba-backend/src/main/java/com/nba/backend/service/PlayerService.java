package com.nba.backend.service;

import com.nba.backend.dto.PlayerDto;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.*;

import org.springframework.http.HttpEntity;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PlayerService {
    private RestTemplate restTemplate = new RestTemplate();
    private ObjectMapper objectMapper = new ObjectMapper();
    private HttpHeaders nbaHeaders() {
        HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        headers.set("Referer", "https://stats.nba.com/");
        headers.set("Host", "stats.nba.com");
        return headers;
    }

    public List<PlayerDto> getPlayersByTeamId(Long teamId, String season) {
        try {
            String rosterUrl = "https://stats.nba.com/stats/commonteamroster?TeamID=" + teamId + "&Season=" + season;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            String response = restTemplate.exchange(rosterUrl, HttpMethod.GET, entity, String.class).getBody();

            JsonNode rowSet = objectMapper.readTree(response).get("resultSets").get(0).get("rowSet");
            List<PlayerDto> players = new ArrayList<>();
            
            for (JsonNode playerArray : rowSet) {
                PlayerDto player = new PlayerDto();
                player.setId(playerArray.get(5).asLong());                     // PLAYER_ID
                player.setFirstName(playerArray.get(3).asText().split(" ")[0]); // PLAYER
                player.setLastName(playerArray.get(3).asText().split(" ")[1]);  // PLAYER
                player.setJersey(playerArray.get(6).asText());                  // NUM
                player.setPosition(playerArray.get(7).asText());                // POSITION
                player.setHeight(playerArray.get(8).asText());                  // HEIGHT
                player.setWeight(playerArray.get(9).asText());                  // WEIGHT
                player.setAge(playerArray.get(11).asInt());                     // AGE
                players.add(player);
            }
            return players;
        } catch(Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<PlayerDto> getAllPlayers(String season) {
        try {
            String url = "https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season=" + season;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

            JsonNode rowSet = objectMapper.readTree(response).get("resultSets").get(0).get("rowSet");
            List<PlayerDto> players = new ArrayList<>();
            
            for (JsonNode playerArray : rowSet) {
                PlayerDto player = new PlayerDto();
                player.setId(playerArray.get(0).asLong());
                player.setFullName(playerArray.get(2).asText());
                player.setTeamId(playerArray.get(8).asLong());
                player.setTeamAbbreviation(playerArray.get(11).asText());
                players.add(player);
            }
            return players;
        } catch(Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

}
