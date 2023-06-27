import { uiActions } from "./../slices/ui";
import { glyphActions } from "./../slices/glyph";
import { glyphApi } from "../../api/glyphApi";
import { AppThunkType } from "../store/store";
import { AxiosError } from "axios";

export const setGlyphs =
	(matchId: string): AppThunkType =>
	async (dispatch) => {
		dispatch(uiActions.setIsLoading({ isLoading: true }));
		dispatch(uiActions.setError({ error: null }));
		return glyphApi
			.getGlyphs(matchId)
			.then((response) => {
				dispatch(glyphActions.setGlyphs({ newGlyphs: response.data }));
				dispatch(glyphActions.setMatchId({ matchId }));
			})
			.catch((error: AxiosError) => {
				dispatch(glyphActions.clearGlyphs());
				dispatch(glyphActions.setMatchId({ matchId: null }));
				if (error.response?.status === 503) {
					dispatch(
						uiActions.setError({
							error: {
								message: `Match '${matchId}' is still parsing, try again in a second`,
								header: "Whoops",
							},
						})
					);
					return;
				}
				dispatch(
					uiActions.setError({
						error: {
							message: `Match '${matchId}' is not found`,
							header: "Not found",
						},
					})
				);
			})
			.finally(() => {
				dispatch(uiActions.setIsLoading({ isLoading: false }));
			});
	};
