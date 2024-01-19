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

    private static final String SAVE_CUSTOMER = "INSERT INTO customer(c_id,c_name,c_address,c_contact) VALUES(?,?,?,?)";
    private static final String GET_ALL_CUSTOMER = "SELECT * FROM customer";
    private static final String GET_CUSTOMER = "SELECT * FROM customer WHERE c_id = ?";
    private static final String UPDATE_CUSTOMER = "UPDATE customer SET c_name=?, c_address=?, c_contact=? WHERE c_id=?";
    private static final String DELETE_CUSTOMER = "DELETE FROM customer WHERE c_id = ?";

    public void saveCustomer(CustomerDTO customerDTO, Connection connection) {

        try {
            PreparedStatement ps = connection.prepareStatement(SAVE_CUSTOMER);
            ps.setString(1, customerDTO.getC_id());
            ps.setString(2, customerDTO.getC_name());
            ps.setString(3, customerDTO.getC_address());
            ps.setString(4, customerDTO.getC_contact());

            if (ps.executeUpdate() != 0) {
                logger.info("customer saved successfully");
                System.out.println("Data saved");
            } else {
                logger.info("customer saving failed");
                System.out.println("Failed to save");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


    }

    public CustomerDTO getCustomer(String id ,Connection connection) throws Exception {
        PreparedStatement ps = connection.prepareStatement(GET_CUSTOMER);

        ps.setString(1 , id);

        ResultSet rs = ps.executeQuery();

        if (rs.next()){
            return new CustomerDTO(
                    rs.getString(1),
                    rs.getString(2),
                    rs.getString(3),
                    rs.getString(4)
            );
        }

        throw new Exception();

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
                        resultSet.getString(3),
                        resultSet.getString(4)

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

            System.out.println(customerDTO.getC_name());
            System.out.println(customerDTO.getC_address());
            System.out.println(customerDTO.getC_contact());
            System.out.println(customerDTO.getC_id());

            ps.setString(1, customerDTO.getC_name());
            ps.setString(2, customerDTO.getC_address());
            ps.setString(3, customerDTO.getC_contact());
            ps.setString(4, customerDTO.getC_id());

            if (ps.executeUpdate() != 0) {
                logger.info("customer updated successfully");
                System.out.println("Data updated");
            } else {
                logger.info("customer updating failed");
                System.out.println("Failed to update");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteCustomer(String c_id, Connection connection) {

        System.out.println("######## delete customer");


//
//        try {
//            PreparedStatement ps = connection.prepareStatement(DELETE_CUSTOMER);
//            ps.setString(1, customerDTO.getC_id());
//
//            if (ps.executeUpdate() != 0) {
//                logger.info("customer deleted successfully");
//                System.out.println("Data deleted");
//            } else {
//                logger.info("customer deleting failed");
//                System.out.println("Failed to delete");
//            }
//
//        } catch (SQLException e) {
//            throw new RuntimeException(e);
//        }

        try {
            PreparedStatement ps = connection.prepareStatement(DELETE_CUSTOMER);
            ps.setString(1, c_id);

            int rowsAffected = ps.executeUpdate();

            if (rowsAffected > 0) {
                logger.info("Customer deleted successfully");
                System.out.println("Data deleted");
            } else {
                logger.info("Customer deleting failed");
                System.out.println("Failed to delete");
            }

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    }

