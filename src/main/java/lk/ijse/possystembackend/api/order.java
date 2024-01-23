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
import lk.ijse.possystembackend.dto.OrderDTO;
import lk.ijse.possystembackend.model.CustomerModel;
import lk.ijse.possystembackend.model.OrderModel;
import lombok.var;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

@WebServlet(name = "order",urlPatterns = "/order",
        initParams = {
                @WebInitParam(name = "dto-user",value = "root"),
                @WebInitParam(name = "dto-pw",value = "1234"),
                @WebInitParam(name = "dto-url",value = "jdbc:mysql://localhost:3306/pos_system"),
                @WebInitParam(name = "dto-class",value = "com.mysql.cj.jdbc.Driver")

        }

)

public class order extends HttpServlet {

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

        if (req.getContentType() == null ||
                !req.getContentType().toLowerCase().startsWith("application/json")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
        } else {

            Jsonb jsonb = JsonbBuilder.create();
            var orderDTO = jsonb.fromJson(req.getReader(), OrderDTO.class);
            System.out.println(orderDTO);
            var dbProcess = new OrderModel();
            dbProcess.saveOrder(orderDTO,connection,resp);

            //   var transaction = new Transaction();

            //    transaction.orderTransaction(orderDTO, connection);
        }
    }


    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setContentType("application/json");

        String o_id = req.getParameter("o_id");

        Jsonb jsonb = JsonbBuilder.create();
        OrderModel data = new OrderModel();

        System.out.println("order id is + "+ o_id);

        if (o_id == null) {

            List<OrderDTO> getData = data.getAllOrders(connection);

            String json = jsonb.toJson(getData);
            System.out.println(resp.getContentType()+"///////////////////////////////////////////////");
            resp.getWriter().write(json);

        }

    }
}
