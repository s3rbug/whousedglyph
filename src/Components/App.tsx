import GlyphUsers from "./GlyphUsers";
import MatchDetailsForm from "./MatchDetailsForm";
import Title from "./Title";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {   
  }, [dispatch])
  return (
    <>
      <Title/>
      <MatchDetailsForm/>
      <GlyphUsers/>
    </>
  );
}

export default App;
