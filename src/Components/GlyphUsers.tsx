import { useEffect } from "react"
import { Card, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { setGlyphs } from "../redux/middleware/glyph"
import { uiActions } from "../redux/slices/ui"
import { useTypedDispatch, useTypedSelector } from "../redux/store/store"
import { GlyphType } from "../types/glyph"
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
                <a 
                href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}
                target="_blank"
                rel="noreferrer noopener">
                    {`${glyph.nickname}`} 
                </a>
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
    const dispatch = useTypedDispatch()
    const {matchId} = useParams<"matchId">()

    useEffect(() => {    
        if(matchId){
            dispatch(uiActions.setIsLoading({isLoading: true}))   
            dispatch(setGlyphs(matchId)) 
        }
    }, [matchId, dispatch])

    return (
        isLoading ? 
        <div className={classes.spinner}>
            <Spinner animation="border" variant="primary" />
        </div>
        :
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