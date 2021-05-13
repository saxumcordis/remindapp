import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { Container } from "./components/Container";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Container>
        <Menu />
      </Container>
    </BrowserRouter>
  );
};

export default App;
