package dumont_guyollot;

import java.time.LocalDate;
import java.time.LocalTime;

public record EventPersonal(
        int id,
        String title,
        LocalDate dayStart,
        LocalDate dayEnd,
        String recurrence,
        LocalTime timeStart,
        LocalTime timeEnd,
        String localisation,
        String Description
) implements Event {}

/*
{
    "title":"Python - CM",
    "dayStart":"2021-10-14",
    "dayEnd":"2021-10-14",
    "recurrence":"none",
    "timeStart":"08:30:00",
    "timeEnd":"10:30:00",
    "localisation":"2V201",
    "description":"none"
}
 */