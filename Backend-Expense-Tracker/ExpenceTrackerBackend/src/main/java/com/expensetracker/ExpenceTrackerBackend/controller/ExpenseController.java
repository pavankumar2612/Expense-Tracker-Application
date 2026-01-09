package com.expensetracker.ExpenceTrackerBackend.controller;

import com.expensetracker.ExpenceTrackerBackend.model.Expense;
import com.expensetracker.ExpenceTrackerBackend.service.ExpenseService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Date;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense, Principal principal) {
        return ResponseEntity.ok(expenseService.addExpense(expense, principal.getName()));
    }

    @GetMapping
    public ResponseEntity<Page<Expense>> getExpenses(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(required = false) Expense.Category category,
            Principal principal,
            Pageable pageable
    ) {
        return ResponseEntity.ok(expenseService.getExpensesWithFilters(principal.getName(), startDate, endDate, category, pageable));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return ResponseEntity.ok().build();
    }
}
