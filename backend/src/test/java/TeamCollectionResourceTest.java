import com.jvegarag.championsmanager.Application;
import com.jvegarag.championsmanager.entity.Team;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import entity.TeamPageResult;
import org.json.JSONException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Application.class},
				webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TeamCollectionResourceTest {

	@Value("${spring.data.rest.maxPageSize}")
	private int maxPageSize;

	@Autowired
	private TestRestTemplate restTemplate;

	JacksonTester<TeamPageResult> json = null;

	@Before
	public void setup() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// Possibly configure the mapper
		JacksonTester.initFields(this, objectMapper);
	}

	@Test
	public void testRetrievePaginatedCollection() throws JSONException, IOException {
		// Arrange
		String url = "/api/team";

		// Act
		ResponseEntity<String> entity = restTemplate.getForEntity(url, String.class);
		List<Team> teams = json.parse(entity.getBody()).getObject().get_embedded().getTeams();

		// Assert
		Assert.assertEquals("Incorrect status code for GET operation", HttpStatus.OK, entity.getStatusCode());
		Assert.assertEquals("Incorrect number of teams per page", 20, teams.size());
	}

	@Test
	public void testFindByCriteria() throws JSONException, IOException {
		// Arrange
		String url = "/api/team/search/findByCriteria?name=RealM&countryName=spain";

		// Act
		ResponseEntity<String> entity = restTemplate.getForEntity(url, String.class);
		List<Team> teams = json.parse(entity.getBody()).getObject().get_embedded().getTeams();

		// Assert
		Assert.assertEquals("Incorrect status code for GET operation", HttpStatus.OK, entity.getStatusCode());
		Assert.assertEquals("Incorrect search result", teams.size(), 1);
	}

}
