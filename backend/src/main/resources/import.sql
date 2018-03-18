SET REFERENTIAL_INTEGRITY FALSE;

INSERT INTO COUNTRY(ID, NAME) VALUES (1,'Belgium');
INSERT INTO COUNTRY(ID, NAME) VALUES (2,'Cyprus');
INSERT INTO COUNTRY(ID, NAME) VALUES (3,'England');
INSERT INTO COUNTRY(ID, NAME) VALUES (4,'Spain');
INSERT INTO COUNTRY(ID, NAME) VALUES (5,'France');
INSERT INTO COUNTRY(ID, NAME) VALUES (6,'Germany');
INSERT INTO COUNTRY(ID, NAME) VALUES (7,'Greece');
INSERT INTO COUNTRY(ID, NAME) VALUES (8,'Italy');
INSERT INTO COUNTRY(ID, NAME) VALUES (9,'Nederland');
INSERT INTO COUNTRY(ID, NAME) VALUES (10,'Portugal');
INSERT INTO COUNTRY(ID, NAME) VALUES (11,'Russia');
INSERT INTO COUNTRY(ID, NAME) VALUES (12,'Scotland');
INSERT INTO COUNTRY(ID, NAME) VALUES (13,'Switzerland');
INSERT INTO COUNTRY(ID, NAME) VALUES (14,'Slovenia');
INSERT INTO COUNTRY(ID, NAME) VALUES (15,'Turkey');
INSERT INTO COUNTRY(ID, NAME) VALUES (16,'Ukraine');


INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (1,'Anderlecht',1,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (2,'APOEL',2,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (3,'Chelsea',3,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (4,'ManchesterCity',3,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (5,'ManchesterUnited',3,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (6,'TottenhamHotspur',3,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (7,'Liverpool',3,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (8,'RealMadrid',4,1);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (9,'Barcelona',4,1);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (10,'AtléticoMadrid',4,1);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (11,'Sevilla',4,1);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (12,'Mónaco',5,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (13,'ParisSaint-Germain',5,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (14,'BayernMúnich',6,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (15,'BorussiaDortmund',6,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (16,'Olympiacos',7,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (17,'Juventus',8,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (18,'Nápoles',8,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (19,'Roma',8,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (20,'Feyenoord',9,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (21,'Benfica',10,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (22,'Oporto',10,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (23,'Sporting',10,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (24,'SpartakMoscú',11,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (25,'CSKA.Moscú',11,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (26,'Celtic',12,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (27,'Basilea',13,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (28,'Maribor',14,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (29,'Beşiktaş',15,0);
INSERT INTO TEAM(ID, NAME, COUNTRY_ID, FAVORITE) VALUES (30,'ShakhtarDonetsk',16,0);



INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (8, 9);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (8, 22);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (8, 21);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (9, 8);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (10, 8);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (14, 1);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (13, 4);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (20, 15);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (25, 13);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (26, 12);
INSERT INTO TEAM_OPPONENT_REL(TEAM_ID, OPPONENT_ID) VALUES (27, 8);


SET REFERENTIAL_INTEGRITY TRUE;