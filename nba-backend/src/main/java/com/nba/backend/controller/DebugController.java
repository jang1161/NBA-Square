package com.nba.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/debug")
public class DebugController {

    @GetMapping("/headers")
    public ResponseEntity<String> printHeaders(@RequestHeader Map<String, String> headers) {
        System.out.println("=== 요청 헤더 전체 출력 ===");
        headers.forEach((key, value) -> {
            System.out.println(key + ": " + value);
        });
        System.out.println("==========================");

        return ResponseEntity.ok("헤더 출력 완료 (콘솔 확인)");
    }
}
