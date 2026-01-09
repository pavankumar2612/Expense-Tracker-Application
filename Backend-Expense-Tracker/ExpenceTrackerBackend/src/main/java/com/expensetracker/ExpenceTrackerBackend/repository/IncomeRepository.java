package com.expensetracker.ExpenceTrackerBackend.repository;

import com.expensetracker.ExpenceTrackerBackend.model.Income;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Long>, org.springframework.data.jpa.repository.JpaSpecificationExecutor<Income> {
    List<Income> findByUserId(Long userId);
    Page<Income> findByUserId(Long userId, Pageable pageable);
}
