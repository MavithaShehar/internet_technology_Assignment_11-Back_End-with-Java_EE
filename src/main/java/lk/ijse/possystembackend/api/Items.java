package lk.ijse.possystembackend.api;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.possystembackend.dto.CustomerDTO;
import lk.ijse.possystembackend.dto.ItemsDTO;
import lk.ijse.possystembackend.model.CustomerModel;
import lk.ijse.possystembackend.model.ItemsModel;
import lombok.var;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "items",urlPatterns = "/items",
        initParams = {
                @WebInitParam(name = "dto-user",value = "root"),
                @WebInitParam(name = "dto-pw",value = "1234"),
                @WebInitParam(name = "dto-url",value = "jdbc:mysql://localhost:3306/test"),
                @WebInitParam(name = "dto-class",value = "com.mysql.cj.jdbc.Driver")

        }

)
public class Items  extends HttpServlet {


    Connection connection;

    @Override
    public void init() throws ServletException {

        try {
            InitialContext initialContext = new InitialContext();
            DataSource dataSource = (DataSource) initialContext.lookup("java:comp/env/jdbc/pos");
            System.out.println(dataSource);
            this.connection = dataSource.getConnection();

            System.out.println(connection);
        } catch (NamingException | SQLException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post");
        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {

            Jsonb jsonb = JsonbBuilder.create();
            ItemsDTO itemsDTO = jsonb.fromJson(req.getReader(), ItemsDTO.class);
            System.out.println(itemsDTO);
            ItemsModel dbProcess = new ItemsModel();
            dbProcess.saveItems(itemsDTO, connection);
        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("do get");

        var writer = resp.getWriter();
        resp.setContentType("text/html");
        var data = new ItemsModel();
        List<ItemsDTO> getData = data.getAllItems(connection);

        Jsonb jsonb = JsonbBuilder.create();
        String json = jsonb.toJson(getData);
        writer.write(json);
        writer.close();


    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {

            Jsonb jsonb = JsonbBuilder.create();
            var itemsDTO = jsonb.fromJson(req.getReader(), ItemsDTO.class);
            System.out.println(itemsDTO);
            var dbProcess = new ItemsModel();
            dbProcess.updateItems(itemsDTO, connection);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        System.out.println("***** do delete");

        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {

            Jsonb jsonb = JsonbBuilder.create();
            var itemsDTO = jsonb.fromJson(req.getReader(), ItemsDTO.class);
            System.out.println(itemsDTO);
            var dbProcess = new ItemsModel();
            dbProcess.deleteItems(itemsDTO, connection);
        }
    }



}
