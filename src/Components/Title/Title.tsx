import { NavLink } from "react-router-dom"
import { glyphActions } from "../../redux/slices/glyph"
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store"
import MatchDetails from "../MatchDetails/MatchDetails"
import classes from "./Title.module.css"

const Title = () => {
    const dispatch = useTypedDispatch()
    const queryMatchId = useTypedSelector(state => state.glyph.queryMatchId)
    const isLoading = useTypedSelector(state => state.ui.isLoading)
    return (
        <div className="d-flex justify-content-center mt-3">
            {
            queryMatchId && !isLoading
            ? <MatchDetails />
            : <NavLink onClick={() => {
                dispatch(glyphActions.clearGlyphs())
            }} 
            to=""
            >
                <img className={classes.logo} src={require("../../assets/logo.png")} alt="logo" />
            </NavLink>
            }    
        </div>
    )
}

export default Title