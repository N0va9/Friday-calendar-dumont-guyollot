package dumont.guyollot;
import dumont_guyollot.EventPersonal;
import dumont_guyollot.EventPersonalAdministrator;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import javax.transaction.Transactional;
import javax.ws.rs.core.Response;

import java.time.LocalDate;
import java.time.LocalTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class EventPersonalAdministratorTest {

    @Test
    @Order(1)
    public void shouldReturnEmptyListOnGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        assertTrue(admin.getEventsList().isEmpty());
    }

    @Test
    @Transactional
    @Order(2)
    public void shouldReturnEmptyListOnPOSTThenDELETEThenGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        admin.deleteEventById(event.id);
        assertTrue(admin.getEventsList().isEmpty());
    }

    @Test
    @Transactional
    @Order(3)
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
    @Order(4)
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
    @Order(5)
    public void shouldReturnEventOnPOSTThenGET(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        assertTrue(admin.getEventsList().contains(event));
    }

    @Test
    @Transactional
    @Order(6)
    public void shouldDeleteEventOnPOSTThenDELETE(){
        EventPersonalAdministrator admin = new EventPersonalAdministrator();
        EventPersonal event = new EventPersonal();
        event.title = "test";
        event.dayStart = LocalDate.of(2021, 12, 31);
        event.timeStart = LocalTime.of(15, 0, 0);
        admin.addEvent(event);
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(event.id).build().getStatus(), admin.deleteEventById(event.id).getStatus());
    }

    @Test
    @Transactional
    @Order(7)
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
    @Order(8)
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
        assertEquals(Response.status(Response.Status.ACCEPTED).entity(event.id).build().getStatus(), admin.updateEventById(event.id, newEvent).getStatus());
    }

    @Test
    @Transactional
    @Order(9)
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
