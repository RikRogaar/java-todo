package com.rikrogaar.todoapp.seeders;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.rikrogaar.todoapp.models.Task;
import com.rikrogaar.todoapp.repositories.TaskRepository;

@Component
public class TaskSeeder implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        loadTasks();
    }

    private void loadTasks() {
        if (taskRepository.count() == 0) {
            Task task1 = new Task("Learn Java Collections Framework", false);
            Task task2 = new Task("Practice Spring Boot fundamentals", false);
            Task task3 = new Task("Complete Java exercises", true);
            Task task4 = new Task("Implement JUnit test cases", false);
            Task task5 = new Task("Study Java Design Patterns", false);

            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);
            taskRepository.save(task4);
            taskRepository.save(task5);

            System.out.println("Sample Tasks Seeded");
        } else {
            System.out.println("Tasks Seeding Not Required");
        }
    }
}