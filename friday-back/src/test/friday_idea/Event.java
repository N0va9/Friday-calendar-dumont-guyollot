package friday_idea;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Event extends PanacheEntity {
    @NotNull
    public String title;
    @NotNull
    public LocalDate dayStart;
    public LocalDate dayEnd;
    public String recurrence;
    @NotNull
    public LocalTime timeStart;
    public LocalTime timeEnd;
    public String localisation;
    public String description;
    @NotNull
    public EventType type;
}
