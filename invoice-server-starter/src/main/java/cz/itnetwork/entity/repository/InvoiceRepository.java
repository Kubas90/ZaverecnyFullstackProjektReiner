package cz.itnetwork.entity.repository;

import cz.itnetwork.entity.InvoiceEntity;
import cz.itnetwork.entity.filter.InvoiceFilter;
import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

//Třída pro práci v databázi faktur

public interface InvoiceRepository extends JpaSpecificationExecutor<InvoiceEntity>, JpaRepository<InvoiceEntity, Long> {
    @Query(value = "SELECT  COALESCE(SUM(i.price), 0) FROM invoice i WHERE YEAR(i.issued) = :year")
    Long getCurrentYearSum(@Param("year") int year);

    @Query(value = "SELECT  COALESCE(SUM(i.price), 0) FROM invoice i")
    Long getAllTimeSum();

    @Query(value = "SELECT  COUNT(i) FROM invoice i")
    Long getInvoicesCount();

}
