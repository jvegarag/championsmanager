package com.jvegarag.championsmanager.config;

import com.jvegarag.championsmanager.entity.Team;
import com.jvegarag.championsmanager.entity.Country;
import com.jvegarag.championsmanager.validation.TeamRemoveValidator;
import com.jvegarag.championsmanager.validation.TeamValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Locale;

/**
 * Configuration of the spring context for the rest application
 */
@Configuration
public class RestConfiguration extends RepositoryRestConfigurerAdapter {

    @Autowired
    TeamValidator teamValidator;

    @Autowired
    TeamRemoveValidator teamRemoveValidator;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Team.class, Country.class);
    }

    @Override
    public void configureValidatingRepositoryEventListener(ValidatingRepositoryEventListener v) {
        v.addValidator("beforeCreate", teamValidator);
        v.addValidator("beforeSave", teamValidator);
        v.addValidator("beforeDelete", teamRemoveValidator);
    }

    @Bean
    public MessageSource messageSource() {
        ReloadableResourceBundleMessageSource msgSrc = new ReloadableResourceBundleMessageSource();
        msgSrc.setBasename("classpath:i18n/messages");
        msgSrc.setDefaultEncoding("UTF-8");
        return msgSrc;
    }

    @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver slr = new CookieLocaleResolver();
        slr.setDefaultLocale(Locale.ENGLISH);
        return slr;
    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .build();

    }
}