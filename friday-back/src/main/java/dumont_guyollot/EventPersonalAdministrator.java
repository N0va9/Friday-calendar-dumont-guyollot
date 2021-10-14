package dumont_guyollot;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/database")
public class EventPersonalAdministrator {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<EventBuilder> eventBuilders(){
        return EventBuilder.listAll();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addEvent(EventBuilder eventBuilder){
        eventBuilder.persist();
        return Response.status(Response.Status.CREATED).entity(eventBuilder).build();
    }
}
