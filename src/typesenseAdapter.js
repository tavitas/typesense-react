import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

const TYPESENSE_SERVER_CONFIG = {
  apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_ONLY_API_KEY,
  nodes: [
    {
      host: process.env.REACT_APP_TYPESENSE_HOST,
      port: process.env.REACT_APP_TYPESENSE_PORT,
      protocol: process.env.REACT_APP_TYPESENSE_PROTOCOL,
    },
  ],
  connectionTimeoutSeconds: 1,
  numRetries: 8,
};

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    queryBy: "title, description, theme",
    queryByWeights: "4, 2, 1",
    numTypos: 3,
    typoTokensThreshold: 1,
  },
});

export const searchClient = typesenseAdapter.searchClient;
