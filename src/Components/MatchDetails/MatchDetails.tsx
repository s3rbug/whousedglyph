import clsx from "clsx";
import { useRef, useState } from "react";
import { Button, Card, Overlay, Tooltip } from "react-bootstrap";
import { useTypedSelector } from "../../redux/store/store";
import CustomLink from "../CustomLink/CustomLink";
import classes from "./MatchDetails.module.css";

import stratzLogo from "../../../public/assets/stratz.png"
import dotabuffLogo from "../../../public/assets/dotabuff.png";
import opendotaLogo from "../../../public/assets/opendota.png";

const MatchDetails = () => {
	const matchId = useTypedSelector((state) => state.glyph.matchId);
	const tooltipTarget = useRef(null);
	const [showTooltip, setShowTooltip] = useState(false);

	const copyMatchIdToClipboard = async () => {
		navigator.clipboard.writeText(matchId || "");
		setShowTooltip(true);
		setTimeout(() => {
			setShowTooltip(false);
		}, 500);
	};

	return (
		<Card className={classes.card}>
			<Card.Body>
				<Card.Title
					ref={tooltipTarget}
					className={clsx(
						classes.title,
						"d-flex flex-column justify-content-evenly ml-auto mr-auto"
					)}
					onClick={copyMatchIdToClipboard}
				>
					{matchId !== null && (
						<Button
							onFocus={(e) => {
								setTimeout(() => {
									e.target.blur();
								}, 500);
							}}
							variant="outline-dark"
							className="fs-3"
						>
							{`${matchId}`}
						</Button>
					)}
				</Card.Title>
				<Card.Text>
					<span
						className={clsx(
							classes.icons,
							"d-flex justify-content-around ps-4 pe-3 mt-3"
						)}
					>
						<CustomLink href={`https://stratz.com/matches/${matchId}`}>
							<img src={stratzLogo} alt="stratz" />
						</CustomLink>
						<CustomLink href={`https://www.dotabuff.com/matches/${matchId}`}>
							<img src={dotabuffLogo} alt="dotabuff" />
						</CustomLink>
						<CustomLink href={`https://www.opendota.com/matches/${matchId}`}>
							<img src={opendotaLogo} alt="opendota" />
						</CustomLink>
					</span>
				</Card.Text>
			</Card.Body>
			<Overlay target={tooltipTarget} show={showTooltip}>
				<Tooltip>Saved to clipboard</Tooltip>
			</Overlay>
		</Card>
	);
};

export default MatchDetails;
