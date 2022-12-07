import React, { useState, useEffect } from 'react';
import BreadCrumbNav from '../Components/BreadCrumbNav';
import { useParams } from 'react-router-dom';
import { readCard, readDeck } from '../../utils/api';
import CreateForm from '../Components/CreateForm';

export default function EditCard(){
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});
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

    return (
      <>
        <BreadCrumbNav string="Edit Card" deck={deck} card={card} />
        <h1>Edit Card</h1>
        <CreateForm string="EditCard" card={card} setCard={setCard} deckId={ deckId } />
      </>
    );
}