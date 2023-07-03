import { useEffect } from "react";
import { setGlyphs } from "../../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import Glyph from "../Glyph/Glyph";
import classes from "./Glyphs.module.css";
import { useUrlMatchId } from "../../hooks/useUrlMatchId";
import { CenteredSpinner } from "../CenteredSpinner/CenteredSpinner";
import clsx from "clsx";
import CenteredAlert from "../CenteredAlert/CenteredAlert";

const GlyphUsers = () => {
	const glyphs = useTypedSelector((state) => state.glyph.glyphs);
	const matchId = useTypedSelector((state) => state.glyph.matchId);
	const isLoading = useTypedSelector((state) => state.ui.isLoading);
	const error = useTypedSelector((state) => state.ui.error);
	const warning = useTypedSelector((state) => state.ui.warning);

	const dispatch = useTypedDispatch();

	const { urlMatchId } = useUrlMatchId();

	useEffect(() => {
		if (urlMatchId && matchId === null) {
			dispatch(setGlyphs(urlMatchId));
		}
	}, [urlMatchId, matchId, dispatch]);

	if (isLoading) {
		return <CenteredSpinner />;
	}

	if (error) {
		return <CenteredAlert variant="danger" info={error} />;
	}

	if (warning) {
		return <CenteredAlert variant="warning" info={warning} />;
	}

	if (urlMatchId) {
		return (
			<>
				<div className={clsx(classes.table, "px-3 pb-3")}>
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
