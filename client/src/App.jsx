// React & Apollo imports
// import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

// Component imports
import Header from './components/Header';
import Footer from './components/Footer';

// Temp Holding Place
// import Hero from './pages/Hero';
// import Schedule from './pages/Schedule';
// import Tasks from './pages/Tasks';
// import Header from './components/Header/index';
// import Footer from './components/Footer/index';


// HTTP link for GraphQL operations
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Authentication link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client with the created links and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Header />
        <main className="outlet">
          <Outlet />

          {/* Temp Holding Place*/}
          {/* <Hero />
          <Schedule /> */}
          {/* <Tasks /> */}

        </main>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App
