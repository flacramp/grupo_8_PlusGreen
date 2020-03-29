import React, { Component } from "react";
import Category from "./Category";

class Categories extends Component {

constructor(props) {
        super(props);
        this.state = {
            unObjeto: "",
        }
    }

apiCall (url,parametro) {
    fetch(url)
      .then (response => response.json())
      .then (data => parametro(data))
      .catch(error => console.log(error))
}

componentDidMount() {
    this.apiCall('http://localhost:3000/restapi/categories',respuesta=>{
        this.setState({
            unObjeto: respuesta.results
        })
    }
    );    
}
 
    render () {
        let {unObjeto: categories} = this.state
    
        return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
                </div>
                <div className="card-body">
                    <div className="row">
                            {categories && categories.map((oneCategory,i) => <Category key={i} name={oneCategory.name} />)}
                    </div>
                </div>
            </div>
        </div>
        )
        };
}

export default Categories;