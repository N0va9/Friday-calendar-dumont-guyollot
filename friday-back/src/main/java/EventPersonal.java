import java.sql.Date;
import java.sql.Time;

public record EventPersonal(
        int id,
        String title,
        Date dayStart,
        Date dayEnd,
        String recurrence,
        Time timeStart,
        Time timeEnd,
        String localisation,
        String description
) implements Event {}