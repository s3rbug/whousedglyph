import { Card, Spinner } from "react-bootstrap"
import { useTypedSelector } from "../redux/store/store"
import { GlyphType } from "../types/glyph"
import classes from "./GlyphUsers.module.css"

type GlyphProps = {
    glyph: GlyphType
}

const Glyph = ({glyph}: GlyphProps) => {
    return (
    <Card className={classes.glyphCard}>
        <Card.Img src={require(`../assets/hero_${glyph.heroId}.png`)} alt={glyph.heroName}/>
        <Card.Body>
            <Card.Text>
                {/* <a 
                href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}
                target="_blank"
                rel="noreferrer noopener">
                    {`${glyph.nickname}`} 
                </a> */}
                {`${glyph.nickname} used glyph`}
            </Card.Text>
            <Card.Text>{`Glyph time: ${glyph.time}`}</Card.Text>
        </Card.Body>
    </Card>
    )
}

const GlyphUsers = () => {
    const glyphs = useTypedSelector(state => state.glyph.glyphs)
    const isLoading = useTypedSelector(state => state.ui.isLoading)
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