import { Route, Routes } from "react-router-dom";
import GlyphUsers from "../Glyphs/Glyphs";
import MatchDetailsForm from "../MatchDetailsForm/MatchDetailsForm";
import Title from "../Title/Title";

const App = () => {
  return (
    <>
      <Title/>
      <MatchDetailsForm/>
      <Routes>
        <Route index element={<GlyphUsers/>} />
      </Routes>
    </>
  );
}

export default App;
