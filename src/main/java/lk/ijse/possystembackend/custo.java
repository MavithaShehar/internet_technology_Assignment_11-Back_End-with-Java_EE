//package lk.ijse.possystembackend;
//
//import jakarta.json.bind.Jsonb;
//import jakarta.json.bind.JsonbBuilder;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.annotation.WebInitParam;
//import jakarta.servlet.annotation.WebServlet;
//import jakarta.servlet.http.HttpServlet;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.var;
//
//import javax.naming.InitialContext;
//import javax.naming.NamingException;
//import javax.sql.DataSource;
//import java.io.IOException;
//import java.sql.Connection;
//import java.sql.DriverManager;
//import java.sql.SQLException;
//
//@WebServlet(name = "customer",urlPatterns = "/customer",
//        initParams = {
//                @WebInitParam(name = "dto-user",value = "root"),
//                @WebInitParam(name = "dto-pw",value = "1234"),
//                @WebInitParam(name = "dto-url",value = "jdbc:mysql://localhost:3306/test"),
//                @WebInitParam(name = "dto-class",value = "com.mysql.cj.jdbc.Driver")
//
//        }
//
//)
//
//public class customer extends HttpServlet {
//
//        Connection connection;
//
//    @Override
//    public void init() throws ServletException {
//
//        try {
//            InitialContext initialContext = new InitialContext();
//            DataSource dataSource = (DataSource) initialContext.lookup("java:comp/env/jdbc/pos");
//            System.out.println(dataSource);
//            this.connection = dataSource.getConnection();
//
//            System.out.println(connection);
//        } catch (NamingException | SQLException e) {
//            throw new RuntimeException(e);
//        }
//
//    }
//
//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//
//        if (req.getContentType() == null ||
//                !req.getContentType().toLowerCase().startsWith("application/json")) {
//            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
//        } else {
//
//            Jsonb jsonb = JsonbBuilder.create();
//            var customerDTO = jsonb.fromJson(req.getReader(), CustomerDTO.class);
//            System.out.println(customerDTO);
//            var dbProcess = new DBProcess();
//            dbProcess.saveCustomer(customerDTO, connection);
//        }
//
//
//    }
//}
