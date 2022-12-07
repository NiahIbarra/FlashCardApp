import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { createDeck } from '../../utils/api';

export default function CreateDeckForm(){
    const [formData, setFormData] = useState({ name: "", description: "" });
    const history = useHistory();
    const onChangeHandler = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value});
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function deckCreate(){
            try {
                const data = await createDeck(formData, abortController.signal);
                history.push(`/decks/${data.id}`);
            } catch (error) {
                if(error === "AbortError"){
                    console.log("Aborted deck creation");
                } else {
                    throw error;
                }
            }
        }
        deckCreate();
        setFormData({ name: "", description: "" });
        
        return () => abortController.abort();
    }

    return (
        <>
        <form>
            <div className="form-group">
                <label className="d-flex col">Name</label>
                <input 
                    className="d-flex col" 
                    name="name"
                    placeholder="Deck name"
                    value={formData.name} 
                    onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label className="d-flex col">Description</label>
                <textarea 
                    className="d-flex col"
                    name="description"
                    placeholder='Brief description of the deck'
                    value = {formData.description} 
                    onChange={onChangeHandler}/>
            </div>
        </form>
        <Link type="button" className="btn btn-secondary m-1" to="/" >
            Cancel
        </Link>
        <button className="btn btn-primary m-1" onClick={submitHandler} >
            Submit
        </button>
        </>
    );
}