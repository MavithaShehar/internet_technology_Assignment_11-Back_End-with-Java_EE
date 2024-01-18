package lk.ijse.possystembackend.model;

import lk.ijse.possystembackend.dto.OrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class OrderModel {

    static final Logger logger = LoggerFactory.getLogger(ItemsModel.class);
    private static final String SAVE_ORDER = "INSERT INTO orders (o_id, o_date, c_id, o_items, discount, amount) VALUES (?, ?, ?, ?, ?, ?)";

    public boolean saveOrder(OrderDTO orderDTO, Connection connection) {

        try {
            PreparedStatement ps = connection.prepareStatement(SAVE_ORDER);
            ps.setString(1, orderDTO.getO_id());
            ps.setString(2, orderDTO.getO_date());
            ps.setString(3, orderDTO.getC_id());
            ps.setString(4, orderDTO.getO_items());
            ps.setString(5, String.valueOf(orderDTO.getDiscount())) ;
            ps.setString(6, String.valueOf(orderDTO.getAmount()));

            if (ps.executeUpdate() != 0) {
                logger.info("Order saved successfully");
                System.out.println("Data saved");
                return true;
            } else {
                logger.info("Order saving failed");
                System.out.println("Failed to save");
                return false;
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

    }

}
