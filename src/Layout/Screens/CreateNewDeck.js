import React from 'react';
import BreadCrumbNav from '../Components/BreadCrumbNav';
import CreateDeckForm from '../Components/CreateDeckForm';

export default function CreateNewDeck(){
    return(
        <>
            <BreadCrumbNav string="Create Deck"/>
            <h1>Create Deck</h1>
            <CreateDeckForm />
        </>
    );
}