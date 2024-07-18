package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.InvoiceStatisticsDTO;
import cz.itnetwork.dto.mapper.InvoiceMapper;
import cz.itnetwork.dto.mapper.PersonMapper;
import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import cz.itnetwork.entity.repository.InvoiceRepository;
import cz.itnetwork.entity.repository.specification.InvoiceSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

//Implementace metod pro faktury
@Service
public class InvoiceServiceImpl implements InvoiceService {
    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private InvoiceMapper invoiceMapper;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private PersonService personService;

    @Override
    public InvoiceDTO addInvoice(InvoiceDTO invoiceDTO) {
        InvoiceEntity entity = invoiceMapper.toEntity(invoiceDTO);
        entity = invoiceRepository.save(entity);
        InvoiceDTO returnDTO = invoiceMapper.toDTO(entity);

        Long buyerId = invoiceDTO.getBuyer().getId();
        PersonDTO buyerById = personService.getPersonById(buyerId);
        returnDTO.setBuyer(buyerById);

        Long sellerId = invoiceDTO.getSeller().getId();
        PersonDTO sellerById = personService.getPersonById(sellerId);
        returnDTO.setSeller(sellerById);

        return returnDTO;
    }

    @Override
    public List<InvoiceDTO> getAll(InvoiceFilter invoiceFilter) {
        InvoiceSpecification invoiceSpecification = new InvoiceSpecification(invoiceFilter);
        return invoiceRepository.findAll(invoiceSpecification, PageRequest.of(0, invoiceFilter.getLimit()))
                .stream()
                .map(invoiceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InvoiceDTO getInvoiceById(Long id) {
        InvoiceEntity invoiceEntity = fetchInvoiceById(id);
        return invoiceMapper.toDTO(invoiceEntity);
    }

    @Override
    public InvoiceDTO removeInvoice(Long id) {
        InvoiceEntity invoice = invoiceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        InvoiceDTO model = invoiceMapper.toDTO(invoice);
        invoiceRepository.delete(invoice);
        return model;
    }


    @Override
    public InvoiceDTO editInvoice(InvoiceDTO invoiceDTO, Long id) {
        InvoiceEntity fetchedInvoice = fetchInvoiceById(id);

        Long buyerId = invoiceDTO.getBuyer().getId();
        PersonDTO buyerById = personService.getPersonById(buyerId);
        fetchedInvoice.setBuyer(personMapper.toEntity(buyerById));

        Long sellerId = invoiceDTO.getSeller().getId();
        PersonDTO sellerById = personService.getPersonById(sellerId);
        fetchedInvoice.setSeller(personMapper.toEntity(sellerById));

        invoiceMapper.updateInvoiceEntity(invoiceDTO, fetchedInvoice);
        InvoiceEntity savedInvoice = invoiceRepository.save(fetchedInvoice);
        return invoiceMapper.toDTO(savedInvoice);
    }
// Pomocná metoda, natažení faktur dle ID

    private InvoiceEntity fetchInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Invoice with id " + id + " wasn't found in the database."));
    }

    public InvoiceStatisticsDTO getInvoiceStatistics() {
        int currentYear = LocalDate.now().getYear();
        long currentYearSum = invoiceRepository.getCurrentYearSum(currentYear);
        long allTimeSum = invoiceRepository.getAllTimeSum();
        long invoicesCount = invoiceRepository.getInvoicesCount();

        return new InvoiceStatisticsDTO(currentYearSum, allTimeSum, invoicesCount);
    }

}



