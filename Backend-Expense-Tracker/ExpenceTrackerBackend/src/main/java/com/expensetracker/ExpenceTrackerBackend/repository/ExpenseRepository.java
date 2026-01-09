package com.expensetracker.ExpenceTrackerBackend.repository;

import com.expensetracker.ExpenceTrackerBackend.model.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Expense> {
    List<Expense> findByUserId(Long userId);
    Page<Expense> findByUserId(Long userId, Pageable pageable);
}
