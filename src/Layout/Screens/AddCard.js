import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import BreadCrumbNav from "../Components/BreadCrumbNav";
import { readDeck, createCard } from "../../utils/api";

export default function AddCard() {
    const [deck, setDeck] = useState({});
    const [newCard, setNewCard] = useState({
        front: "",
        back: "",
    });
    const { deckId } = useParams();
    useEffect(() => {
        const abortController = new AbortController();
        async function deckLoad(){
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
                console.log(response);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort error:", error);
                } else {
                    throw error;
                }
            }
        }
        deckLoad();
        return () => abortController.abort();
    }, [deckId]);

    const onChangeHandler = (event) => {
        setNewCard({...newCard, [event.target.name]: event.target.value});
    };

    const saveNewCard = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function saveCard(){
            try {
                const response = await createCard(deckId, newCard, abortController.signal);
                console.log(response);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort error:", error);
                } else {
                    throw error;
                }
            }
        }
        saveCard();
        setNewCard({
            front: "",
            back: "",
        });
        return () => abortController.abort();
    };


  return (
    <>
      <BreadCrumbNav string="Add Card" deck={deck} />
      <h1>{deck.name}: Add Card</h1>
      <form>
        <div className="form-group">
          <label className="d-flex col">Front</label>
          <textarea
            className="d-flex col"
            name="front"
            placeholder="Front side of card"
            value={newCard.front}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-group">
          <label className="d-flex col">Back</label>
          <textarea
            className="d-flex col"
            name="back"
            placeholder="Back side of card"
            value={newCard.back}
            onChange={onChangeHandler}
          />
        </div>
      </form>
      <Link type="button" className="btn btn-secondary m-1" to={`/decks/${deckId}`}>
        Done
      </Link>
      <button className="btn btn-primary m-1" onClick={saveNewCard}>
        Save
      </button>
    </>
  );
}
