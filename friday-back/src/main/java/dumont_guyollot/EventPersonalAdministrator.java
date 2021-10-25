package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Path("/personal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventPersonalAdministrator {
    @GET
    public List<EventPersonal> getEventsList(){
        List<EventPersonal> eventsPersonal = EventPersonal.listAll();
        return eventsPersonal.stream().toList();
    }

    @POST
    @Transactional
    public Response addEvent(EventPersonal eventPersonal){
        Objects.requireNonNull(eventPersonal);
        if(!eventPersonal.dayStart.atTime(eventPersonal.timeStart).isBefore(LocalDateTime.now())){
            eventPersonal.persist();
            return Response.status(Response.Status.CREATED).entity(eventPersonal).build();
        }
        return Response.status(Response.Status.NOT_ACCEPTABLE).entity(eventPersonal).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("id") Long id){
        EventPersonal event = EventPersonal.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEventById(@PathParam("id") Long id, EventPersonal newEventPersonal){
        EventPersonal event = EventPersonal.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.title = newEventPersonal.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }
}
