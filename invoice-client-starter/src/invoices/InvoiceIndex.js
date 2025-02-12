import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [personList, setPersonList] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [filterState, setFilter] = useState({
        sellerID: undefined,
        buyerID: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        product: undefined,
        limit: undefined,
    });

    const deleteInvoice = async (id) => {
        try {
            await apiDelete("/api/invoices/" + id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setInvoices(invoices.filter((item) => item._id !== id));
    };

    const handleChange = (e) => {
        if (e.target.value === "false" || e.target.value === "true" || e.target.value === '') {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: undefined }
            });
        } else {
            setFilter(prevState => {
                return { ...prevState, [e.target.name]: e.target.value }
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = filterState;

        const data = await apiGet("/api/invoices", params);
        setInvoices(data);
    };

    useEffect(() => {
        apiGet("/api/invoices")
            .then((data) => setInvoices(data));
        apiGet("/api/persons")
            .then((data) => setPersonList(data));

    }, []);


    return (
        <div>
            <h1>Seznam faktur</h1>
            <hr />
            <InvoiceFilter
                personList={personList}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                filter={filterState}
                confirm="Filtrovat faktury"
                />
            <hr />
            <InvoiceTable
                deleteInvoice={deleteInvoice}
                items={invoices}
                label="Počet faktur:" />
        </div>
    );
};
export default InvoiceIndex;