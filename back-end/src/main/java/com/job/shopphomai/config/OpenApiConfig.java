package com.job.shopphomai.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Job Apply API",
        version = "1.0.36",
        description = "Backend API for managing job application workflows",
        contact = @Contact(
            name = "Job",
            email = "support@jaa.com"
        )
    ),
    servers = {
        @Server(
            description = "Development Server",
            url = "http://localhost:8081/"
        )
    }
)
// @SecurityScheme(
//     name = "Bearer Authentication",
//     description = "JWT authentication token. Login to get your token.",
//     scheme = "bearer",
//     type = SecuritySchemeType.HTTP,
//     bearerFormat = "JWT",
//     in = SecuritySchemeIn.HEADER
// )
public class OpenApiConfig {
    // Configuration is handled by annotations
}
