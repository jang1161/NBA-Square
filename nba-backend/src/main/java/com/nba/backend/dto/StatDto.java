package com.nba.backend.dto;

import lombok.Data;

@Data
public class StatDto {
    private Long playerId;
    private String season;
    private String teamAbb;
    private Integer gp;
    private double min;
    private double fgM;
    private double fgA;
    private double fgP;
    private double fg3M;
    private double fg3A;
    private double fg3P;
    private double ftM;
    private double ftA;
    private double ftP;
    private double oreb;
    private double dreb;
    private double reb;
    private double ast;
    private double stl;
    private double blk;
    private double tov;
    private double pf;
    private double pts;
}   
