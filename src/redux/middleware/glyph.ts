import { uiActions } from "./../slices/ui";
import { glyphActions } from "./../slices/glyph";
import { glyphApi } from "../../api/glyphApi";
import { AppThunkType } from "../store/store";
import { AxiosError, HttpStatusCode } from "axios";

export const setGlyphs =
	(matchId: string, setUrlMatchId?: (id: string) => void): AppThunkType =>
	async (dispatch) => {
		dispatch(uiActions.setIsLoading({ isLoading: true }));
		dispatch(uiActions.setError({ error: null }));
		dispatch(uiActions.setWarning({ warning: null }));
		return glyphApi
			.getGlyphs(matchId)
			.then((response) => {
				if (response.status === HttpStatusCode.Accepted) {
					dispatch(
						uiActions.setWarning({
							warning: {
								message: `Match ${matchId} is still parsing! Try again later`,
								header: "Parsing",
							},
						})
					);
					return;
				}
				dispatch(glyphActions.setGlyphs({ newGlyphs: response.data }));
				dispatch(glyphActions.setMatchId({ matchId }));
				if (setUrlMatchId) {
					setUrlMatchId(matchId);
				}
			})
			.catch((error: AxiosError) => {
				dispatch(glyphActions.clearGlyphs());
				dispatch(glyphActions.setMatchId({ matchId: null }));
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
