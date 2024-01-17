package lk.ijse.possystembackend.model;

import lk.ijse.possystembackend.dto.CustomerDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CustomerModel {

    static final Logger logger = LoggerFactory.getLogger(CustomerModel.class);
    private static final String SAVE_CUSTOMER = "INSERT INTO customer(id,name,address) VALUES(?,?,?)";
    private static final String GET_ALL_CUSTOMER = "SELECT * FROM customer";
    private static final String UPDATE_CUSTOMER = "UPDATE customer SET name=?,address=? WHERE id=?;";
    private static final String DELETE_CUSTOMER = "DELETE FROM customer WHERE id = ?";



    public void saveCustomer(CustomerDTO customerDTO, Connection connection) {

        try {
            PreparedStatement ps = connection.prepareStatement(SAVE_CUSTOMER);
            ps.setString(1, customerDTO.getId());
            ps.setString(2, customerDTO.getName());
            ps.setString(3, customerDTO.getAddress());

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

    public List<CustomerDTO> getAllCustomer(Connection connection) {
        List<CustomerDTO> customerDTOs = new ArrayList<>();

        try {
            PreparedStatement ps = connection.prepareStatement(GET_ALL_CUSTOMER);
            ResultSet resultSet = ps.executeQuery();


            while (resultSet.next()) {

                customerDTOs.add(new CustomerDTO(
                        resultSet.getString(1),
                        resultSet.getString(2),
                        resultSet.getString(3)

                ));

            }


        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return customerDTOs;
    }


    public void updateCustomer(CustomerDTO customerDTO, Connection connection) {
        try {
            PreparedStatement ps = connection.prepareStatement(UPDATE_CUSTOMER);
            ps.setString(1, customerDTO.getName());
            ps.setString(2, customerDTO.getAddress());
            ps.setString(3, customerDTO.getId());

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

    public void deleteCustomer(CustomerDTO customerDTO, Connection connection) {

        System.out.println("######## delete customer");

        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_CUSTOMER);
            ps.setString(1, customerDTO.getId());

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
