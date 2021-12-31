package dumont.guyollot;

import dumont_guyollot.EventIcalendarAdministrator;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import javax.transaction.Transactional;
import javax.ws.rs.core.Response;

import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
public class EventIcalendarAdministratorTest {

    @Test
    @Transactional
    public void shouldAddEventOnPOSTWithPath(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "path" : "C:/Users/thoma/Desktop/friday/dumont-guyollot/friday-back/src/test/java/dumont/guyollot/EventIcalendarTest.ics"
                }
                """;
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(jsonPath).build().getStatus(), admin.synchronizedDatabaseByFile(jsonPath).getStatus());
    }

    @Test
    @Transactional
    public void shouldReturnNoContentEventOnPOSTWithEmptyFileWithPath(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath = """
                {
                    "path" : "C:/Users/thoma/Desktop/friday/dumont-guyollot/friday-back/src/test/java/dumont/guyollot/EventIcalendarTest2.ics"
                }
                """;
        assertEquals(Response.status(Response.Status.NO_CONTENT).entity(jsonPath).build().getStatus(), admin.synchronizedDatabaseByFile(jsonPath).getStatus());
    }

    @Test
    @Transactional
    public void shouldReturnNotFoundEventOnPOSTWithWringJSONWithPath(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "path" : ""
                }
                """;
        assertEquals(Response.status(Response.Status.NOT_FOUND).entity(jsonPath).build().getStatus(), admin.synchronizedDatabaseByFile(jsonPath).getStatus());
    }

    @Test
    @Transactional
    public void shouldAddEventOnPOSTWithLink(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "link" : "https://calendar.google.com/calendar/ical/nq98prt06romk0n079p6qss7h8%40group.calendar.google.com/public/basic.ics"
                }
                """;
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(jsonPath).build().getStatus(), admin.synchronizedDatabaseByLink(jsonPath).getStatus());
    }

    @Test
    @Transactional
    public void shouldReturnNoContentEventOnPOSTWithWrongLink(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath = """
                {
                    "link" : "https://calendar.google.com/calendar/ical/6ibosetpaldumblv2oqrj84l5c%40group.calendar.google.com/public/basic.ics"
                }
                """;
        assertEquals(Response.status(Response.Status.NO_CONTENT).entity(jsonPath).build().getStatus(), admin.synchronizedDatabaseByLink(jsonPath).getStatus());
    }

    @Test
    @Transactional
    public void shouldReturnNotFoundEventOnPOSTWithWringJSONWithLink(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonLink =
                """
                {
                    "link" : ""
                }
                """;
        assertEquals(Response.status(Response.Status.NOT_FOUND).entity(jsonLink).build().getStatus(), admin.synchronizedDatabaseByLink(jsonLink).getStatus());
    }

    @Test
    public void shouldReturnEmptyListOnGET(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        assertTrue(admin.getEventsList().isEmpty());
    }

    @Test
    @Transactional
    public void shouldReturnNotEmptyOnPOSTThenGET(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "path" : "C:/Users/thoma/Desktop/friday/dumont-guyollot/friday-back/src/test/java/dumont/guyollot/EventIcalendarTest.ics"
                }
                """;
        admin.synchronizedDatabaseByFile(jsonPath);
        assertFalse(admin.getEventsList().isEmpty());
    }
    @Test
    @Transactional
    public void shouldDeleteEventOnPOSTThenGET(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "path" : "C:/Users/thoma/Desktop/friday/dumont-guyollot/friday-back/src/test/java/dumont/guyollot/EventIcalendarTest.ics"
                }
                """;
        admin.synchronizedDatabaseByFile(jsonPath);
        var list = admin.getEventsList();
        Long id = list.get(0).id;
        admin.deleteEventById(id);
        assertEquals(list.size() - 1, admin.getEventsList().size());
    }

    @Test
    @Transactional
    public void shouldNotDeleteEventOnPOSTThenGETWithWrongId(){
        EventIcalendarAdministrator admin = new EventIcalendarAdministrator();
        String jsonPath =
                """
                {
                    "path" : "C:/Users/thoma/Desktop/friday/dumont-guyollot/friday-back/src/test/java/dumont/guyollot/EventIcalendarTest.ics"
                }
                """;
        admin.synchronizedDatabaseByFile(jsonPath);
        var list = admin.getEventsList();
        Long id = list.get(0).id + 100_000_000;
        admin.deleteEventById(id);
        assertEquals(Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build().getStatus(), admin.deleteEventById(id).getStatus());
    }
}
