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
import { FilteringContextProvider } from "./service/memoCards/useFiltering";
import { MemoCardContextProvider } from "./service/memoCards/useMemoCard";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Switch>
          <Route exact path="/">
            <FilteringContextProvider>
              <MemoCardsContextProvider>
                <Controls />
                <Dashboard />
                <PersistMemoCards />
              </MemoCardsContextProvider>
            </FilteringContextProvider>
          </Route>
          <Route path="/memo/:id">
            <MemoCardsContextProvider>
              <MemoCardContextProvider>
                <MemoPage />
                <PersistMemoCards />
              </MemoCardContextProvider>
            </MemoCardsContextProvider>
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
