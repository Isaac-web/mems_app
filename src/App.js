import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

export const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, []);

    return (
        <BrowserRouter>
            <Header user={user} setUser={setUser}/>
            <Switch>
                <Route path="/auth" render={() => <Auth/>}/>
                <Route path="/" exact render={(props) => <Home {...props} user={user}/>}/>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
