package lk.ijse.possystembackend.model;

import lk.ijse.possystembackend.dto.CustomerDTO;
import lk.ijse.possystembackend.dto.ItemsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class ItemsModel {

    static final Logger logger = LoggerFactory.getLogger(ItemsModel.class);
    private static final String SAVE_ITEMS = "INSERT INTO items(i_id,i_name,i_qty,i_price) VALUES(?,?,?,?)";
    private static final String GET_ALL_ITEMS = "SELECT * FROM items";
    private static final String UPDATE_ITEMS = "UPDATE items SET i_name=?,i_qty=?,i_price=? WHERE i_id=?";
    private static final String DELETE_ITEMS = "DELETE FROM items WHERE i_id = ?";


    public void saveItems(ItemsDTO itemsDTO, Connection connection) {

        try {
            PreparedStatement ps = connection.prepareStatement(SAVE_ITEMS);
            ps.setString(1, itemsDTO.getI_id());
            ps.setString(2, itemsDTO.getI_name());
            ps.setString(3, String.valueOf(itemsDTO.getI_qty()));
            ps.setString(4, String.valueOf(itemsDTO.getI_price()));

            if (ps.executeUpdate() != 0) {
                logger.info("Item saved successfully");
                System.out.println("Data saved");
            } else {
                logger.info("Item saving failed");
                System.out.println("Failed to save");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }

    public List<ItemsDTO> getAllItems(Connection connection) {
        List<ItemsDTO> itemsDTOs = new ArrayList<>();

        try {
            PreparedStatement ps = connection.prepareStatement(GET_ALL_ITEMS);
            ResultSet resultSet = ps.executeQuery();


            while (resultSet.next()) {

                itemsDTOs.add(new ItemsDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getInt(3),
                        resultSet.getDouble(4)

                ));

            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return itemsDTOs;
    }


    public void updateItems(ItemsDTO itemsDTO, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_ITEMS);
            ps.setString(1, itemsDTO.getI_name());
            ps.setString(2, String.valueOf(itemsDTO.getI_qty()));
            ps.setString(3, String.valueOf(itemsDTO.getI_price()));
            ps.setString(4, itemsDTO.getI_id());

            if (ps.executeUpdate() != 0) {
                logger.info("Item updated successfully");
                System.out.println("Data updated");
            } else {
                logger.info("Item updating failed");
                System.out.println("Failed to update");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteItems(ItemsDTO itemsDTO, Connection connection) {

        System.out.println("######## delete customer");

        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_ITEMS);
            ps.setString(1, itemsDTO.getI_id());

            if (ps.executeUpdate() != 0) {
                logger.info("Item deleted successfully");
                System.out.println("Data deleted");
            } else {
                logger.info("Item deleting failed");
                System.out.println("Failed to delete");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }




}
