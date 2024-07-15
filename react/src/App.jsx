import React, { useState, useEffect } from "react";
import './App.css'
import Pizza from "./components/Pizza";
import Search from "./components/Search"
import Cart from "./components/Cart"
import Home from "./components/Home"
import pizza_data from './assets/pizza.json';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PIZZAS_API_URL);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response); // assign JSON response to the data variable.
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">PIZZA CO.</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Menu</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Other
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">About Us</a></li>
                    <li><a className="dropdown-item" href="#">Locations</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Customer Support</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart 🛒
                  </Link>
                </li>
              </ul>
              <Search setData={setData} />
            </div>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

          <div className="container-fluid">
            <div className="row">
              Craving a delicious slice? 🍕 Hit that Order button and we'll have it delivered to you in under half an hour!
              <Routes>
                <Route exact path="/" element={<Home data={data} />} />
                <Route exact path="/cart" element={<Cart addToCart={data}/>} />
              </Routes>
            </div>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
