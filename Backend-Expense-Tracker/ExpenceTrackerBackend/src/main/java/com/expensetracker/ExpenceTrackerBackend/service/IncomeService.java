package com.expensetracker.ExpenceTrackerBackend.service;

import com.expensetracker.ExpenceTrackerBackend.model.Income;
import com.expensetracker.ExpenceTrackerBackend.model.User;
import com.expensetracker.ExpenceTrackerBackend.repository.IncomeRepository;
import com.expensetracker.ExpenceTrackerBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Predicate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class IncomeService {

    private final IncomeRepository incomeRepository;
    private final UserRepository userRepository;

    public IncomeService(IncomeRepository incomeRepository, UserRepository userRepository) {
        this.incomeRepository = incomeRepository;
        this.userRepository = userRepository;
    }

    public Income addIncome(Income income, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        income.setUser(user);
        return incomeRepository.save(income);
    }

    public List<Income> getAllIncomes(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return incomeRepository.findByUserId(user.getId());
    }

    public void deleteIncome(Long id) {
        if (!incomeRepository.existsById(id)) {
            throw new EntityNotFoundException("Income not found");
        }
        incomeRepository.deleteById(id);
    }

    public Page<Income> getIncomesWithFilters(String email, Date startDate, Date endDate, Income.Source source, Pageable pageable) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Specification<Income> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(criteriaBuilder.equal(root.get("user"), user));

            if (startDate != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("date"), startDate));
            }
            if (endDate != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("date"), endDate));
            }
            if (source != null) {
                predicates.add(criteriaBuilder.equal(root.get("source"), source));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        return incomeRepository.findAll(spec, pageable);
    }
}
