import React from 'react';


const Pizza = (props) => {

    let addProduct_url = "http://localhost:3000/cart/addProduct";
     
    const addProduct = (data) => {
        fetch(addProduct_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    };

    function handleClick(data) {
        addProduct(data);
        window.location='http://localhost:5173/';
        alert("Your item has been added to the cart!");
    };

    return (
        <div className="card" style={{ flex: '1', minWidth: '300px', maxWidth: '45%' }}>
            <div className="card-body">
                <h5 className="card-title">Pizza Details</h5>
                <div className="card-text">Size: {props.data.Size}</div>
                <div className="card-text">Crust: {props.data.Crust}</div>
                <div className="card-text">Sauce: {props.data.Sauce ? "Yes" : "No"}</div>
                <div className="card-text">Cheese: {props.data.Cheese ? "Yes" : "No"}</div>
                <div className="card-text">Topping 1: {props.data.topping_1}</div>
                <div className="card-text">Topping 2: {props.data.topping_2}</div>
                <div className="card-text">Topping 3: {props.data.topping_3}</div>
                <div className="card-text">Price: {props.data.Price}</div>
                <div className="card-text">Popularity: {props.data.Popularity}</div>
                <div className="card-text">Pizza ID: {props.data.Pizza_ID}</div>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => handleClick(props.data) }>Add to Cart</button>
        </div>
    );
};

export default Pizza;