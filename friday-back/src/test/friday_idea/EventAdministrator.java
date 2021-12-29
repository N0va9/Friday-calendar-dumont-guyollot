package friday_idea;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Events;
import dumont_guyollot.EventGoogle;
import dumont_guyollot.EventGoogleAdministrator;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.security.GeneralSecurityException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Path("/event")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EventAdministrator {

    private static final String APPLICATION_NAME = "Friday";
    private static final String TOKENS_DIRECTORY_PATH = "tokens";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR_READONLY);
    private static final String CREDENTIALS_FILE_PATH = "/credentials.json";

    @POST
    @Transactional
    public Response addEvent(Event event){
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
        Event event = Event.findById(id);
        if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }
        event.delete();
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response updateEventById(@PathParam("id") Long id, Event newEvent){
        Event event = Event.findById(id);
        /*if(event == null){
            return Response.status(Response.Status.NOT_ACCEPTABLE).entity(id).build();
        }*/
        Objects.requireNonNull(newEvent);
        event.title = newEvent.title;
        return Response.status(Response.Status.ACCEPTED).entity(id).build();
    }

    @GET
    public List<Event> getEventsList(){
        List<Event> events = Event.listAll();
        return events.stream().toList();
    }

    @POST
    @Transactional
    public Response synchronizedDatabase() throws GeneralSecurityException, IOException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        Calendar service = new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT))
                .setApplicationName(APPLICATION_NAME)
                .build();
        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = service.events().list("primary")
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        List<com.google.api.services.calendar.model.Event> items = events.getItems();
        if (items.isEmpty()) {
            return Response.status(Response.Status.NOT_ACCEPTABLE).build();
        }
        EventGoogle.deleteAll();
        items.stream().map(item -> {
            EventGoogle event = new EventGoogle();
            event.title = item.getSummary();
            var start = item.getStart();
            var end = item.getEnd();
            var eventStart = start.containsKey("date") ?
                    LocalDate.parse(start.getDate().toString()).atStartOfDay() :
                    LocalDateTime.ofInstant(
                            Instant.parse(start.get("dateTime").toString()),
                            ZoneId.of(start.get("timeZone").toString())
                    );
            var eventEnd = end.containsKey("date") ?
                    LocalDate.parse(end.getDate().toString()).atStartOfDay() :
                    LocalDateTime.ofInstant(Instant.parse(
                                    end.get("dateTime").toString()),
                            ZoneId.of(end.get("timeZone").toString())
                    );
            event.dayStart = eventStart.toLocalDate();
            event.dayEnd = eventEnd.toLocalDate();
            event.timeStart = eventStart.toLocalTime();
            event.timeEnd = eventEnd.toLocalTime();
            event.localisation = item.getLocation();
            event.description = item.getDescription();
            return event;
        }).forEach(event -> event.persist());
        return Response.status(Response.Status.CREATED).build();
    }

    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT) throws IOException {
        InputStream in = EventAdministrator.class.getResourceAsStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        //returns an authorized Credential object.
        return new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
    }
}
