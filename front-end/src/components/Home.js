import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return <div>
        <h1>this is home page</h1>
        <Link to="log-in">log in</Link>
    </div>
};

export default Home;