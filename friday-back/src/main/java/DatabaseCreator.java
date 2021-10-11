import java.sql.*;

public class DatabaseCreator {

    private static String createCollection(String collectionName){
        return "CREATE TABLE IF NOT EXISTS " +
                collectionName +
                "(id INTEGER auto_increment NOT NULL, " +
                "title VARCHAR(30) NOT NULL, " +
                "dayStart DATE NOT NULL, " +
                "dayEnd DATE, " +
                "Recurrence VARCHAR(30), " +
                "timeStart TIME NOT NULL, " +
                "timeEnd TIME, " +
                "localisation VARCHAR(255), " +
                "description VARCHAR(255), " +
                "PRIMARY KEY ( id ))";
    }

    //Create the database
    public static void createDataBase(String path, String username, String password) throws SQLException, ClassNotFoundException {
        Class.forName("org.h2.Driver");
        try(Connection connection = DriverManager.getConnection("jdbc:h2:" + path, username, password)){
            System.out.println("Database created");
            Statement statement = connection.createStatement();
            statement.executeUpdate(createCollection("EVENTS_PERSONAL"));
            System.out.println("Table EVENTS_PERSONAL created");
            statement.executeUpdate(createCollection("EVENTS_ICALENDAR"));
            System.out.println("Table EVENTS_ICALENDAR created");
            statement.executeUpdate(createCollection("EVENTS_GOOGLE"));
            System.out.println("Table EVENTS_GOOGLE created");
        }
    }
}
