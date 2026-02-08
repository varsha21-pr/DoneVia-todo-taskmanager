package com.example.task_manager_backend.controller;

import com.example.task_manager_backend.model.Task;
import com.example.task_manager_backend.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/user/{userId}")
    public List<Task> getTasks(@PathVariable Long userId) {
        return service.getTasksByUser(userId);
    }

 
    @PostMapping("/user/{userId}")
    public Task addTask(@PathVariable Long userId,
                        @RequestBody Task task) {
        return service.createTask(userId, task);
    }
    
    @PutMapping("/{taskId}")
    public Task updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        return service.updateTask(taskId, task);
    }

    
    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        service.deleteTask(taskId);
    }
}