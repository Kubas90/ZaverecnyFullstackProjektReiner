package cz.itnetwork.service;

import cz.itnetwork.dto.InvoiceDTO;
import cz.itnetwork.dto.PersonDTO;
import cz.itnetwork.dto.PersonStatisticsDTO;

import java.util.List;

//Interface pro metody osob v databázi
public interface PersonService {

    PersonDTO addPerson(PersonDTO personDTO);

    /**
     * <p>Sets hidden flag to true for the person with the matching [id]</p>
     * <p>In case a person with the passed [id] isn't found, the method <b>silently fails</b></p>
     *
     * @param id Person to delete
     */
    void removePerson(long id);

    /**
     * Fetches all non-hidden persons
     *
     * @return List of all non-hidden persons
     */
    List<PersonDTO> getAll();

    PersonDTO getPersonById(long id);

    PersonDTO editPerson(long personId, PersonDTO person);

    List<InvoiceDTO> getAllSellersByIdentificationNumber(String identificationNumber);

    List<InvoiceDTO> getAllBuyersByIdentificationNumber(String identificationNumber);

    List<PersonStatisticsDTO> getPersonStatistics();
}

