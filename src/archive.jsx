/*
 * Copyright (c) Starry Systems and Nijika Softworks.
 */

import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function Archive() {
    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <div className="container">
                <h1>this does nothing</h1>
            </div>
            <Footer />
        </>
    );
}

