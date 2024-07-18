package cz.itnetwork.controller;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Kontroler pro faktury
@RestController
@RequestMapping("/api")
public class InvoiceController {
    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping("/invoices")
    public InvoiceDTO addInvoice(@RequestBody InvoiceDTO invoiceDTO) {
        return invoiceService.addInvoice(invoiceDTO);
    }

    @GetMapping("/invoices")
    public List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        return invoiceService.getAll(invoiceFilter);
    }

    @GetMapping("/invoices/{invoiceId}")
    public InvoiceDTO getInvoice(@PathVariable Long invoiceId) {
        return invoiceService.getInvoiceById(invoiceId);
    }

    @DeleteMapping("/invoices/{invoiceId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public InvoiceDTO deleteInvoice(@PathVariable Long invoiceId) {
        return invoiceService.removeInvoice(invoiceId);
    }

    @PutMapping("/invoices/{invoiceId}")
    public InvoiceDTO editInvoice(@RequestBody InvoiceDTO invoiceDTO,
                                  @PathVariable long invoiceId) {
        return invoiceService.editInvoice(invoiceDTO,invoiceId);
    }
    @GetMapping("/invoices/statistics")
    public InvoiceStatisticsDTO getInvoiceStatistics(){
        InvoiceStatisticsDTO statistics = invoiceService.getInvoiceStatistics();
        return statistics;
    }

}







