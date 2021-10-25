package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Path("/icalendar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventIcalendarAdministrator {
    @GET
    public List<EventIcalendar> getEventsList(){
        List<EventIcalendar> eventsIcalendar = EventIcalendar.listAll();
        return eventsIcalendar.stream().toList();
    }

    @POST
    @Transactional
    public Response synchronizedDatabase(EventIcalendar[] eventsIcalendar){
        List<EventIcalendar> events = Arrays.stream(eventsIcalendar).toList();
        if(events.isEmpty()){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(eventsIcalendar).build();
        }
        events.forEach(event -> {
            if(!event.dayStart.atTime(event.timeStart).isBefore(LocalDateTime.now())){
                event.persist();
            }
        });
        return Response.status(Response.Status.CREATED).entity(eventsIcalendar).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("id") Long id){
        EventIcalendar event = EventIcalendar.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEventById(@PathParam("id") Long id, EventIcalendar newEventIcalendar){
        EventIcalendar event = EventIcalendar.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.title = newEventIcalendar.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }
}
