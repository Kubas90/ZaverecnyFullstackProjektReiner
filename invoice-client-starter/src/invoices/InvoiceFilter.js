import React from "react";
import InputSelect from "../components/InputSelect";
import InputField from "../components/InputField";

const InvoiceFilter = (props) =>{
    const handleChange = (e) =>{
        props.handleChange(e);
    };
    const handleSubmit = (e) =>{
        props.handleSubmit(e);
    };
    const filter = props.filter;
    

    return(
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <InputSelect
                        name="sellerID"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Dodavatel"
                        prompt="nevybrán"
                        value={filter.sellerID}
                        />
                </div>
                <div className="col">
                    <InputSelect
                        name="buyerID"
                        items={props.personList}
                        handleChange={handleChange}
                        label="Odběratel"
                        prompt="nevybrán"
                        value={filter.buyerID}
                        />
                </div>
                <div className="col">
                    <InputField
                        type="text"
                        name="product"
                        handleChange={handleChange}
                        label="Produkt"
                        prompt="nevybrán"
                        value={filter.product ? filter.product : ''}
                        />
                </div>
                <div className="row">
                    <div className="col">
                        <InputField
                            type="number"
                            min="0"
                            name="minPrice"
                            handleChange={handleChange}
                            label="Od částky"
                            prompt="neuvedeno"
                            value={filter.minPrice ? filter.minPrice : ''}
                            />
                    </div>
                    
                    <div className="col">
                        <InputField
                            type="number"
                            min="0"
                            name="maxPrice"
                            handleChange={handleChange}
                            label="Do částky"
                            prompt="neuvedeno"
                            value={filter.maxPrice ? filter.maxPrice: ''}
                            />
                    </div>
                    <div className="col">
                        <InputField
                                type="number"
                                min="1"
                                name="limit"
                                handleChange={handleChange}
                                label="Počet faktur k zobrazení"
                                prompt="neuvedeno"
                                value={filter.limit ? filter.limit:''}
                                />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input
                            type="submit"
                            className="btn btn-secondary float-right mt-2"
                            value={props.confirm}
                            />
                    </div>
                </div>
            </div>
        </form>

    );
};
export default InvoiceFilter;