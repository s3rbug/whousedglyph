import clsx from "clsx";
import MatchDetailsForm from "../MatchDetailsForm/MatchDetailsForm";
import Title from "../Title/Title";
import classes from "./Header.module.css";

const Header = () => {
	return (
		<div className={clsx("d-flex flex-column align-items-center justify-content-center gap-3 m-3", classes.header)}>
			<Title />
			<MatchDetailsForm />
		</div>
	);
};

export default Header;
