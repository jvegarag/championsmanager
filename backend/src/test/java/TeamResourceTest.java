import com.jvegarag.championsmanager.Application;
import com.jvegarag.championsmanager.entity.Team;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONException;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {Application.class},
				webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TeamResourceTest {

	@Autowired
	private TestRestTemplate restTemplate;

	JacksonTester<Team> json = null;

	@Before
	public void setup() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		// Possibly configure the mapper
		JacksonTester.initFields(this, objectMapper);
	}

	@Test
	public void testModifyOperation() throws JSONException, IOException {
		// Arrange
		final Boolean newFavorite = true;
		final String newName = "ModifiedName";

		String url = "/api/team/1";
		Map<String, Object> data = new HashMap<String, Object>() {
			{
				put("favorite", newFavorite);
				put("name", newName);
			}
		};

		// Act
		ResponseEntity<Void> exchange = restTemplate.exchange(url, HttpMethod.PUT, new HttpEntity<>(data), Void.class);

		ResponseEntity<String> entity = restTemplate.getForEntity(url, String.class);
		Team team = json.parse(entity.getBody()).getObject();

		// Assert
		Assert.assertEquals("Incorrect status code for update", HttpStatus.OK, exchange.getStatusCode());

		Assert.assertEquals("The name was not modified", newName, team.getName());
		Assert.assertEquals("The favourite was not modified", newFavorite, team.getFavorite());
	}

}
