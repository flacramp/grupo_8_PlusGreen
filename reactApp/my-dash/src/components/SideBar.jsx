import React from "react";

function SideBar() {
    return (

        <ul className="navbar-nav bg-gradient-success sidebar sidebar-dark accordion" id="accordionSidebar">


            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                <div className="sidebar-brand-icon">
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="sidebar-brand-text mx-3">PlusGreen</div>
            </a>


            <hr className="sidebar-divider my-0"></hr>


            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>


            <hr className="sidebar-divider"></hr>


            <div className="sidebar-heading">Acciones</div>


            <li className="nav-item">
                <a className="nav-link collapsed" href="/">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Paginas</span>
                </a>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-chart-area"></i>
                    <span>Graficos</span></a>
            </li>


            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-table"></i>
                    <span>Tablas</span></a>
            </li>

            <hr className="sidebar-divider d-none d-md-block"></hr>
        </ul>   
    );
}

export default SideBar;