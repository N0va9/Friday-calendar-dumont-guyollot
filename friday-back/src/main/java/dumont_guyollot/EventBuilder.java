package dumont_guyollot;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalTime;

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

    public EventPersonal build(){
        return new EventPersonal(id, title, dayStart, dayEnd, recurrence, timeStart, timeEnd, localisation, description);
    }
}
