package lk.ijse.possystembackend.model;

import lk.ijse.possystembackend.dto.CustomerDTO;
import lk.ijse.possystembackend.dto.ItemsDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class ItemsModel {

    static final Logger logger = LoggerFactory.getLogger(CustomerModel.class);
    private static final String SAVE_ITEMS = "INSERT INTO items(id,name,price) VALUES(?,?,?)";


    public void saveItems(ItemsDTO itemsDTO, Connection connection) {

        try {
            PreparedStatement ps = connection.prepareStatement(SAVE_ITEMS);
            ps.setString(1, itemsDTO.getId());
            ps.setString(2, itemsDTO.getName());
            ps.setString(3, String.valueOf(itemsDTO.getPrice()));

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

}
