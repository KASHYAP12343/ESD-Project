package com.esd.facultygrading.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
    
    @GetMapping("/")
    public String home() {
        return "redirect:/oauth2/authorization/google";
    }
    
    @GetMapping("/login")
    public String login() {
        return "redirect:/oauth2/authorization/google";
    }
}

