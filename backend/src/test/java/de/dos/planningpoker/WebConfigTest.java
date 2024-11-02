package de.dos.planningpoker;

import de.dos.planningpoker.config.WebConfig;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.config.annotation.CorsRegistration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WebConfigTest {

    @Test
    void webMvcConfigurer_ShouldConfigureCorsCorrectly() {
        // Arrange
        WebConfig webConfig = new WebConfig();
        WebMvcConfigurer configurer = webConfig.webMvcConfigurer();

        CorsRegistry registry = mock(CorsRegistry.class);
        CorsRegistration registration = mock(CorsRegistration.class);

        when(registry.addMapping(any())).thenReturn(registration);
        when(registration.allowedOrigins(any())).thenReturn(registration);
        when(registration.allowedHeaders(any())).thenReturn(registration);
        when(registration.allowedMethods(any())).thenReturn(registration);

        // Act
        configurer.addCorsMappings(registry);

        // Assert
        verify(registry).addMapping("/**");
        verify(registration).allowedOrigins("*");
        verify(registration).allowedHeaders("*");
        verify(registration).allowedMethods("*");
    }
}