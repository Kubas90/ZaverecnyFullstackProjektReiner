import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import {apiGet, apiPost, apiPut} from "../utils/api";

import InputField from "../components/InputField";
import InputSelect from"../components/InputSelect";
import FlashMessage from "../components/FlashMessage";
import InputCheck from "../components/InputCheck";

const InvoiceForm = () =>{
    const navigate = useNavigate();
    const {id} = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        buyer: {_id: ""},
        seller: {_id: ""},
        issued: "",
        dueDate: "",
        product: "",
        price: "",
        vat: "",
        note: "",
    });
    const [personList,setPersonList] = useState([]);
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);

    useEffect(() =>{
        if(id) {
            apiGet("/api/invoices/" + id).then((data) => setInvoice(data));
        }
        apiGet("/api/persons").then((data) => setPersonList(data));
        
    },[id]);

    const handleSubmit = (e) =>{
        e.preventDefault();

        (id ? apiPut("/api/invoices/" + id, invoice) :apiPost("/api/invoices", invoice))
        .then((data) => {
            setSent(true);
            setSuccess(true);
            navigate("/invoices");
        })
        .catch((error) => {
            console.log(error.message);
            setError(error.message);
            setSent(true);
            setSuccess(false);
        });
    };

    const sent = sentState;
    const success = successState;
    return (
        <div>
            <h1>{id ? "Upravit" : "Vytvořit"} fakturu</h1>
            <hr/>
            {errorState ? (
                <div className="alert alert-danger">
                    {errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                theme={success ? " success" : ""}
                text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                required={true}
                type="text"
                name="invoiceNumber"
                min="4"
                label="Číslo faktury"
                prompt="Zadejte číslo"
                value={invoice.invoiceNumber}
                handleChange={(e) => {
                    setInvoice({...invoice, invoiceNumber: e.target.value});
                }}
                />
                <InputSelect
                    required={true}
                    name="seller"
                    items={personList}
                    label="Dodavatel"
                    prompt="Vyberte dodavatele"
                    value={invoice.seller._id}
                    handleChange={(e) =>{
                        setInvoice({...invoice,seller: {_id: e.target.value}});
                    }}
                    />
                <InputSelect
                    required={true}
                    name="buyer"
                    items={personList}
                    label="Odběratel"
                    prompt="Vyberte odběratele"
                    value={invoice.buyer._id}
                    handleChange={(e) => {
                        setInvoice({...invoice,buyer: {_id: e.target.value}});
                    }}
                    />
                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení"
                    min="0000-01-01"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({...invoice, issued: e.target.value});
                    }}
                    />
                    <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    min="0000-01-01"
                    value={invoice.dueDate}
                    handleChange={(e) =>{
                        setInvoice({...invoice, dueDate: e.target.value});
                    }}
                    />
                    <InputField
                    required={true}
                    type="text"
                    name="product"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    min="3"
                    value={invoice.product}
                    handleChange={(e) =>{
                        setInvoice({...invoice, product: e.target.value});
                    }}
                    />
                    <InputField
                    required={true}
                    type="number"
                    name="price"
                    label="Cena"
                    prompt="Zadejte cenu produktu"
                    min="0" 
                    value={invoice.price}
                    handleChange={(e) =>{
                        setInvoice({...invoice, price: e.target.value});
                    }}
                    />
                    <InputField
                    required={true}
                    type="number"
                    name="vat"
                    label="DPH"
                    prompt="Zadejte DPH"
                    min="0"
                    value={invoice.vat}
                    handleChange={(e) =>{
                        setInvoice({...invoice, vat: e.target.value});
                    }}
                    />
                    <InputField
                    required={true}
                    type="textArea"
                    name="note"
                    label="Popis"
                    prompt="Zadejte popis zboží"
                    min="0"
                    value={invoice.note}
                    handleChange={(e) =>{
                        setInvoice({...invoice, note: e.target.value});
                    }}
                    />
                    <input type="submit" className="btn btn-primary" value="Uložit" />

            </form>
        </div>
    )

};
export default InvoiceForm;