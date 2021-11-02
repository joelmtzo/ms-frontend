import React from 'react';
import Form from "./common/form";
import Joi from "joi-browser";
import {Link} from "react-router-dom";
import {getProduct, saveProduct} from "../services/productService";

class ProductForm extends Form {
    state = {
        data: {
            productId: "",
            name: "",
            price: "",
            measureUnit: "",
            code: ""
        },
        measureUnits: [
            {"_id": "PIEZA", "name": "PIEZA"},
            {"_id": "KILOGRAMO", "name": "KILOGRAMO"},
            {"_id": "PULGADA", "name": "PULGADA"},
            {"_id": "LITRO", "name": "LITRO"},
        ],
        errors: {}
    }

    schema = {
        productId: Joi.string()
            .allow(""),
        name: Joi.string()
            .required()
            .max(30)
            .label("Nombre"),
        price: Joi.number()
            .positive()
            .required()
            .label("Precio"),
        measureUnit: Joi.string()
            .required()
            .label("Unidad de medida"),
        code: Joi.string()
            .required()
            .min(3)
            .max(30)
            .label("Código")
    };

    componentDidMount() {
        this.populateForm();
    }

    async populateForm() {
        try {
            const productId = this.props.match.params.id;
            if (productId === "new") return;

            const {data: product} = await getProduct(productId);
            this.setState({data: this.mapToViewModel(product)})
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                console.log("Not found")
        }
    }

    mapToViewModel(product) {
        return {
            productId: product.productId,
            name: product.name,
            price: product.price,
            measureUnit: product.measureUnit,
            code: product.code
        };
    }

    doSubmit = async () => {
        await saveProduct(this.state.data);

        this.props.history.push("/products");
    }

    render() {
        return (
            <div>
                <h1 className="text-center mt-5">Producto</h1>
                <form onSubmit={this.handleSubmit} className="my-5">
                    {this.renderInput("name", "Nombre")}
                    {this.renderInput("price", "Precio")}
                    {this.renderSelect("measureUnit", "Unidad de medida", this.state.measureUnits)}
                    {this.renderInput("code", "Código")}
                    <div className="d-flex justify-content-between">
                        <Link to={"/products"} className="btn btn-primary">Cancelar</Link>
                        <button disabled={this.validate()} className="btn btn-success">Guardar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProductForm;