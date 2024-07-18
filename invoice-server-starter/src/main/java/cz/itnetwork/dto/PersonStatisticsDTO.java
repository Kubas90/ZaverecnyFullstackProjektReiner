package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//"Přepravka" pro statistiku osob
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PersonStatisticsDTO {
    private Long personId;
    private String personName;
    private Long revenue;
}
