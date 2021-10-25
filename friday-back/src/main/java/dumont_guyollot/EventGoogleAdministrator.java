package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Path("/google")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventGoogleAdministrator {
    @GET
    public List<EventGoogle> getEventsList(){
        List<EventGoogle> eventsGoogle = EventGoogle.listAll();
        return eventsGoogle.stream().toList();
    }

    @POST
    @Transactional
    public Response synchronizedDatabase(EventGoogle[] eventsGoogle){
        List<EventGoogle> events = Arrays.stream(eventsGoogle).toList();
        if (events.isEmpty()) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(eventsGoogle).build();
        }
        events.forEach(event -> {
            if(!event.dayStart.atTime(event.timeStart).isBefore(LocalDateTime.now())){
                event.persist();
            }
        });
        return Response.status(Response.Status.CREATED).entity(eventsGoogle).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("id") Long id){
        EventGoogle event = EventGoogle.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEventById(@PathParam("id") Long id, EventGoogle newEventGoogle){
        EventGoogle event = EventGoogle.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.title = newEventGoogle.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }
}
