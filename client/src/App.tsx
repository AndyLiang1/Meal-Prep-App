import React from 'react';
import './App.css';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

function App() {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql'
    });
    return (
        <ApolloProvider client = {client}>
            <div className="App">
                HelloWorld
                <Register></Register>
                <Login></Login>
            </div>
        </ApolloProvider>
    );
}

export default App;
