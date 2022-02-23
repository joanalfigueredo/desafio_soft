import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import New from "./pages/New";
import Immobile from "./pages/Immobile";
import Property from "./pages/Property";

export default function RoutesApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Immobile/>} />
                <Route path="/new" element={<New/>} />
                <Route path="/property/:id" element={<Property/>} />
            </Routes>
        </BrowserRouter>
    );
}