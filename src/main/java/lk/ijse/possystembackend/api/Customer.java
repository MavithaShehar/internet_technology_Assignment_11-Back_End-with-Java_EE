package lk.ijse.possystembackend.api;

import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebInitParam;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.possystembackend.model.CustomerModel;
import lk.ijse.possystembackend.dto.CustomerDTO;
import lombok.var;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "customer",urlPatterns = "/customer",
        initParams = {
                @WebInitParam(name = "dto-user",value = "root"),
                @WebInitParam(name = "dto-pw",value = "1234"),
                @WebInitParam(name = "dto-url",value = "jdbc:mysql://localhost:3306/pos_system"),
                @WebInitParam(name = "dto-class",value = "com.mysql.cj.jdbc.Driver")

        }

)

public class Customer extends HttpServlet {

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
            resp.setContentType("application/json");

            Jsonb jsonb = JsonbBuilder.create();
            CustomerDTO customerDTO = jsonb.fromJson(req.getReader(), CustomerDTO.class);
            System.out.println(customerDTO);
            CustomerModel dbProcess = new CustomerModel();
            dbProcess.saveCustomer(customerDTO, connection);

            resp.getWriter().write(jsonb.toJson(customerDTO));

        }

    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("do get");

        resp.setContentType("application/json");

        String c_id = req.getParameter("c_id");

        Jsonb jsonb = JsonbBuilder.create();
        CustomerModel data = new CustomerModel();

        if (c_id == null) {

            List<CustomerDTO> getData = data.getAllCustomer(connection);

            String json = jsonb.toJson(getData);
            System.out.println(resp.getContentType()+"///////////////////////////////////////////////");
            resp.getWriter().write(json);

        } else {
            try {
                CustomerDTO customer = data.getCustomer(c_id, connection);

                resp.getWriter().write(jsonb.toJson(customer));

            } catch (Exception e) {
                e.printStackTrace();
            }

        }


    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {

            resp.setContentType("application/json");

            Jsonb jsonb = JsonbBuilder.create();
            var customerDTO = jsonb.fromJson(req.getReader(), CustomerDTO.class);
            System.out.println(customerDTO);
            var dbProcess = new CustomerModel();
            dbProcess.updateCustomer(customerDTO, connection);

            resp.getWriter().write(jsonb.toJson(customerDTO));

        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

//        System.out.println("***** do delete");
//
//        if (req.getContentType() == null ||
//                !req.getContentType().toLowerCase().startsWith("application/json")) {
//            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
//        } else {
//
//            resp.setContentType("application/json");
//
//            Jsonb jsonb = JsonbBuilder.create();
//            var customerDTO = jsonb.fromJson(req.getReader(), CustomerDTO.class);
//            System.out.println(customerDTO);
//            var dbProcess = new CustomerModel();
//
//            dbProcess.deleteCustomer(customerDTO, connection);
//
//            resp.getWriter().write(jsonb.toJson(customerDTO));
//
//        }


            System.out.println("***** do delete");

            resp.setContentType("application/json");

            System.out.println("hello delete");
            var dbProcess = new CustomerModel();

            // Retrieve the 'id' parameter from the request
            String c_id = req.getParameter("c_id");

            System.out.println(c_id);

            dbProcess.deleteCustomer(c_id, connection);

            // Send a success response
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.getWriter().write("Data deleted successfully");

            }

}
