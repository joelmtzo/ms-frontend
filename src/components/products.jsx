import React, {Component} from 'react';
import ProductsTable from "./productsTable";
import {getProducts, saveProduct} from "../services/productService";
import ProductForm from "./productForm";
import {Link} from "react-router-dom";
import {apiUrl} from "../config.json";

class Products extends Component {
    state = {
        products: [],
    }

    componentDidMount() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => this.setState({products: data}));
    }

    handleDelete = product => {
        if (window.confirm("¿Estás seguro que deseas eliminarlo?")) {
            const products = this.state.products.filter(p => p.productId !== product.productId);
            this.setState({products});

            fetch(apiUrl + `/${product.productId}`, {method: 'DELETE'})
                .then(response => response.json())
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-10 mx-auto mt-5">
                    <Link to="/product/new" className="btn btn-success">Nuevo</Link>
                    <ProductsTable
                        products={this.state.products}
                        onDelete={this.handleDelete}
                    />
                </div>
            </div>
        );
    }
}

export default Products;