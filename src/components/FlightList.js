// src/components/FlightList.js
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_FLIGHTS = gql`
  {
    flights {
      id
      flightNumber
      departure
      arrival
      status
    }
  }
`;

const FlightList = () => {
  const { loading, error, data } = useQuery(GET_FLIGHTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.flights.map((flight) => (
        <li key={flight.id}>
          {flight.flightNumber} - {flight.departure} to {flight.arrival} - {flight.status}
        </li>
      ))}
    </ul>
  );
};

export default FlightList;