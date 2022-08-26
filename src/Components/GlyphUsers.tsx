import { useEffect } from "react"
import { Alert, Card, Spinner } from "react-bootstrap"
import { useSearchParams, createSearchParams } from "react-router-dom"
import { setGlyphs } from "../redux/middleware/glyph"
import { glyphActions } from "../redux/slices/glyph"
import { uiActions } from "../redux/slices/ui"
import { useTypedDispatch, useTypedSelector } from "../redux/store/store"
import { GlyphType } from "../types/glyph"
import CustomLink from "../utils/CustomLink"
import classes from "./GlyphUsers.module.css"

type GlyphProps = {
    glyph: GlyphType
}

const Glyph = ({ glyph }: GlyphProps) => {
    return (
    <Card>
        <Card.Img src={require(`../assets/hero_${glyph.heroId}.png`)} alt={glyph.heroName}/>
        <Card.Body>
            <Card.Text className={classes.nicknameText}>
                <span>
                    {`${glyph.nickname}`} 
                </span>
                <span className={classes.icons}>
                    <CustomLink href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}>
                        <img src={require(`../assets/steam.png`)} alt="steam" />
                    </CustomLink>
                    <CustomLink href={`https://stratz.com/players/${glyph.dotaUserId}`}>
                        <img width="30px" height="30px" src={require(`../assets/stratz.png`)} alt="stratz" />
                    </CustomLink>
                    <CustomLink href={`https://www.dotabuff.com/players/${glyph.dotaUserId}`}>
                        <img src={require(`../assets/dotabuff.png`)} alt="dotabuff" />
                    </CustomLink>
                    <CustomLink href={`https://www.opendota.com/players/${glyph.dotaUserId}`}>
                        <img src={require(`../assets/opendota.png`)} alt="opendota" />
                    </CustomLink>
                </span>
            </Card.Text>
            <Card.Text>
                {'Glyph time: '}
                <span className={classes.bold}>
                    {`${glyph.time}`}
                </span>
            </Card.Text>
        </Card.Body>
    </Card>
    )
}

const GlyphUsers = () => {
    const glyphs = useTypedSelector(state => state.glyph.glyphs)
    const isLoading = useTypedSelector(state => state.ui.isLoading)
    const error = useTypedSelector(state => state.ui.error)
    const queryMatchId = useTypedSelector(state => state.glyph.queryMatchId)
    const dispatch = useTypedDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const matchId = searchParams.get("replay")
        if(matchId){
            dispatch(uiActions.setIsLoading({isLoading: true}))   
            dispatch(glyphActions.setQueryMatchId({queryMatchId: matchId}))
            dispatch(setGlyphs(matchId)) 
        }
    }, [searchParams, dispatch])
    
    useEffect(() => {
        if(queryMatchId){
            setSearchParams(createSearchParams({replay: queryMatchId}))
        }
        else{            
            searchParams.delete("replay")
            setSearchParams(searchParams)
        }
    }, [queryMatchId, searchParams, setSearchParams])

    if(isLoading){
        return (
            <div className={classes.center}>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }
    else if(error){
        return (
            <div className={classes.center}>
                <Alert variant="danger">
                    <Alert.Heading>
                        Not found
                    </Alert.Heading>
                    <span>
                        {error}
                    </span>
                </Alert>
            </div>
        )
    }
    return (
        <div className={classes.root}>
            {
                glyphs.map((glyph, glyphIndex) => {
                    return (
                        <Glyph key={`glyph-key-${glyphIndex}`} glyph={glyph}/>
                    )
                })
            }
        </div>
    )
}

export default GlyphUsers