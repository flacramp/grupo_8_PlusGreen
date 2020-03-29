import React, { Component } from "react";
import './App.css';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import Kpi from './components/Kpi';
import Categories from './components/Categories';
import LastProduct from './components/LastProduct';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productsJSON: "",
      usersJSON:"",
    }
  }

  apiCall(url, parametro) {
    fetch(url)
      .then(response => response.json())
      .then(data => parametro(data))
      .catch(error => console.log(error))
  }

  componentDidMount() {
    console.log("Carga de la Api de Productos");
    this.apiCall('http://localhost:3000/restapi/products', respuesta => {
      this.setState({
        productsJSON: respuesta.aggregations
      })
    }
    );
    console.log("Carga de la Api de Users");
    this.apiCall('http://localhost:3000/restapi/Users', respuesta => {
      this.setState({
        usersJSON: respuesta.aggregations
      })
    }
    );


  }

render() {
  let { productsJSON: products } = this.state;
  let { usersJSON: users } = this.state;

  return (

    <div id="wrapper">
      <SideBar />

      <div id="content-wrapper" className="d-flex flex-column">

        <div id="content">
          <TopBar />

          <div className="container-fluid">


            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
            </div>

            <div className="row">
              <Kpi 
                title={"Products in Data Base"}
                value={products.totalProducts}
                icon={"fa - clipboard - list"}
                border={"border-left-primary"}
              />
              <Kpi
                title={"Amount in products"}
                value={"$"+products.totalAmount}
                icon={"fa-dollar-sign"}
                border={"border-left-success"} 
              />
              <Kpi
                title={"Users quantity"}
                value={users.totalUsers}
                icon={"fa-user-check"}
                border={"border-left-warning"} 
              />
              </div>
              <div className="row">
                {/* Último Producto */}
                <LastProduct />

                {/* Categorías */}
                <Categories />
              </div>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Dashboard 2020</span>
              </div>
            </div>
          </footer>

        </div>
      </div>
  );
};
}

export default App;
