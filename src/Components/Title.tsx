import { NavLink } from "react-router-dom"
import { glyphActions } from "../redux/slices/glyph"
import { useTypedDispatch, useTypedSelector } from "../redux/store/store"
import MatchDetails from "./MatchDetails"
import classes from "./Title.module.css"

const Title = () => {
    const dispatch = useTypedDispatch()
    const queryMatchId = useTypedSelector(state => state.glyph.queryMatchId)
    return (
        <div className={classes.root}>
            {
            queryMatchId 
            ? <MatchDetails />
            : <NavLink onClick={() => {
                dispatch(glyphActions.clearGlyphs())
            }} className={classes.link} to="">
                <img src={require("../assets/logo.png")} alt="logo" />
            </NavLink>
            }    
        </div>
    )
}

export default Title