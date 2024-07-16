import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import PizzaCart from './PizzaCart';

const Cart = ({ addToCart }) => {

    let [cartList, setCartList] = useState([]);

    let cart_url = "http://localhost:3000/cart/getCart";
    let checkout_url = 'http://localhost:3000/cart/checkout';
    let deleteProduct_url = "http://localhost:3000/cart/getCart/";

    const deleteProduct = (data) => {
        fetch(deleteProduct_url + data, {
            method: "delete"
            
        })
    };

    const checkout = (data) => {
        fetch(checkout_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    };

    const fetchCart = () => {
        fetch(cart_url)
            .then((res) => res.json())
            .then((cartList) => {
                setCartList(cartList);
            });
    };

    useEffect(fetchCart, []);

    console.log("Cart list length: ", cartList.length)

    if (cartList.length == 0) {
        return (
            <div>
                <h3>Nothing in your cart!</h3>
            </div>
        )
    };

    if (cartList.length != 0) {
        var totalPrice = 0;
        for (let i = 0; i < cartList.length; i++) {
            totalPrice += parseFloat(cartList[i].Price);
        }
        console.log("Totaly Price: $", totalPrice.toFixed(2))
        var totalPriceFixed = totalPrice.toFixed(2)


        function buttonClick(data) {
            var idList = []
            data.push(totalPriceFixed)
            for (let i = 0; i < cartList.length; i++) {
                idList.push(cartList[i].Pizza_ID)
            }
            data.push(idList)

            var orderJson = 
            {
                name: data[0],
                CardNumber: data[1],
                cvv: data[2], 
                exprMonth: data[3],
                exprYear: data[4],
                Price: data[5], 
                PizzaIds: data[6]
            }

            checkout(orderJson)

            for (let x = 0; x < idList.length; x++){
                deleteProduct(idList[x])
            }

            window.location='http://localhost:5173/cart';
            alert("Thank you for your order, it will arrive shortly!");

            console.log(orderJson)
          }


        return (
            <div>
                <div>
                    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {
                            cartList.map((pizza) => (
                                <PizzaCart key={pizza._id} data={pizza} />
                            ))
                        }
                    </div>
                    <h4 id="total"> Total: ${totalPriceFixed} </h4>
                </div>

                <form action="" method="POST" id="checkout-form">

                    <div>
                        <label htmlFor="name">Name </label>
                        <input type="text" name="name" id="name" />
                    </div>

                    <div>
                        <label htmlFor="creditCard">Card Number </label>
                        <input type="text" name="creditCard" id="creditCard" />
                    </div>

                    <div>
                        <label htmlFor="cvv">Security Code </label>
                        <input type="text" name="cvv" id="cvv" />
                    </div>

                    <div>
                        <label htmlFor="Expiration">Exp. (MM/YYYY) </label>
                        <input type="text" name="exp-month" id="exp-month" size="2" />
                        <span> / </span>
                        <input type="text" name="exp-year" id="exp-year" size="4" />
                    </div>
                </form>



                <button className="btn btn-sm btn-danger" onClick={() => buttonClick([document.getElementById("name").value ,document.getElementById("creditCard").value, document.getElementById("cvv").value, document.getElementById("exp-month").value, document.getElementById("exp-year").value])  }>Buy Now</button>

            </div>
        );
    };
};

export default Cart;