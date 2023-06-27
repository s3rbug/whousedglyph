import { NavLink } from "react-router-dom";
import { glyphActions } from "../../redux/slices/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import MatchDetails from "../MatchDetails/MatchDetails";
import classes from "./Title.module.css";
import { useUrlMatchId } from "../../hooks/useUrlMatchId";
import logo from "../../assets/logo.png"

const Title = () => {
	const dispatch = useTypedDispatch();
	const isLoading = useTypedSelector((state) => state.ui.isLoading);

	const { urlMatchId } = useUrlMatchId();

	return (
		<div className="d-flex justify-content-center mt-3">
			{urlMatchId && !isLoading ? (
				<MatchDetails />
			) : (
				<NavLink
					onClick={() => {
						dispatch(glyphActions.clearGlyphs());
					}}
					to=""
				>
					<img
						className={classes.logo}
						src={logo}
						alt="logo"
					/>
				</NavLink>
			)}
		</div>
	);
};

export default Title;
