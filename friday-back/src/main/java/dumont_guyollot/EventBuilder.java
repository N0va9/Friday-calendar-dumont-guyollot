package dumont_guyollot;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class EventBuilder extends PanacheEntity {
    @Id @GeneratedValue  private int id;
    private String title;
    private LocalDate dayStart;
    private LocalDate dayEnd;
    private String recurrence;
    private LocalTime timeStart;
    private LocalTime timeEnd;
    private String localisation;
    private String Description;

    public EventPersonal build(EventsType type){
        return switch(type){
            case PERSONAL -> new EventPersonal(this.id, this.title, this.dayStart, this.dayEnd, this.recurrence, this.timeStart, this.timeEnd, this.localisation, this.Description);
            case ICALENDAR -> null;
            case GOOGLE -> null;
        };
    }
}
