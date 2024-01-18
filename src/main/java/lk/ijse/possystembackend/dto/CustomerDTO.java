package lk.ijse.possystembackend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CustomerDTO {

    private String c_id;
    private String c_name;
    private String c_address;
    private String c_contact;
}
