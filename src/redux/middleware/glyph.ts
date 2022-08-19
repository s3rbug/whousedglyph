import { uiActions } from './../slices/ui';
import { glyphActions } from './../slices/glyph';
import { glyphApi } from "../../api/glyphApi";
import { AppThunkType } from "../store/store";

export const setGlyphs = (
    matchId: string
): AppThunkType => async (dispatch) => {
    return glyphApi.getGlyphs(matchId).then(response => {
        if(response.status === 200){
            dispatch(glyphActions.setGlyphs({newGlyphs: response.data}))
            dispatch(glyphActions.setMatchId({matchId}))
        }
    })
    .then(() => {
        dispatch(uiActions.setIsLoading({isLoading: false}))
    })
    .catch((error) => {
        dispatch(uiActions.setIsLoading({isLoading: false}))
        console.log(`setGlyphs: ${error}`);
    })
}