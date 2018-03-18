# UEFA Champions Manager backend

This project is the backend of the **UEFA Champions Manager** application based on a implementation of a RESTful API with Spring Data REST. H2 in memory embedded database is automatically launched on application start with an initial data loading (see `src/main/java/resources/import.sql`)

## Running the application

Execute the command `mvn spring-boot:run` on the main folder to launch the application with the default port (8080). The expected is:
```
2017-09-24 21:22:51.372  INFO 2828 --- [main] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 8080 (http)

2017-09-24 21:22:51.372  INFO 2828 --- [main] Application              : Started Application in 10.426 seconds (JVM running for 17.649)
```

```
JDK 1.8 is needed to run the application
````

## Running integration tests

Run `mvn test` to execute the integration tests

## Project structure

    .    
    ├── src    
         ├── main/java/com/jvegarag/championsmanager        # Application source code
                ├── config/RestConfiguration.java           # Configuration beans
                ├── entity/*                                # JPA entities
                ├── errorhandler/*                          # Rest exception handler to transform API errors in JSON
                ├── repository/*                            # Exposed repositories (RESTFul resources)
                ├── validation/*                            # Validation beans
         ├── main/java/resources                            # resources folder (spring configuration & intial import script).
         ├── main/java/resources/i18n                       # Internationalization files
    ├── pom.xml                                             # Dependency management
    └── README.md                                           # This file

## RESTful API

There are two main exposed resources `/team` and `/country` implementing a complete RESTful API (GET, POST, PUT, PATCH, DELETE, ...).

Resources are exposed following the HATEOAS principle. With HATEOAS, a client interacts with a network application that application servers provide dynamically entirely through hypermedia. A REST client needs no prior knowledge about how to interact with an application or server beyond a generic understanding of hypermedia.
                                                       
 

##### Paginated list of teams `GET http://${host}:${port}/api/team{?page,size,sort,projection}`

```JSON
{
    "_embedded": {
        "teams": [
            {
                "name": "Anderlecht",
                "id": 1,
                "country": {
                    "id": 1,
                    "name": "Belgium"
                },
                "favorite": false,
                "opponents": [
                    {
                        "id": 8,
                        "name": "RealMadrid",
                        "favorite": true
                    }
                ],
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/team/1"
                    },
                    "team": {
                        "href": "http://localhost:8080/api/team/1{?projection}",
                        "templated": true
                    },
                    "opponents": {
                        "href": "http://localhost:8080/api/team/1/opponents"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/team/1/country"
                    }
                }
            },
            {
                "name": "APOEL",
                "id": 2,
                "country": {
                    "id": 2,
                    "name": "Cyprus"
                },
                "favorite": false,
                "opponents": [],
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/team/2"
                    },
                    "team": {
                        "href": "http://localhost:8080/api/team/2{?projection}",
                        "templated": true
                    },
                    "opponents": {
                        "href": "http://localhost:8080/api/team/2/opponents"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/team/2/country"
                    }
                }
            }
        ]
    },
    "_links": {
        "first": {
            "href": "http://localhost:8080/api/team?page=0&size=2"
        },
        "self": {
            "href": "http://localhost:8080/api/team{&sort,projection}",
            "templated": true
        },
        "next": {
            "href": "http://localhost:8080/api/team?page=1&size=2"
        },
        "last": {
            "href": "http://localhost:8080/api/team?page=14&size=2"
        },
        "profile": {
            "href": "http://localhost:8080/api/profile/team"
        },
        "search": {
            "href": "http://localhost:8080/api/team/search"
        }
    },
    "page": {
        "size": 2,
        "totalElements": 29,
        "totalPages": 15,
        "number": 0
    }
}
````


##### List of countries `GET http://${host}:${port}/api/country`

```JSON
{
    "_embedded": {
        "countries": [
            {
                "id": 1,
                "name": "Belgium",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/country/1"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/country/1"
                    }
                }
            },
            {
                "id": 2,
                "name": "Cyprus",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/country/2"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/country/2"
                    }
                }
            },
            {
                "id": 3,
                "name": "England",
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/country/3"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/country/3"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/country"
        },
        "profile": {
            "href": "http://localhost:8080/api/profile/country"
        }
    }
}
```

##### List of team types `GET http://${host}:${port}/api/team/search/findByCriteria{?name,countryName,page,size,sort,projection},`
`i.e. GET http://${host}:${port}/api/team/search/findByCriteria?name=Madrid&countryName=Spa&page=0&size=10`
```JSON
{
    "_embedded": {
        "teams": [
            {
                "name": "RealMadrid",
                "id": 8,
                "country": {
                    "id": 4,
                    "name": "Spain"
                },
                "favorite": true,
                "opponents": [
                    {
                        "id": 9,
                        "name": "Barcelona",
                        "favorite": true
                    },
                    {
                        "id": 22,
                        "name": "Oporto",
                        "favorite": false
                    },
                    {
                        "id": 21,
                        "name": "Benfica",
                        "favorite": false
                    }
                ],
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/team/8"
                    },
                    "team": {
                        "href": "http://localhost:8080/api/team/8{?projection}",
                        "templated": true
                    },
                    "opponents": {
                        "href": "http://localhost:8080/api/team/8/opponents"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/team/8/country"
                    }
                }
            },
            {
                "name": "AtléticoMadrid",
                "id": 10,
                "country": {
                    "id": 4,
                    "name": "Spain"
                },
                "favorite": true,
                "opponents": [
                    {
                        "id": 8,
                        "name": "RealMadrid",
                        "favorite": true
                    }
                ],
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/api/team/10"
                    },
                    "team": {
                        "href": "http://localhost:8080/api/team/10{?projection}",
                        "templated": true
                    },
                    "opponents": {
                        "href": "http://localhost:8080/api/team/10/opponents"
                    },
                    "country": {
                        "href": "http://localhost:8080/api/team/10/country"
                    }
                }
            }
        ]
    },
    "_links": {
        "self": {
            "href": "http://localhost:8080/api/team/search/findByCriteria?name=Madrid&countryName=Spa&page=0&size=10"
        }
    },
    "page": {
        "size": 10,
        "totalElements": 2,
        "totalPages": 1,
        "number": 0
    }
}
```