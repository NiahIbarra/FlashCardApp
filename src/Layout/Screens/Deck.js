import React, { useState, useEffect } from 'react';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import BreadCrumbNav from '../Components/BreadCrumbNav';
import { readDeck } from '../../utils/api';
import DeckDeleteButton from '../Components/DeckDeleteButton';
import CardDeleteButton from '../Components/CardDeleteButton';

export default function Deck({ refresh, setRefresh }){
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    useEffect(() => {
        const abortController = new AbortController();
        async function deckLoad(){
            try {
                const response = await readDeck(deckId, abortController.signal);
                console.log(response);
                setDeck(response);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort Error", error);
                } else {
                    throw error;
                }
            }
        };
        deckLoad();
        return () => abortController.abort();
    },  [deckId, refresh]);

    if(deck.cards === undefined){
        return(
            <>
            <BreadCrumbNav string="Deck" deck={deck} />
            <div>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-around">
                <Link
                type="button"
                className="btn btn-secondary m-1"
                to={`${url}/edit`}
                >
                <span className="oi oi-pencil m-1" />
                Edit
                </Link>
                <Link
                type="button"
                className="btn btn-primary m-1"
                to={`${url}/study`}
                >
                <span className="oi oi-book m-1" />
                Study
                </Link>
                <Link
                type="button"
                className="btn btn-primary m-1"
                to={`${url}/cards/new`}
                >
                <span className="oi oi-plus m-1" />
                Add Cards
                </Link>
            </div>
            <DeckDeleteButton
                deckId={deck.id}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            </div>
            </>
        );
    } else {
        return (
        <>
            <BreadCrumbNav string="Deck" deck={deck} />
            <div>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            </div>
            <div className="d-flex justify-content-between">
            <div className="d-flex justify-content-around">
                <Link
                type="button"
                className="btn btn-secondary m-1"
                to={`${url}/edit`}
                >
                <span className="oi oi-pencil m-1" />
                Edit
                </Link>
                <Link
                type="button"
                className="btn btn-primary m-1"
                to={`${url}/study`}
                >
                <span className="oi oi-book m-1" />
                Study
                </Link>
                <Link
                type="button"
                className="btn btn-primary m-1"
                to={`${url}/cards/new`}
                >
                <span className="oi oi-plus m-1" />
                Add Cards
                </Link>
            </div>
            <DeckDeleteButton
                deckId={deck.id}
                refresh={refresh}
                setRefresh={setRefresh}
            />
            </div>
            <br />
            <h2>Cards</h2>
            {deck.cards.map((card) => {
                return (
                  <div className="card m-2" key={card.id}>
                    <div className="card-body">
                      <div className="card-subtitle d-flex justify-content-between">
                        <p className="d-flex col-6">{card.front}</p>
                        <p className="d-flex col-6">{card.back}</p>
                      </div>
                      <div className="d-flex justify-content-end">
                        <Link
                          type="button"
                          className="btn btn-secondary m-1"
                          to={`${url}/cards/${card.id}/edit`}
                        >
                          <span className="oi oi-pencil m-1" />
                          Edit
                        </Link>
                        <CardDeleteButton
                          cardId={card.id}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
                      </div>
                    </div>
                  </div>
                );
            })}
        </>
        );
    }
}