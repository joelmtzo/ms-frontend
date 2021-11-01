import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ProductsTable extends Component {

    render() {
        return (
            <table className="table table-sm mt-3 small">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>U. Medida</th>
                    <th>Clave</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                { this.props.products.map(product =>
                    <tr key={product.productId}>
                        <td>{ product.name }</td>
                        <td>{ product.price }</td>
                        <td>{ product.measureUnit }</td>
                        <td>{ product.code }</td>
                        <td>
                            <Link to={`/product/${product.productId}`} className="btn btn-warning btn-sm">E</Link>
                            <button
                                onClick={() => this.props.onDelete(product)}
                                className="btn btn-danger btn-sm">D</button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}

export default ProductsTable;