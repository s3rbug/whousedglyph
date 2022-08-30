import { uiActions } from './../slices/ui';
import { glyphActions } from './../slices/glyph';
import { glyphApi } from "../../api/glyphApi";
import { AppThunkType } from "../store/store";

export const setGlyphs = (
    matchId: string
): AppThunkType => async (dispatch) => {
    dispatch(uiActions.setIsLoading({isLoading: true}))
    return glyphApi.getGlyphs(matchId).then(response => {
        if(response.status === 200){
            dispatch(glyphActions.setGlyphs({newGlyphs: response.data}))
            dispatch(glyphActions.setMatchId({matchId}))
            dispatch(glyphActions.setQueryMatchId({queryMatchId: matchId}))
            dispatch(uiActions.setIsLoading({isLoading: false}))
        }
    })
    .catch(() => {
        dispatch(uiActions.setIsLoading({isLoading: false}))
        dispatch(uiActions.setError({error: `Match ${matchId} does not exist`}))
        dispatch(glyphActions.setQueryMatchId({queryMatchId: null}))
    })
}