import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import BreederDetailPage from './routes/BreederDetailPage';
import UpdatePage from './routes/UpdatePage';
import Home from './routes/Home'
import { BreedersContextProvider } from './context/BreedersContext';


const App = () => {
    return(
        <BreedersContextProvider>
        <div className="">
    <Router>
        <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/breeders/:id/update" component={UpdatePage} />
    <Route exact path="/breeders/:id" component={BreederDetailPage} />
    </Switch>
    </Router>
    </div>
    </BreedersContextProvider>

    );
}

export default App;