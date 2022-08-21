import { Route, Routes } from "react-router-dom";
import GlyphUsers from "./GlyphUsers";
import MatchDetailsForm from "./MatchDetailsForm";
import Title from "./Title";

const App = () => {
  return (
    <>
      <Title/>
      <MatchDetailsForm/>
      <Routes>
        <Route path="/matches/:matchId" element={<GlyphUsers/>} />
      </Routes>
    </>
  );
}

export default App;
