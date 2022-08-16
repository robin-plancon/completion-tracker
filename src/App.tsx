import React from "react";
import "./App.css";
import BossesItem from "./components/bosses/Bosses";
import Categories from "./components/categories/Categories";
import Quests from "./components/quests/Quests";

function App() {
  return (
    <React.Fragment>
      {/* <Header /> */}
      <main>
        <div className="App">
          <Categories />
          <BossesItem />
          <Quests />
        </div>
      </main>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
