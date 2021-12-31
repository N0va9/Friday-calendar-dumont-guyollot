# ADVANCED JAVA PROJECT M1 COMPUTER SCIENCE : FRIDAY, A SMART CALENDAR ASSISTANT
# A DUMONT-GUYOLLOT innovative project powered by Mr FORAX knowledge and his java advanced courses.

## Name
After a long and breathtaking brainstorm, we have decided that this project name is Friday! (Not because this is the name given by Mr Forax but because Friday is the beginning of the week-end)

## Description
This project is born thanks to Mr FORAX magnificent [*END YEAR'S SUBJECT*](https://igm.univ-mlv.fr/ens/Master/M1/2021-2022/JavaAvance/project.php).<br/>
The main goal was to challenge our ability to design and develop a software with unknown technologies.
To summarize, Friday allows you to create, read, update and delete various events with informations like title, a start date, a start time and more. You can also add events with Icalendar files (.ics format), Icalendar links and sync your google calendar with the software.

## Structures and technologies

The project is separated into two main parts :
- First of all, we have friday-back. This is the back-end or the server-side (in other terms). For this half-baby, we used the glorious programming language: ***JAVA*** in his version 17. Three of the mendatories technologies are :
  - [Quarkus 2.2.3](https://quarkus.io/), it's an API that allows us to implements our REST services.
  - For a perfect match, the second technology is [Hibernate with Panache](https://quarkus.io/guides/hibernate-orm-panache) this technology is for the Object/Relationnal mapping.
  - the last but not least is [H2 database 1.4.200](https://h2database.com/html/main.html). H2 is friday's database. Database composed of 3 table : EventPersonal, EventIcalendar and EventGoogle.

- Then we have friday-front. This is the front-end or the client-side for friday. For this other half-baby, we used the less glorious ***JAVASCRIPT***. And the other two mendatories technologies :
  - [ReactJS](https://reactjs.org/) because plain javascript is more like ***PAIN*** javascript.
  - [Bootstrap](https://getbootstrap.com/) because plain css is more like ***PAIN*** css.
  - The front structure is cut into three panels :
    - the first panel is the ***NEXT EVENT*** : it displays all the informations about the next event (thanks captain obvious) as well as really smart informations. For now it gives you a really nice countdown before the next event.
    - The second panel is the ***DAILY FEED*** : it's the list with all the day's events.
    - The last panel is the ***CALENDAR*** : it displays every day of the current month with a little line that indicates the presence or not of events for that day.

## What is working ?
- The software is **CRUD** *certified*. You can create, read, update and delete events, that means that our API works perfectly.
- You can add a bunch of events with an Icalendar link and/or file's ***ABSOLUTE PATH*** because your security is our main priority, we can't get the absolute path from a file collected from a form.
- You can synchronize friday with your google account, but since the whole project is still in test and google is really lazy ... I mean security is the google's main priority, we can't get the project to valid status in time. So if you want to synchronize your google calendar with friday (or if you are Mr FORAX) please send us an email in order to grant you an access.
- The Three panels described earlier works finely.

## Build and Dev Run (Extract from Quarkus readme)
- If you want to run the project in ***DEV MODE*** :
```shell script
./mvnw compile quarkus:dev
```
then run npm start in friday-front for a live coding on the front or just go to :
```shell script
http://localhost:8080
```
- The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory. Be aware that it’s not an _über-jar_ as
the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

- You can create a native executable using:

```shell script
./mvnw package -Pnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Pnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/friday-back-1.0-SNAPSHOT-runner`

## Support
Here are our emails :
- Thomas Dumont : <thomas2dumont@gmail.com>
- Alan Guyollot : <alguyot13@gmail.com>

## Special thanks
- Sincere thanks to Mr FORAX for this beautiful ***PROJECT***. It was a great experience (I only cried twice but it was continually for like a week).
- Thanks to all the documentations' writers of Quarkus, React, Bootstrap, Java.
- No thanks for the guy that wrote javascript's documentation.
