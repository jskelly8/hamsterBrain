// React & Apollo imports
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
        {/* Needed for scheduler */}
        <main className="outlet blackbkgrnd">
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
