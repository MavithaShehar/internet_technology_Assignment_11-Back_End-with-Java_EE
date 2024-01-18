package lk.ijse.possystembackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ItemsDTO {

    private String i_id;
    private String i_name;
    private int i_qty;
    private double i_price;

}