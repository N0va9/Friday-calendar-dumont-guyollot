package dumont_guyollot;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class EventBuilder extends PanacheEntity {
    public String title;
    public LocalDate dayStart;
    public LocalDate dayEnd;
    public String recurrence;
    public LocalTime timeStart;
    public LocalTime timeEnd;
    public String localisation;
    public String description;

    public Event build(EventsType type){
        return switch(type){
            case PERSONAL -> new EventPersonal(id, title, dayStart, dayEnd, recurrence, timeStart, timeEnd, localisation, description);
            case ICALENDAR -> new EventIcalendar(id, title, dayStart, dayEnd, recurrence, timeStart, timeEnd, localisation, description);
            case GOOGLE -> new EventGoogle(id, title, dayStart, dayEnd, recurrence, timeStart, timeEnd, localisation, description);
        };
    }

    public boolean eventTest(){
        Objects.requireNonNull(this.title);
        Objects.requireNonNull(this.dayStart);
        Objects.requireNonNull(this.timeStart);
        return !this.dayStart.atTime(this.timeStart).isBefore(LocalDateTime.now());
    }
}
