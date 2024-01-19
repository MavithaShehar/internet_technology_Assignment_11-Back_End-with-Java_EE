package lk.ijse.possystembackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data

public class OrderDTO {

    private String o_id ;
    private String o_date ;
    private String c_id ;
    private String o_items = "click";
    private double discount;
    private double amount;

    private OrderItemsDTO[] itemsDTO;


}
