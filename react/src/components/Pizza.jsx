import React from 'react';

const Pizza = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Pizza Details</h5>
                <div className="card-text">Size: {props.data.pizzaDetails.size}</div>
                <div className="card-text">Cheese: {props.data.pizzaDetails.cheese ? "Yes" : "No"}</div>
                <div className="card-text">Crust: {props.data.pizzaDetails.crust}</div>
                <div className="card-text">Sauce: {props.data.pizzaDetails.sauce ? "Yes" : "No"}</div>
                <div className="card-text">Price: {props.data.pizzaDetails.price}</div>
                <div className="card-text">Popularity: {props.data.pizzaDetails.popularity}</div>
                <div className="card-text">Pizza ID: {props.data.pizzaDetails.id}</div>
                {/* <div className="card-text">Toppings: {props.data.pizzaDetails.size}</div> */}
            </div>
            <div className="card-footer" >
                <small className="text-muted">Added: {props.data.addedTimestamp}</small>
            </div>
        </div>
    );
};

export default Pizza;