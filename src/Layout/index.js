import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import NotFound from "./Screens/NotFound";
import Home from "./Screens/Home";
import CreateNewDeck from "./Screens/CreateNewDeck";
import Deck from './Screens/Deck';
import EditDeck from "./Screens/EditDeck";
import AddCard from "./Screens/AddCard";
import Study from './Screens/Study';
import EditCard from "./Screens/EditCard";

function Layout() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home refresh={refresh} setRefresh={setRefresh} />
          </Route>
          <Route exact path="/decks/new">
            <CreateNewDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck refresh={refresh} setRefresh={setRefresh} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study refresh={refresh} setRefresh={setRefresh} />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
