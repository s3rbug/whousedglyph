import clsx from "clsx";
import MatchDetailsForm from "../MatchDetailsForm/MatchDetailsForm";
import Title from "../Title/Title";
import classes from "./Header.module.css";
import { BuyMeCoffee } from "../BuyMeCoffee/BuyMeCoffee";

const Header = () => {
	return (
		<div
			className={clsx(
				"d-flex flex-column gap-3 m-3 flex-grow-1 justify-content-center align-items-center",
				classes.header
			)}
		>
			<Title />
			<MatchDetailsForm />
			<div className={classes.coffee}>
				<BuyMeCoffee />
			</div>
		</div>
	);
};

export default Header;
