import React, {useEffect, useState} from "react";
import {apiGet} from "../utils/api";

const StatisticsIndex = () => {

const [invoiceStatistics, setInvoiceStatistics] = useState({});
const [personStatistics, setPersonStatistics] = useState([]);


useEffect(() => {
    apiGet("/api/invoices/statistics").then((data) => 
        setInvoiceStatistics(data));
    
    apiGet("/api/persons/statistics").then((data) =>
        setPersonStatistics(data));
    
    }, []);

    return(
        <div>
            <h1>Obecné statistiky</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Fakturace za letošní rok</th>
                        <th>Fakturace za všechny roky</th>
                        <th>Počet faktur v databázi</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                        <td>{invoiceStatistics.currentYearSum},-</td>
                        <td>{invoiceStatistics.allTimeSum},-</td>
                        <td>{invoiceStatistics.invoicesCount}</td>
                    </tr>
                </tbody>
            </table>
            <h1>Statistiky pro jednotlivé společnosti</h1>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Společnost</th>
                        <th>Fakturované příjmy</th>
                    </tr>
                </thead>
                <tbody>
                    {personStatistics.map((person) => (
                    <tr key={person.personId}>
                        <td>{person.personName}</td>
                        <td>{person.revenue},-</td>
                    </tr>
                    ))}    
                </tbody>
            </table>
        </div>
    );
};
export default StatisticsIndex;