import { Card } from "react-bootstrap";
import { GlyphType, TeamType } from "../../types/glyph";
import CustomLink from "../CustomLink/CustomLink";
import classes from "./Glyph.module.css";
import { config } from "../../utils/config";

import radiantImage from "../../../public/assets/radiant.png";
import direImage from "../../../public/assets/dire.png";
import steamLogo from "../../../public/assets/steam.png";
import stratzLogo from "../../../public/assets/stratz.png";
import dotabuffLogo from "../../../public/assets/dotabuff.png";
import opendotaLogo from "../../../public/assets/opendota.png";

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
					src={`/${config.BASE_URL}/assets/hero_${glyph.heroId}.png`}
					alt={glyph.heroName}
				/>
			</CustomLink>
			<Card.Body className="d-flex flex-column justify-content-between">
				<Card.Text className={classes.nicknameText}>
					<span>
						<img
							className={classes.teamType}
							src={getTeamTypeImage()}
							alt="Team type"
						/>
						<span className={classes.wordBreakAll}>{`${glyph.nickname}`}</span>
					</span>
					<span className={classes.icons}>
						<CustomLink
							href={`https://steamcommunity.com/profiles/${glyph.steamId}/`}
						>
							<img src={steamLogo} alt="steam" />
						</CustomLink>
						<CustomLink href={`https://stratz.com/players/${glyph.dotaUserId}`}>
							<img src={stratzLogo} alt="stratz" />
						</CustomLink>
						<CustomLink
							href={`https://www.dotabuff.com/players/${glyph.dotaUserId}`}
						>
							<img src={dotabuffLogo} alt="dotabuff" />
						</CustomLink>
						<CustomLink
							href={`https://www.opendota.com/players/${glyph.dotaUserId}`}
						>
							<img src={opendotaLogo} alt="opendota" />
						</CustomLink>
					</span>
				</Card.Text>
				<Card.Text>
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
