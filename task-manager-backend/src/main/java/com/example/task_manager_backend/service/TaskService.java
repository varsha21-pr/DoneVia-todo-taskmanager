package com.example.task_manager_backend.service;

import com.example.task_manager_backend.model.Task;
import com.example.task_manager_backend.model.User;
import com.example.task_manager_backend.repository.TaskRepository;
import com.example.task_manager_backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository taskRepo;
    private final UserRepository userRepo;

    public TaskService(TaskRepository taskRepo, UserRepository userRepo) {
        this.taskRepo = taskRepo;
        this.userRepo = userRepo;
    }

    public List<Task> getTasksByUser(Long userId) {
        return taskRepo.findByUser_UserId(userId);
    }

    public Task createTask(Long userId, Task task) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        task.setUser(user);
        task.setCreatedAt(LocalDateTime.now());

        return taskRepo.save(task);
    }
    
    public Task updateTask(Long taskId, Task updatedTask) {
        Task task = taskRepo.findById(taskId).orElseThrow();
        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());
        return taskRepo.save(task);
    }
    public void deleteTask(Long taskId) {
        taskRepo.deleteById(taskId);
    }

}