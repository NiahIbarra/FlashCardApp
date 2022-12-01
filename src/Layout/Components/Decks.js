import React, { useState, useEffect } from 'react';
import { listDecks } from "../../utils/api/index";
import DeckDeleteButton from './DeckDeleteButton';
import { Link } from "react-router-dom";

export default function Decks({ refresh, setRefresh }){
    //initialize decks and setDecks use state to an array for mapping later
    const [decks, setDecks] = useState([]);

    //useEffect hook to load decks on page load
    useEffect(() => {
        //abort controller initalization (for cleanup)
        const abortController = new AbortController();
        //loadDecks async function initalization 
        async function LoadDecks(){
            //try catch for error handling
            try{
                //calling listDecks function from utils/api/index.js and setting response to a variable
                const response = await listDecks(abortController.signal);
                //setting useState variable setDecks to the response
                setDecks(response);
            //catch initalization with error variable
            } catch(err) {
                //if error is an abort error log that
                if (err === "AbortError") {
                    console.log("Abort Error", err);
                } else {
                //if not throw the error
                    throw err;
                }
            }
        }
        //call function for request code to run
        LoadDecks();
        //abort controller cleanup
        return () => {
            abortController.abort();
        };
    }, [refresh]);

    return (
      <>
        {decks.map((deck) => {
            return (
              <div className="card m-2" key={deck.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{deck.name}</h5>
                    <h6 className="card-quote">{`${deck.cards.length} cards`}</h6>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {deck.description}
                  </h6>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-around">
                        <Link
                            type="button"
                            className="btn btn-secondary m-1"
                            to={`/decks/${deck.id}`}
                        >
                        <span className="oi oi-eye m-1" />
                        View
                        </Link>
                        <Link
                            type="button"
                            className="btn btn-primary m-1"
                            to={`/decks/${deck.id}/study`}
                        >
                        <span className="oi oi-book m-1" />
                        Study
                      </Link>
                    </div>
                    <div>
                      <DeckDeleteButton
                        deckId={deck.id}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
        })}
      </>
    );
}