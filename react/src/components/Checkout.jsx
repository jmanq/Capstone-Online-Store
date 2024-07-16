import React, { useState } from "react";
import { useAuth } from '../hooks/AuthContext';

const Checkout = () => {
    const { user } = useAuth();

    const [sockData, setSockData] = useState({
        userId: "",
        sockDetails: {
            Name: "Small", // Default set as 'Small'
            color: "",
            pattern: "",
            material: "",
            condition: "New", // Default set as 'New'
            forFoot: "Left", // Default set as 'Left'
    }})
}

export default Checkout;


