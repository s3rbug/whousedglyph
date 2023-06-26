import { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSearchParams, createSearchParams } from "react-router-dom";
import { setGlyphs } from "../../redux/middleware/glyph";
import { glyphActions } from "../../redux/slices/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import Glyph from "../Glyph/Glyph";
import classes from "./GlyphUsers.module.css";

const GlyphUsers = () => {
	const glyphs = useTypedSelector((state) => state.glyph.glyphs);
	const isLoading = useTypedSelector((state) => state.ui.isLoading);
	const error = useTypedSelector((state) => state.ui.error);
	const queryMatchId = useTypedSelector((state) => state.glyph.queryMatchId);
	const dispatch = useTypedDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		const matchId = searchParams.get("replay");
		if (matchId && queryMatchId !== matchId) {
			dispatch(glyphActions.setQueryMatchId({ queryMatchId: matchId }));
			dispatch(setGlyphs(matchId));
		}
	}, [searchParams, dispatch]);

	useEffect(() => {
		if (queryMatchId) {
			setSearchParams(createSearchParams({ replay: queryMatchId }));
		} else {
			searchParams.delete("replay");
			setSearchParams(searchParams);
		}
	}, [queryMatchId, searchParams, setSearchParams]);

	if (isLoading) {
		return (
			<div className={classes.center}>
				<Spinner animation="border" variant="primary" />
			</div>
		);
	} else if (error) {
		return (
			<div className={"d-flex justify-content-center mt-3 w-100"}>
				<Alert variant="danger">
					<Alert.Heading>{error.header}</Alert.Heading>
					<span>{error.message}</span>
				</Alert>
			</div>
		);
	} else if (queryMatchId) {
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
