package com.expensetracker.ExpenceTrackerBackend.service;

import com.expensetracker.ExpenceTrackerBackend.model.Expense;
import com.expensetracker.ExpenceTrackerBackend.model.Income;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
public class ReportService {

    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    public ReportService(ExpenseService expenseService, IncomeService incomeService) {
        this.expenseService = expenseService;
        this.incomeService = incomeService;
    }

    public Map<String, Object> getPnL(String email) {
        List<Expense> expenses = expenseService.getAllExpenses(email);
        List<Income> incomes = incomeService.getAllIncomes(email);

        double totalExpense = expenses.stream().mapToDouble(Expense::getAmount).sum();
        double totalIncome = incomes.stream().mapToDouble(Income::getAmount).sum();
        double pnl = totalIncome - totalExpense;

        Map<String, Object> response = new HashMap<>();
        response.put("totalIncome", totalIncome);
        response.put("totalExpense", totalExpense);
        response.put("balance", pnl);

        return response;
    }
}
