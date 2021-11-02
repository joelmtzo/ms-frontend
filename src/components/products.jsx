import React, {Component} from 'react';
import ProductsTable from "./productsTable";
import {deleteProduct, getProducts} from "../services/productService";
import {Link} from "react-router-dom";

class Products extends Component {
    state = {
        products: [],
    }

    async componentDidMount() {
        const {data: products} = await getProducts();
        this.setState({products});
    }

    handleDelete = product => {
        if (window.confirm("¿Estás seguro que deseas eliminarlo?")) {
            const products = this.state.products.filter(p => p.productId !== product.productId);
            this.setState({products});

            deleteProduct(product.productId)
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