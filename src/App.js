import "./App.css";
import styled from "styled-components";
import { InstantSearch, SearchBox, Pagination } from "react-instantsearch-dom";
import { searchClient } from "./typesenseAdapter";
import DatasetHits from "./components/datasetHits";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 0;
`;

function App() {
  return (
    <AppContainer>
      <InstantSearch indexName='datasets' searchClient={searchClient}>
        <h2>
          React Typesense Pacific Environment Portal Dataset InstantSearch
        </h2>
        <h4>Search Datasets</h4>
        <SearchBox />
        <DatasetHits />
        <Pagination />
      </InstantSearch>
    </AppContainer>
  );
}

export default App;
