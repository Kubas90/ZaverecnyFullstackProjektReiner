package cz.itnetwork.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//"Přepravka" pro statistiky faktur
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceStatisticsDTO {
    private long currentYearSum;
    private long allTimeSum;
    private long invoicesCount;
}
