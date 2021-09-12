import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { render } from "react-dom";

import { App } from "./app";

const container = document.createElement("div");
container.id = "root";

document.body.append(container);

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  container
);
