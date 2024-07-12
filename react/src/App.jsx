import { useState } from 'react'
import './App.css'
import Pizza from "./components/Pizza";
import Search from "./components/Search"
import pizza_data from './assets/pizza.json';

function App() {

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">PIZZA CO.</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
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
                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <Search />
          </div>
        </div>
      </nav>
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

        <div className="container-fluid">
          <div className="row">
            Craving a delicious slice? 🍕 Hit that Order button and we'll have it delivered to you in under half an hour!
            <div className="card-container"></div>
              <Pizza data={pizza_data} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
