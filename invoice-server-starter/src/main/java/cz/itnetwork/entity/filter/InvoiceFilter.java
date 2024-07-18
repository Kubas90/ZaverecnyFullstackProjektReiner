package cz.itnetwork.entity.filter;

import lombok.Data;
//"Přepravka" pro filtr faktur
@Data
public class InvoiceFilter {
    private Long buyerID;
    private Long sellerID;
    private String product;
    private Integer minPrice;
    private Integer maxPrice;
    private Integer limit = 5;
}
