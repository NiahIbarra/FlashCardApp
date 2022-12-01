import React from 'react';
import { Link } from 'react-router-dom';

export default function BreadCrumbNav({ string, deck, card }){
    return (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          {string === "Create Deck" ? (
            <li className="breadcrumb-item active">{string}</li>
          ) : string === "Deck" ? (
            <li className="breadcrumb-item active">{deck.name}</li>
          ) : string === "Edit Deck" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{string}</li>
            </>
          ) : string === "Study" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{string}</li>
            </>
          ) : string === "Add Card" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{`${deck.name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{string}</li>
            </>
          ) : string === "Edit Card" ? (
            <>
              <li className="breadcrumb-item">
                <Link to={`/decks/${deck.id}`}>{`Deck ${deck.name}`}</Link>
              </li>
              <li className="breadcrumb-item active">{string} {card.id}</li>
            </>
          ) : null}
        </ol>
      </nav>
    );
}