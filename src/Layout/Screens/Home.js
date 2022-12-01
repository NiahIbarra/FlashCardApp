import React from 'react';
import { Link } from 'react-router-dom';
import Decks from '../Components/Decks';

export default function Home({ refresh, setRefresh }) {
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary m-2">
        <span className="oi oi-plus m-1" />
        Create Deck
      </Link>
      <Decks refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
}