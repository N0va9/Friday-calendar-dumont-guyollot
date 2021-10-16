package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Objects;

@Path("/events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventAdministrator {

    @GET
    @Path("/{type}")
    public List<EventPersonal> getEventsListByType(@PathParam("type") EventsType type){
        List<EventBuilder> eventsBuilder = EventBuilder.listAll();
        return eventsBuilder.stream().map(eventBuilder -> eventBuilder.build(type)).toList();
    }

    @POST
    @Path("/{type}")
    @Transactional
    public Response addEvent(@PathParam("type") EventsType type, EventBuilder eventBuilder){
        Objects.requireNonNull(eventBuilder);
        if(eventBuilder.eventTest()){
            eventBuilder.persist();
            return Response.status(Response.Status.CREATED).entity(eventBuilder).build();
        }
        return Response.status(Response.Status.NOT_ACCEPTABLE).entity(eventBuilder).build();
    }

    @DELETE
    @Path("/{type}/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("type") EventsType type, @PathParam("id") Long id){
        EventBuilder event = EventBuilder.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{type}/{id}")
    @Transactional
    public Response updateEventById(@PathParam("type") EventsType type, @PathParam("id") Long id, EventBuilder newEventBuilder){
        EventBuilder event = EventBuilder.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.title = newEventBuilder.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }
}