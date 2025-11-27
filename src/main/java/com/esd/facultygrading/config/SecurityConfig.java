package com.esd.facultygrading.config;

import com.esd.facultygrading.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Set;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(SecurityConfig.class);
    private static final Set<String> ALLOWED_FACULTY_EMAILS = Set.of(
            "facultyalgo@gmail.com",
            "facultymml1@gmail.com");

    @Autowired
    private FacultyService facultyService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/error", "/login", "/oauth2/**", "/v3/api-docs/**", "/swagger-ui/**",
                                "/swagger-ui.html")
                        .permitAll()
                        .anyRequest().authenticated())
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(authenticationSuccessHandler())
                        .failureHandler((request, response, exception) -> {
                            LOGGER.error("OAuth2 login failed: {}", exception.getMessage(), exception);
                            String message = "Access Denied: " + exception.getMessage();
                            String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8);
                            response.sendRedirect("/error?message=" + encodedMessage);
                        }));

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request,
                    HttpServletResponse response,
                    Authentication authentication) throws IOException, ServletException {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                String email = oauth2User.getAttribute("email");
                LOGGER.info("OAuth2 login attempt for email: {}", email);

                if (email == null) {
                    redirectWithMessage(response, "Access Denied: Unable to read email from Google.");
                    return;
                }

                String normalizedEmail = email.toLowerCase();
                if (!ALLOWED_FACULTY_EMAILS.contains(normalizedEmail)) {
                    redirectWithMessage(response, "Access Denied: Only registered faculty accounts can login.");
                    return;
                }

                // Check if faculty exists in database
                var faculty = facultyService.getFacultyByEmail(email);
                if (faculty == null) {
                    redirectWithMessage(response, "Access Denied: Faculty not found in system.");
                    return;
                }

                // Redirect to React frontend after successful login
                response.sendRedirect("http://localhost:5173/dashboard");
            }

            private void redirectWithMessage(HttpServletResponse response, String message) throws IOException {
                String encodedMessage = URLEncoder.encode(message, StandardCharsets.UTF_8);
                response.sendRedirect("/error?message=" + encodedMessage);
            }
        };
    }
}
