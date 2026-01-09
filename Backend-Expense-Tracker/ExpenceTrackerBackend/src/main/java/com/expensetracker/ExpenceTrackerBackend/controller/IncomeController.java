package com.expensetracker.ExpenceTrackerBackend.controller;

import com.expensetracker.ExpenceTrackerBackend.model.Income;
import com.expensetracker.ExpenceTrackerBackend.service.IncomeService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    public IncomeController(IncomeService incomeService) {
        this.incomeService = incomeService;
    }

    @PostMapping
    public ResponseEntity<Income> addIncome(@RequestBody Income income, Principal principal) {
        return ResponseEntity.ok(incomeService.addIncome(income, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<Page<Income>> getIncomes(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(required = false) Income.Source source,
            Principal principal,
            Pageable pageable
    ) {
        return ResponseEntity.ok(incomeService.getIncomesWithFilters(principal.getName(), startDate, endDate, source, pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        incomeService.deleteIncome(id);
        return ResponseEntity.ok().build();
    }
}
