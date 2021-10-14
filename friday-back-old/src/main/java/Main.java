import java.sql.SQLException;

public class Main {
    public static void main(String[] args) throws SQLException, ClassNotFoundException {
        DatabaseCreator.createDataBase("./database", "admin", "admin");
    }
}
