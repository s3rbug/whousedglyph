import { uiActions } from './../slices/ui';
import { glyphActions } from './../slices/glyph';
import { glyphApi } from "../../api/glyphApi";
import { AppThunkType } from "../store/store";
import { AxiosError } from 'axios';

export const setGlyphs = (
    matchId: string
): AppThunkType => async (dispatch) => {
    return glyphApi.getGlyphs(matchId).then(response => {
        if(response.status === 200){
            dispatch(glyphActions.setGlyphs({newGlyphs: response.data}))
            dispatch(glyphActions.setMatchId({matchId}))
            dispatch(uiActions.setIsLoading({isLoading: false}))
        }
    })
    .catch((error: AxiosError) => {
        if(error?.response?.status === 503){            
            setTimeout(() => {
                dispatch(setGlyphs(matchId))
            }, 30000);
        }
        else {
            dispatch(uiActions.setIsLoading({isLoading: false}))
        }
    })
}