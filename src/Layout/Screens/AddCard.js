import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BreadCrumbNav from "../Components/BreadCrumbNav";
import { readDeck } from "../../utils/api";
import CreateForm from "../Components/CreateForm";

export default function AddCard() {
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({
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


  return (
    <>
      <BreadCrumbNav string="Add Card" deck={deck} />
      <h1>{deck.name}: Add Card</h1>
      <CreateForm card={card} setCard={setCard} deckId={deckId} />
    </>
  );
}
