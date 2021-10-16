package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/events/personal")
public class EventPersonalAdministrator {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<EventPersonal> eventBuilders(){
        List<EventBuilder> eventsBuilder = EventBuilder.listAll();
        return eventsBuilder.stream().map(eventBuilder -> eventBuilder.build(EventsType.PERSONAL)).toList();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Transactional
    public Response addEvent(EventBuilder eventBuilder){
        eventBuilder.persist();
        return Response.status(Response.Status.CREATED).entity(eventBuilder).build();
    }
}
