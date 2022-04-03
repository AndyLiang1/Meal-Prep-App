import React from 'react';
import './App.css';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Auth } from './pages/Auth';
import { UserPage } from './pages/UserPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    });
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Auth/>} />
                        <Route path="/userData" element={<UserPage/>}/>
                    </Routes>
                </Router>
            </div>
        </ApolloProvider>
    );
}

export default App;
