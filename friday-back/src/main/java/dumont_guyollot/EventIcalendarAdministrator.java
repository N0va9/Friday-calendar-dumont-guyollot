package dumont_guyollot;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import biweekly.Biweekly;
import biweekly.component.VEvent;
import biweekly.util.DateTimeComponents;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Path("/icalendar")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventIcalendarAdministrator {

    @GET
    public List<EventIcalendar> getEventsList(){
        List<EventIcalendar> eventsIcalendar = EventIcalendar.listAll();
        return eventsIcalendar.stream().toList();
    }

    private List<VEvent> filterEvent(List<VEvent> events){
        return events.stream().filter(event -> {
            DateTimeComponents dateStart = event.getDateStart().getValue().getRawComponents();
            LocalDateTime dayStart = LocalDate.of(dateStart.getYear(), dateStart.getMonth(), dateStart.getDate()).atTime(dateStart.getHour(), dateStart.getMinute(), dateStart.getSecond());
            return !dayStart.isBefore(LocalDateTime.now());
        }).toList();
    }

    private void persistEvents(List<VEvent> events){
        events.stream().map(event -> {
            EventIcalendar eventI = new EventIcalendar();
            eventI.title = event.getSummary().getValue();
            DateTimeComponents dateStart = event.getDateStart().getValue().getRawComponents();
            DateTimeComponents dateEnd = event.getDateEnd().getValue().getRawComponents();
            eventI.dayStart = LocalDate.of(dateStart.getYear(), dateStart.getMonth(), dateStart.getDate());
            eventI.dayEnd = LocalDate.of(dateEnd.getYear(), dateEnd.getMonth(), dateEnd.getDate());
            eventI.timeStart = LocalTime.of(dateStart.getHour(), dateStart.getMinute(), dateStart.getSecond());
            eventI.timeEnd = LocalTime.of(dateEnd.getHour(), dateEnd.getMinute(), dateEnd.getSecond());
            eventI.localisation = event.getLocation().getValue();
            eventI.description = event.getDescription().getValue();
            return eventI;
        }).forEach(event -> event.persist());
    }

    @POST
    @Path("/link")
    @Transactional
    public Response synchronizedDatabaseByLink(String jsonLink) {
        String link;
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(jsonLink);
            link = node.get("link").asText();
        }catch(JsonProcessingException e){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(jsonLink).build();
        }
        InputStream in;
        List<VEvent> events;
        try {
            in = new URL(link).openStream();
            events = Biweekly.parse(in).first().getEvents();
        } catch (IOException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(jsonLink).build();
        }
        if(events.isEmpty()){
            return Response.status(Response.Status.NO_CONTENT).entity(jsonLink).build();
        }
        EventIcalendar.deleteAll();
        persistEvents(filterEvent(events));
        return Response.status(Response.Status.ACCEPTED).entity(jsonLink).build();
    }

    @POST
    @Path("/file")
    @Transactional
    public Response synchronizedDatabaseByFile(String jsonPath) {
        String link;
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(jsonPath);
            link = node.get("path").asText();
        }catch(JsonProcessingException e){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(jsonPath).build();
        }
        List<VEvent> events;
        File file = new File(link);
        try {
            events = Biweekly.parse(file).first().getEvents();
        } catch (IOException e) {
            return Response.status(Response.Status.NOT_FOUND).entity(jsonPath).build();
        }
        if(events.isEmpty()){
            return Response.status(Response.Status.NO_CONTENT).entity(jsonPath).build();
        }
        EventIcalendar.deleteAll();
        persistEvents(filterEvent(events));
        return Response.status(Response.Status.ACCEPTED).entity(jsonPath).build();
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
