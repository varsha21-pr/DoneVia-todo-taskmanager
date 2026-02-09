package com.example.task_manager_backend.controller;
import java.util.*;

import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Profile("azure")
public class AzureTestController {

    @GetMapping("/api/tasks")
    public List<Map<String, Object>> getTasksForAzure() {

        List<Map<String, Object>> tasks = new ArrayList<>();

        Map<String, Object> task = new HashMap<>();
        task.put("id", 1);
        task.put("title", "Azure Demo Task");
        task.put("status", "COMPLETED");
        task.put("dueDate", "2026-02-12");

        tasks.add(task);

        return tasks;
    }
}