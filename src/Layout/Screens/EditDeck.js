import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';
import BreadCrumbNav from '../Components/BreadCrumbNav';

export default function EditDeck(){
    const [deck, setDeck] = useState({
      name: "",
      description: ""
    });
    const history = useHistory();
    const { deckId } = useParams();
    useEffect(() => {
        const abortController = new AbortController();
        async function deckLoad(){
            try {
                const response = await readDeck(deckId, abortController.signal);
                setDeck({
                  name: response.name,
                  description: response.description
                });
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Abort Error", error);
                } else {
                    throw error;
                }
            }
        }
        deckLoad();
        return () => abortController.abort();
    }, [deckId]);

    const onChangeHandler = (event) => {
        setDeck({...deck, [event.target.name]: event.target.value});
    }

    const submitHandler = () => {
        const abortController = new AbortController();
        async function deckUpdate() {
            try{
                const response = await updateDeck(deck, abortController.signal);
                console.log(response);
            } catch(error){
                if(error === "AbortError"){
                    console.log("Abort error", error);
                }else {
                    throw error;
                }
            }
        }
        deckUpdate();
        history.push(`/decks/${deckId}`);
        return () => abortController.abort();
    }

    return (
      <>
        <BreadCrumbNav string="Edit Deck" deck={deck} />
        <h2>Edit Deck</h2>
        <form>
          <div className="form-group">
            <label className="d-flex col">Name</label>
            <input
              className="d-flex col"
              type='text'
              name="name"
              value={deck.name}
              onChange={onChangeHandler}
            />
          </div>
          <div className="form-group">
            <label className="d-flex col">Description</label>
            <textarea
              className="d-flex col"
              name="description"
              value={deck.description}
              onChange={onChangeHandler}
            />
          </div>
        </form>
        <Link type="button" className="btn btn-secondary m-1" to={`/decks/${deckId}`}>
          Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitHandler}>
          Submit
        </button>
      </>
    );
}