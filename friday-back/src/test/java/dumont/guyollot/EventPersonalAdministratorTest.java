package dumont.guyollot;
import dumont_guyollot.EventPersonal;
import dumont_guyollot.EventPersonalAdministrator;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import javax.transaction.Transactional;
import javax.ws.rs.core.Response;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
public class EventPersonalAdministratorTest {

    @Test
    public void shouldReturnEmptyListOnGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        assertTrue(admin.getEventsList().isEmpty());
    }

    @Test
    @Transactional
    public void shouldReturnEmptyListOnPOSTThenDELETEThenGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        long id = 1;
        admin.deleteEventById(id);
        assertTrue(admin.getEventsList().isEmpty());
    }

    @Test
    @Transactional
    public void shouldAddEventOnPOST(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        assertEquals(Response.status(Response.Status.CREATED).entity(event).build().getStatus(), admin.addEvent(event).getStatus());
    }

    @Test
    @Transactional
    public void shouldNotAddEventOnPOST(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(0, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        assertEquals(Response.status(Response.Status.NOT_ACCEPTABLE).entity(event).build().getStatus(), admin.addEvent(event).getStatus());
    }

    @Test
    @Transactional
    public void shouldReturnEventOnPOSTThenGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        assertEquals(event, admin.getEventsList().get(0));
    }

    @Test
    @Transactional
    public void shouldDeleteEventOnPOSTThenDELETE(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        long id = 1;
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(id).build().getStatus(), admin.deleteEventById(id).getStatus());
    }

    @Test
    @Transactional
    public void shouldNotDeleteEventOnPOSTThenDELETEWithWrongId(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        long id = 1000;
        assertEquals(Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build().getStatus(), admin.deleteEventById(id).getStatus());
    }

    @Test
    @Transactional
    public void shouldUpdateEventOnPOSTThenPUT(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        EventPersonal newEvent = new EventPersonal();
        newEvent.title = "newEvent";
        newEvent.dayStart = event.dayStart;
        newEvent.timeStart = event.timeStart;
        long id = 1;
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(id).build().getStatus(), admin.updateEventById(id, newEvent).getStatus());
    }

    @Test
    @Transactional
    public void shouldNotUpdateEventOnPOSTThenPUTWithWrongId(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        EventPersonal newEvent = new EventPersonal();
        newEvent.title = "newEvent";
        newEvent.dayStart = event.dayStart;
        newEvent.timeStart = event.timeStart;
        long id = 1000;
        assertEquals(Response.status(Response.Status.NOT_ACCEPTABLE).entity(event).build().getStatus(), admin.updateEventById(id, newEvent).getStatus());
    }
}
