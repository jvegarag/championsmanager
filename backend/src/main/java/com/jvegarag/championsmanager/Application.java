package com.jvegarag.championsmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Main spring boot application
 */
@EnableSwagger2
@SpringBootApplication
@Import({springfox.documentation.spring.data.rest.configuration.SpringDataRestConfiguration.class})
public class Application {

	/**
	 * Entry point
	 * @param args
	 */
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

}