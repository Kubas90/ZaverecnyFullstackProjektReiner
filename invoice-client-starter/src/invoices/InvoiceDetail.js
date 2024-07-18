import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import dateStringFormatter from "../utils/dateStringFormatter";

import {apiGet} from "../utils/api";

const InvoiceDetail = () => {
    const {id} = useParams();
    const [invoice, setInvoice] = useState({});

    useEffect(() => {
        apiGet("/api/invoices/" + id).then((data) => setInvoice(data));

    },[id]);

    

    return(
        <div className="row">
                <h1>Detail faktury</h1>
                <hr/>
                <h5>Číslo faktury: {invoice.invoiceNumber}</h5>
            <div className="col">
                <strong>Dodavatel:</strong>
                <p>
                {invoice.seller?.name}
                </p>
                <p>IČ: {invoice.seller?.identificationNumber}
                </p>
                <p>DIČ: {invoice.seller?.taxNumber}</p>
                <p>Číslo účtu: {invoice.seller?.accountNumber}/{invoice.seller?.bankCode}</p>
                <p>IBAN: {invoice.seller?.iban}</p>
                <p>Telefon: {invoice.seller?.telephone}</p>
                <p>Email: {invoice.seller?.mail}</p>
                <p>Sídlo: {invoice.seller?.street}, {invoice.seller?.zip}, {invoice.seller?.city}</p>
                <p>Země: {invoice.seller?.country}</p>
                <p>Poznámka: {invoice.seller?.note}</p>
            </div>
            <div className="col">
                <strong>Odběratel:</strong>
                <p>{invoice.buyer?.name}</p>
                <p>IČ: {invoice.buyer?.identificationNumber}</p>
                <p>DIČ: {invoice.buyer?.taxNumber}</p>
                <p>Číslo účtu: {invoice.buyer?.accountNumber}/{invoice.buyer?.bankCode}</p>
                <p>IBAN: {invoice.buyer?.iban}</p>
                <p>Telefon: {invoice.buyer?.telephone}</p>
                <p>Email: {invoice.buyer?.mail}</p>
                <p>Sídlo: {invoice.buyer?.street}, {invoice.buyer?.zip}, {invoice.buyer?.city}</p>
                <p>Země: {invoice.buyer?.country}</p>
                <p>Poznámka: {invoice.buyer?.note}</p>
            </div>
            <div className="row">
                <strong>Vystaveno: {invoice.issued}</strong>
                <strong>Splatnost: {invoice.dueDate}</strong>
                <strong>Produkt: </strong>
                <p>{invoice.product}</p>
                <strong>Popis:</strong><p>{invoice.note}</p>
                <strong>Cena:</strong>
                <p>{invoice.price} CZK</p>
                <strong>DPH:</strong>
                <p>{invoice.vat}%</p>
                
            </div>
        </div>
    );
};
export default InvoiceDetail;