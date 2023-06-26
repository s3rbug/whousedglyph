import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { setGlyphs } from "../../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import Glyph from "../Glyph/Glyph";
import classes from "./GlyphUsers.module.css";
import { useUrlMatchId } from "../../hooks/useUrlMatchId";
import { CenteredSpinner } from "../CenteredSpinner/CenteredSpinner";

const GlyphUsers = () => {
	const glyphs = useTypedSelector((state) => state.glyph.glyphs);
	const isLoading = useTypedSelector((state) => state.ui.isLoading);
	const matchId = useTypedSelector((state) => state.glyph.matchId);
	const error = useTypedSelector((state) => state.ui.error);

	const dispatch = useTypedDispatch();

	const { urlMatchId } = useUrlMatchId();

	useEffect(() => {
		if (urlMatchId && !matchId) {			
			dispatch(setGlyphs(urlMatchId));
		}
	}, [urlMatchId, matchId, dispatch]);

	if (isLoading) {
		return (
			<CenteredSpinner />
		);
	}
	if (error) {
		return (
			<div className={"d-flex justify-content-center mt-3 w-100"}>
				<Alert variant="danger">
					<Alert.Heading>{error.header}</Alert.Heading>
					<span>{error.message}</span>
				</Alert>
			</div>
		);
	}
	if (urlMatchId) {
		return (
			<>
				<div className={classes.table}>
					{glyphs.map((glyph, glyphIndex) => {
						return <Glyph key={`glyph-key-${glyphIndex}`} glyph={glyph} />;
					})}
				</div>
			</>
		);
	}
	return null;
};

export default GlyphUsers;
