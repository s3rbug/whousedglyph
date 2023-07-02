import { Card } from "react-bootstrap";
import { GlyphType, TeamType } from "../../types/glyph";
import CustomLink from "../IconLink/CustomLink/CustomLink";
import classes from "./Glyph.module.css";
import { config } from "../../utils/config";
import IconLink from "../IconLink/IconLink";
import radiantImage from "../../assets/radiant.png";
import direImage from "../../assets/dire.png";
import steamLogo from "../../assets/steam.png";
import stratzLogo from "../../assets/stratz.png";
import dotabuffLogo from "../../assets/dotabuff.png";
import opendotaLogo from "../../assets/opendota.png";

type PropsType = {
	glyph: GlyphType;
};

const Glyph = ({ glyph }: PropsType) => {
	const getTeamTypeImage = (): string => {
		return glyph.teamType === TeamType.Dire ? direImage : radiantImage;
	};

	const getHeroLink = (): string => {
		return glyph.heroName === "unknown"
			? ""
			: `https://dota2.fandom.com/wiki/${glyph.heroName}`;
	};

	return (
		<Card className={classes.card}>
			<CustomLink href={getHeroLink()}>
				<Card.Img
					src={`/${config.BASE_URL}/heroes/hero_${glyph.heroId}.png`}
					alt={glyph.heroName}
				/>
			</CustomLink>
			<Card.Body className="d-flex flex-column justify-content-between gap-3">
				<Card.Text className="fs-4 mb-0">
					<span>
						<img
							className={classes.teamType}
							src={getTeamTypeImage()}
							alt="Team type"
						/>
						<span className={classes.wordBreakAll}>{`${glyph.nickname}`}</span>
					</span>
				</Card.Text>
				<Card.Text className="d-flex flex-column gap-2">
					<span className={classes.icons}>
						<IconLink
							href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}
							src={steamLogo}
							alt="steam"
						/>
						<IconLink
							href={`https://stratz.com/players/${glyph.dotaUserId}`}
							src={stratzLogo}
							alt="stratz"
						/>
						<IconLink
							href={`https://www.dotabuff.com/players/${glyph.dotaUserId}`}
							src={dotabuffLogo}
							alt="dotabuff"
						/>
						<IconLink
							href={`https://www.opendota.com/players/${glyph.dotaUserId}`}
							src={opendotaLogo}
							alt="opendota"
						/>
					</span>
					<span>
						{"Glyph time: "}
						<span className="fw-bold">{`${glyph.time}`}</span>
					</span>
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Glyph;
