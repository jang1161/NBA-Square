package com.nba.backend.service;

import com.nba.backend.dto.PlayerDto;
import com.nba.backend.dto.StatDto;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.client.SimpleClientHttpRequestFactory;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class PlayerService {
    private RestTemplate restTemplate;
    private ObjectMapper objectMapper = new ObjectMapper();

    public PlayerService() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(10000); // 연결 타임아웃 10초
        factory.setReadTimeout(15000); // 읽기 타임아웃 15초
        this.restTemplate = new RestTemplate(factory);
    }

    private HttpHeaders nbaHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
        headers.set("Referer", "https://stats.nba.com/");
        headers.set("Host", "stats.nba.com");
        headers.set("Accept-Language", "en-US,en;q=0.9"); // 추가됨
        return headers;
    }

    public List<PlayerDto> getPlayersByTeamId(Long teamId, String season) {
        try {
            String rosterUrl = "https://stats.nba.com/stats/commonteamroster?TeamID=" +
            teamId + "&Season=" + season;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            System.out.println("요청 헤더: " + entity.getHeaders());

            String response = restTemplate.exchange(rosterUrl, HttpMethod.GET, entity,
            String.class).getBody();
            
            JsonNode rowSet = objectMapper.readTree(response).get("resultSets").get(0).get("rowSet");
            List<PlayerDto> players = new ArrayList<>();

            for (JsonNode playerArray : rowSet) {
                PlayerDto player = new PlayerDto();
                player.setId(playerArray.get(14).asLong());
                player.setFullName(playerArray.get(3).asText());
                player.setJersey(playerArray.get(6).asText());
                player.setPosition(playerArray.get(7).asText());
                player.setHeight(playerArray.get(8).asText());
                player.setWeight(playerArray.get(9).asText());
                player.setAge(playerArray.get(11).asInt());
                players.add(player);
            }
            return players;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public List<PlayerDto> getAllPlayers(String season) {
        try {
            String url = "https://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=1&LeagueID=00&Season="
                    + season;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            System.out.println("header: " + entity.getHeaders());
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
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public PlayerDto getPlayerInfo(Long id) {
        try {
            String url = "https://stats.nba.com/stats/commonplayerinfo?LeagueID=&PlayerID=" + id;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

            JsonNode rowSet = objectMapper.readTree(response).get("resultSets").get(0).get("rowSet");
            JsonNode info = rowSet.get(0);

            PlayerDto player = new PlayerDto();
            player.setId(info.get(0).asLong());
            player.setFullName(info.get(3).asText());
            player.setTeamName(info.get(19).asText());
            player.setJersey(info.get(14).asText());
            player.setPosition(info.get(15).asText());
            player.setHeight(formatHeight(info.get(11).asText()));
            player.setWeight(info.get(12).asText() + " lbs");
            player.setCountry(info.get(9).asText());
            String draftInfo = info.get(29).asText().equals("Undrafted") ? "Undrafted"
                    : info.get(29).asText() + " R" + info.get(30).asText() + " pick " + info.get(31).asText();
            player.setDraft(draftInfo);
            String birthdateStr = info.get(7).asText();
            LocalDate birthDate = LocalDate.parse(birthdateStr.substring(0, 10));
            int age = Period.between(birthDate, LocalDate.now()).getYears();
            player.setAge(age);
            player.setSchool(info.get(10).asText());

            return player;
        } catch (Exception e) {
            e.printStackTrace();
            return new PlayerDto();
        }
    }

    public List<StatDto> getPlayerStats(Long id) {
        try {
            String url = "https://stats.nba.com/stats/playercareerstats?LeagueID=&PerMode=Totals&PlayerID=" + id;
            HttpEntity<String> entity = new HttpEntity<>(nbaHeaders());
            String response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class).getBody();

            JsonNode rowSet = objectMapper.readTree(response).get("resultSets").get(0).get("rowSet");
            List<StatDto> stats = new ArrayList<>();

            for (int i = rowSet.size() - 1; i >= 0; i--) {
                StatDto stat = new StatDto();
                JsonNode statArray = rowSet.get(i);

                stat.setPlayerId(statArray.get(0).asLong());
                stat.setSeason(statArray.get(1).asText());
                stat.setTeamAbb(statArray.get(4).asText());
                stat.setGp(statArray.get(6).asInt());
                stat.setMin(statArray.get(8).asDouble() / stat.getGp());
                stat.setFgM(statArray.get(9).asDouble() / stat.getGp());
                stat.setFgA(statArray.get(10).asDouble() / stat.getGp());
                stat.setFgP(statArray.get(11).asDouble());
                stat.setFg3M(statArray.get(12).asDouble() / stat.getGp());
                stat.setFg3A(statArray.get(13).asDouble() / stat.getGp());
                stat.setFg3P(statArray.get(14).asDouble());
                stat.setFtM(statArray.get(15).asDouble() / stat.getGp());
                stat.setFtA(statArray.get(16).asDouble() / stat.getGp());
                stat.setFtP(statArray.get(17).asDouble());
                stat.setOreb(statArray.get(18).asDouble() / stat.getGp());
                stat.setDreb(statArray.get(19).asDouble() / stat.getGp());
                stat.setReb(stat.getOreb() + stat.getDreb());
                stat.setAst(statArray.get(21).asDouble() / stat.getGp());
                stat.setStl(statArray.get(22).asDouble() / stat.getGp());
                stat.setBlk(statArray.get(23).asDouble() / stat.getGp());
                stat.setTov(statArray.get(24).asDouble() / stat.getGp());
                stat.setPf(statArray.get(25).asDouble() / stat.getGp());
                stat.setPts(statArray.get(26).asDouble() / stat.getGp());

                stats.add(stat);
            }
            return stats;
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public static String formatHeight(String h) {
        String[] p = h.split("-");
        int f = Integer.parseInt(p[0]), i = Integer.parseInt(p[1]);
        int cm = (int) Math.round(f * 30.48 + i * 2.54);
        return String.format("%d'%d\" (%dcm)", f, i, cm);
    }

}