import React from "react";
import "./App.css";
import { Container } from "./components/Container";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { MemoPage } from "./pages/MemoPage";
import { NotFound } from "./components/NotFound";
import {
  MemoCardsContextProvider,
  PersistMemoCards,
} from "./service/memoCards/useMemoCards";
import { Controls } from "./components/Controls";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route exact path="/">
            <MemoCardsContextProvider>
              <Controls />
              <Dashboard />
              <PersistMemoCards />
            </MemoCardsContextProvider>
          </Route>
          <Route path="/memo/:id" component={MemoPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
