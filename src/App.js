import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { InstantSearch, SearchBox } from "react-instantsearch-dom";
import { searchClient } from "./typesenseAdapter";

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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <AppContainer>
      <InstantSearch searchClient={searchClient}>
        <h2>
          React Typesense Pacific Environment Portal Dataset InstantSearch
        </h2>
        <h4>Search Datasets</h4>
        <SearchBox />
      </InstantSearch>
    </AppContainer>
  );
}

export default App;
