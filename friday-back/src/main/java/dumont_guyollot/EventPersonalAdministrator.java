package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Objects;

@Path("/events/personal")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventPersonalAdministrator {

    @GET
    public List<EventPersonal> getEventPersonalList(){
        List<EventBuilder> eventsBuilder = EventBuilder.listAll();
        return eventsBuilder.stream().map(eventBuilder -> eventBuilder.build(EventsType.PERSONAL)).toList();
    }

    @POST
    @Transactional
    public Response addEvent(EventBuilder eventBuilder){
        Objects.requireNonNull(eventBuilder);
        if(eventBuilder.eventTest()){
            eventBuilder.persist();
            return Response.status(Response.Status.CREATED).entity(eventBuilder).build();
        }
        return Response.status(Response.Status.NOT_ACCEPTABLE).entity(eventBuilder).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("id") Long id){
        EventBuilder event = EventBuilder.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }
}