package com.example.task_manager_backend.repository;

import com.example.task_manager_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.task_manager_backend.model.Status;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByUser_UserId(Long userId);
    List<Task> findByStatus(Status status);

}