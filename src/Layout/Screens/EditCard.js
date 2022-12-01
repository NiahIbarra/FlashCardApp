import React, { useState, useEffect } from 'react';
import BreadCrumbNav from '../Components/BreadCrumbNav';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readCard, readDeck, updateCard } from '../../utils/api';

export default function EditCard(){
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
    const history = useHistory();
    const { deckId, cardId } = useParams();
    useEffect(() => {
        const abortController = new AbortController();
        async function loadItems(){
            try {
                const deckResponse = await readDeck(deckId, abortController.signal);
                const cardResponse = await readCard(cardId, abortController.signal);
                setDeck(deckResponse);
                setCard(cardResponse);
                console.log("Deck:", deckResponse, "Card:", cardResponse);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort error:", error);
                } else {
                    throw error;
                }
            }
        }
        loadItems();
        return () => abortController.abort();
    }, [deckId, cardId]);

    const onChangeHandler = (event) => {
        setCard({...card, [event.target.name]: event.target.value});
    };

    const submitHandler = () => {
        const abortController = new AbortController();
        async function cardUpdate(){
            try {
                const response = updateCard(card, abortController.signal);
                console.log(response);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort error:", error);
                } else {
                    throw error;
                }
            }
        }
        cardUpdate();
        history.push(`/decks/${deckId}`);
        return () => abortController.abort();
    };

    return (
      <>
        <BreadCrumbNav string="Edit Card" deck={deck} card={card} />
        <h1>Edit Card</h1>
        <form>
          <div className="form-group">
            <label className="d-flex col">Front</label>
            <textarea
              className="d-flex col"
              name="front"
              placeholder="Front side of card"
              value={card.front}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label className="d-flex col">Back</label>
            <textarea
              className="d-flex col"
              name="back"
              placeholder="Back side of card"
              value={card.back}
              onChange={onChangeHandler}
            />
          </div>
        </form>
        <Link
          type="button"
          className="btn btn-secondary m-1"
          to={`/decks/${deckId}`}
        >
          Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitHandler}>
          Submit
        </button>
      </>
    );
}