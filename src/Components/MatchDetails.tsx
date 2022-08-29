import { useRef, useState } from "react"
import { Button, Card, Overlay, Tooltip } from "react-bootstrap"
import { useTypedSelector } from "../redux/store/store"
import CustomLink from "../utils/CustomLink"
import classes from "./MatchDetails.module.css"

const MatchDetails = () => {
    const matchId = useTypedSelector(state => state.glyph.matchId)
    const tooltipTarget = useRef(null)
    const [showTooltip, setShowTooltip] = useState(false)
    const copyMatchIdToClipboard = async () => {
        navigator.clipboard.writeText(matchId)
        setShowTooltip(true)
        setTimeout(() => {
            setShowTooltip(false)
        }, 500)
    }
    return (
        <Card className={classes.card}>
            <Card.Body className={classes.cardBody}>
                <Card.Title ref={tooltipTarget} className={classes.title} onClick={copyMatchIdToClipboard}>
                    <Button onFocus={
                        (e) => {
                            setTimeout(() => {
                                e.target.blur()
                            }, 500)
                        }
                    }
                    variant="outline-dark">
                        {`${matchId}`}
                    </Button>
                </Card.Title>
                <Card.Text>
                <span className={classes.icons}>
                    <CustomLink href={`https://stratz.com/matches/${matchId}`}>
                        <img src={require(`../assets/stratz.png`)} alt="stratz" />
                    </CustomLink>
                    <CustomLink href={`https://www.dotabuff.com/matches/${matchId}`}>
                        <img src={require(`../assets/dotabuff.png`)} alt="dotabuff" />
                    </CustomLink>
                    <CustomLink href={`https://www.opendota.com/matches/${matchId}`}>
                        <img src={require(`../assets/opendota.png`)} alt="opendota" />
                    </CustomLink>
                </span>
                </Card.Text>
            </Card.Body>
            <Overlay target={tooltipTarget} show={showTooltip}>
                <Tooltip>
                    Saved to clipboard        
                </Tooltip>
            </Overlay>
        </Card>
    )
}

export default MatchDetails