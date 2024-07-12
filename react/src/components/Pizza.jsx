import React from 'react';

const Pizza = (props) => {
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
        </div>
    );
};

export default Pizza;