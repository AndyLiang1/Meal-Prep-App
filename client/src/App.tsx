import React from 'react';
import './App.css';
import { Login } from './components/Login/Login';
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
                <Login></Login>
            </div>
        </ApolloProvider>
    );
}

export default App;
