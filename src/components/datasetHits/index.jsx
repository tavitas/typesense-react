import React from "react";
import { connectHits } from "react-instantsearch-dom";
import styled from "styled-components";
import { DatasetHit } from "../datasetHit";

const HitsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

function datasetHits({ hits }) {
  return <HitsContainer>
    {hits.map(hit => (
      <DatasetHit key={hit.ObjectID} hit={hit} />
    )
    )}
  </HitsContainer>
}

export default connectHits(datasetHits);
