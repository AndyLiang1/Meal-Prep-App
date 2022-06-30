import React from 'react';
import './App.css';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { Auth } from './pages/Auth';
import { UserPage } from './pages/UserPage';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

function App() {
    const httpLink = createHttpLink({
        uri: 'http://localhost:4000/graphql'
    });
    const authLink = setContext((_, { headers }) => {
        // get the authentication token from local storage if it exists
        const token = localStorage.getItem('accessToken');
        // return the headers to the context so httpLink can read them
        return {
            headers: {
                ...headers,
                authorization: token
            }
        };
    });
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    });

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={<Auth />} />
                        <Route path="/userData" element={<UserPage />} />
                    </Routes>
                </Router>
            </div>
        </ApolloProvider>
    );
}

export default App;
