package dumont_guyollot;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventIcalendar(
        long id,
        String title,
        LocalDate dayStart,
        LocalDate dayEnd,
        String recurrence,
        LocalTime timeStart,
        LocalTime timeEnd,
        String localisation,
        String description
) implements Event {}