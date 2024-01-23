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

    private ItemsDTO[] itemsDTO;


    public OrderDTO(String string, String string1, String string2, String string3, double aDouble, double aDouble1) {

        this.o_id = string;
        this.o_date = string1;
        this.c_id = string2;
        this.o_items = string3;
        this.discount = aDouble;
        this.amount = aDouble1;

    }
}
