package com.expensetracker.ExpenceTrackerBackend.controller;

import com.expensetracker.ExpenceTrackerBackend.service.ReportService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/pnl")
    public ResponseEntity<Map<String, Object>> getPnL(Principal principal) {
        return ResponseEntity.ok(reportService.getPnL(principal.getName()));
    }
}
