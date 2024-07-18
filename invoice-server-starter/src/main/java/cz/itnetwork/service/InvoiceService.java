package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.entity.filter.InvoiceFilter;

import java.util.List;

//Interface pro metody faktur  databázi
public interface InvoiceService {

    InvoiceDTO addInvoice(InvoiceDTO invoiceDTO);

    List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter);

    InvoiceDTO getInvoiceById(Long id);

    InvoiceDTO removeInvoice(Long id);

    InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, Long id);

    InvoiceStatisticsDTO getInvoiceStatistics();

}
