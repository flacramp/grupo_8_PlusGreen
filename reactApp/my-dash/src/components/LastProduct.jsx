import React, { Component } from "react";

class LastProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productsJSON:"",
        }
    }

    apiCall(url, parametro) {
        fetch(url)
            .then(response => response.json())
            .then(data => parametro(data))
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.apiCall('http://localhost:3000/restapi/products', respuesta => {
            this.setState({
                productsJSON: respuesta.results.pop()
            })
        }
        );
    }

render () {
    let { productsJSON: products } = this.state
    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Last product in Data Dase</h6>
                </div>
                <div className="card-body">
                    <div className="text-center">
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "25rem" }} src={`/${products.image}`} alt="lorem ipsum dolet sie amet" />
                    </div>
                    <p>
                        <li>Nombre: {products.name}</li>
                        <li>Model: {products.model}</li>
                        <li>Price: {products.list_price}</li>
                        <li>Stock: {products.stock}</li>
                        <li>Descripcion: {products.description}</li>
                    </p>
                    <a target="_blank" rel="nofollow" href={`http://localhost:3000/products/${products.id}`}>View product detail</a>
                </div>
            </div>
        </div>
    )
};
}

export default LastProduct;