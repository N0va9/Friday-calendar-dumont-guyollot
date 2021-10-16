package dumont_guyollot;

public sealed interface Event permits EventPersonal, EventIcalendar, EventGoogle { }
