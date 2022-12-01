import React from 'react';
import { deleteCard } from '../../utils/api';

export default function CardDeleteButton({ cardId, refresh, setRefresh }){
    const handleDelete = () => {
        const abortController = new AbortController();
        async function cardDelete(){
            if(window.confirm("Are you sure you want to delete this card")){
                try {
                    const response = await deleteCard(cardId, abortController.signal);
                    console.log(response);
                } catch (error) {
                    if(error === "AbortError"){
                        console.log("Abort error", error);
                    } else {
                        throw error;
                    }
                }
            }
        }
        cardDelete();
        setRefresh(!refresh);
        return () => abortController.abort();
    }

    return (
      <>
        <button
          type="button"
          className="btn btn-danger m-1"
          onClick={handleDelete}
        >
          <span className="oi oi-trash m-1" />
        </button>
      </>
    );
}