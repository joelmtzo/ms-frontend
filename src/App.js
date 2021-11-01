import './App.css';
import React, {Component} from "react";
import Products from "./components/products";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import ProductForm from "./components/productForm";
import {ToastContainer} from "react-toastify";

class App extends Component {

    render() {
        return <React.Fragment>
            <ToastContainer />
            <main className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/product/:id" component={ProductForm}/>
                        <Route path="/products" component={Products}/>
                        <Redirect from="/" exact to="/products"/>
                    </Switch>
                </BrowserRouter>
            </main>
        </React.Fragment>
    }
}

export default App;
