import React, { useState } from 'react';
import BreadCrumbNav from '../Components/BreadCrumbNav';
import CreateDeckForm from '../Components/CreateDeckForm';

export default function CreateNewDeck(){
    const [formData, setFormData] = useState({ name: "", description: "" });
    return(
        <>
            <BreadCrumbNav string="Create Deck"/>
            <h1>Create Deck</h1>
            <CreateDeckForm formData={formData} setFormData={setFormData} />
        </>
    );
}