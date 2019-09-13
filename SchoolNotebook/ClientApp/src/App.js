import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Notebook from './components/Notebook';
import NotebookSearch from './components/NotebookSearch';
import Login from './components/Login';
import Authenticate from './components/Authenticate';

export default () => (
    <div>
        <Authenticate>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                <Route path='/notebook/*/:id(\d+)' component={Notebook} />
                <Route path='/notebookSearch/:searchKey' component={NotebookSearch} />
            </Layout>
        </Authenticate>
        <Route exact path='/login' component={Login} />
    </div>
);
