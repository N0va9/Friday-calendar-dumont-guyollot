package friday_idea2;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

abstract class Event {
    @POST
    @Transactional
    public Response addEvent(friday_idea.Event event){
        Objects.requireNonNull(event);
        if(!event.dayStart.atTime(event.timeStart).isBefore(LocalDateTime.now())){
            event.persist();
            return Response.status(Response.Status.CREATED).entity(event).build();
        }
        return Response.status(Response.Status.NOT_ACCEPTABLE).entity(event).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteEventById(@PathParam("id") Long id){
        friday_idea.Event event = friday_idea.Event.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEventById(@PathParam("id") Long id, friday_idea.Event newEvent){
        friday_idea.Event event = friday_idea.Event.findById(id);
        /*if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }*/
        Objects.requireNonNull(newEvent);
        event.title = newEvent.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @GET
    public List<friday_idea.Event> getEventsList(){
        List<friday_idea.Event> events = friday_idea.Event.listAll();
        return events.stream().toList();
    }
}
