import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";
import Beneficios from "../components/Beneficios/Beneficios";

const Layout = ({ children }) => {
    return (
    <>
        <Navbar />
        {children}
        <Beneficios />
        <Footer />
    </>
    );
};

export default Layout;