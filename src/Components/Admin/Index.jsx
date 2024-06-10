import React, { useState } from "react";
import Login from "./Login";
import Main from "./Main";

function Index(props) {
    const [login, setLogin] = useState(false);
    
    return (
        login === false ?
            <Login login={login} setLogin={setLogin}/>
        : 
            <Main/>
    );
}

export default Index;
