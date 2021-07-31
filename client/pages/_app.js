import { Provider } from 'next-auth/client';
import { ApolloProvider } from "@apollo/client";
import '../styles/globals.css';
import client from "../apollo-client";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>

    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
