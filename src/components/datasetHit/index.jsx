import React from "react";
import styled from "styled-components";

const HitContainer = styled.div`
  display: flex;
  flex: column;
  align-items: center;
  max-width: 300px;
  margin: 2em 1em;
`;

const Title = styled.div`
  font-style: black;
  font-size: 24px;
  margin-top: 10px;
  text-align: center;
`;

const Description = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 1em;
  line-height: 1.3;
  font-size: 14px;
`;

export function DatasetHit(props) {
  const { hit } = props;

  return(
    <HitContainer>
      <Title>{hit.title}</Title>
      <Description>{hit.description}</Description>
    </HitContainer>
  );
}

