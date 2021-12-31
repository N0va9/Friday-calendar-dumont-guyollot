package dumont.guyollot;

import dumont_guyollot.EventGoogleAdministrator;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
public class EventGoogleAdministratorTest {
    @Test
    public void shouldReturnEmptyListGoogleOnGET(){
        EventGoogleAdministrator admin = new EventGoogleAdministrator();
        assertTrue(admin.getEventsList().isEmpty());
    }
}
