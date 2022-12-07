import React from 'react';
import { updateCard, createCard } from '../../utils/api';
import { useHistory, Link } from 'react-router-dom';

export default function CreateForm({ card, setCard, string, deckId }){
    const history = useHistory();
    const onChangeHandler = (event) => {
        setCard({ ...card, [event.target.name]: event.target.value });
    };
    const submitHandler = () => {
        const abortController = new AbortController();
        async function cardUpdate() {
        try {
            const response = updateCard(card, abortController.signal);
            console.log(response);
        } catch (error) {
            if (error === "AbortError") {
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
    const saveNewCard = () => {
        const abortController = new AbortController();
        async function saveCard() {
        try {
            const response = await createCard(
                deckId,
                card,
                abortController.signal
            );
            console.log(response);
        } catch (error) {
            if (error === "AbortError") {
                console.log("Abort error:", error);
            } else {
                throw error;
            }
        }
        }
        saveCard();
        setCard({
            front: "",
            back: "",
        });
        return () => abortController.abort();
    };
    return(
        <>
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
        {string === "EditCard" ? (
            <>
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
        ) : (
            <>
            <Link type="button" className="btn btn-secondary m-1" to={`/decks/${deckId}`}>
                Done
            </Link>
            <button className="btn btn-primary m-1" onClick={saveNewCard}>
                Save
            </button>
            </>
        )}
      </>
    );
}