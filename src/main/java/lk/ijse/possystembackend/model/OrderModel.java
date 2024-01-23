package lk.ijse.possystembackend.model;

import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.possystembackend.dto.CustomerDTO;
import lk.ijse.possystembackend.dto.ItemsDTO;
import lk.ijse.possystembackend.dto.OrderDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class OrderModel {

    private static final Logger logger = LoggerFactory.getLogger(ItemsModel.class);
    private static final String SAVE_ORDER = "INSERT INTO orders (o_id, o_date, c_id, o_items, discount, amount) VALUES (?, ?, ?, ?, ?, ?)";
    private static final String SAVE_ITEMS = "INSERT INTO orders_items (o_id, i_id, i_name, i_price, qty) VALUES (?, ?, ?, ?, ?)";
    private static final String GET_ALL_ORDERS = "SELECT * FROM orders";
    private static final String GET_ORDER_ITEMS ="SELECT * FROM orders_items WHERE o_id = ?";

    public boolean saveOrder(OrderDTO orderDTO, Connection connection, HttpServletResponse resp) throws IOException {
        System.out.println("order saved");

        try {
            // Save order details
            try (PreparedStatement psOrder = connection.prepareStatement(SAVE_ORDER)) {
                psOrder.setString(1, orderDTO.getO_id());
                psOrder.setString(2, orderDTO.getO_date());
                psOrder.setString(3, orderDTO.getC_id());
                psOrder.setString(4, orderDTO.getO_items());
                psOrder.setString(5, String.valueOf(orderDTO.getDiscount()));
                psOrder.setString(6, String.valueOf(orderDTO.getAmount()));

                if (psOrder.executeUpdate() != 0) {
                    logger.info("Order saved successfully");
                    System.out.println("Data saved");

                    // Save items
                    ItemsDTO[] itemsDTOArray = orderDTO.getItemsDTO();

                    System.out.println("order_items save point");

                    if (itemsDTOArray != null && itemsDTOArray.length > 0) {
                        try (PreparedStatement psItems = connection.prepareStatement(SAVE_ITEMS)) {
                            for (ItemsDTO item : itemsDTOArray) {
                                System.out.println(item.getI_id());
                                System.out.println(item.getI_name());
                                System.out.println(orderDTO.getO_id());

                                psItems.setString(1, orderDTO.getO_id());
                                psItems.setString(2, item.getI_id());
                                psItems.setString(3, item.getI_name());
                                // Add appropriate values for i_price and qty based on your requirements
                                psItems.setBigDecimal(4, BigDecimal.valueOf(item.getI_price()));
                                psItems.setInt(5, item.getI_qty());

                                psItems.executeUpdate();
                            }
                        }
                    }

                    return true;
                } else {
                    logger.info("Order saving failed");
                    System.out.println("Failed to save");
                    return false;
                }
            }
        } catch (SQLException e) {
            logger.error("Error saving order: {}", e.getMessage(), e);
            resp.getWriter().write("Error saving order. Please check the logs for details.");
            throw new RuntimeException(e);
        }
    }

    public List<OrderDTO> getAllOrders(Connection connection) {
        List<OrderDTO> orderDTOs = new ArrayList<>();

        try {
            PreparedStatement ps = connection.prepareStatement(GET_ALL_ORDERS);
            ResultSet resultSet = ps.executeQuery();


            while (resultSet.next()) {

                orderDTOs.add(new OrderDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3),
                        resultSet.getString(4),
                        resultSet.getDouble(5),
                        resultSet.getDouble(6)
                ));

            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return orderDTOs;
    }



}
