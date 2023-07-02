import { Alert } from "react-bootstrap";
import { AlertType } from "../../types/glyph";

type PropsType = {
	info: AlertType;
	variant:
		| "primary"
		| "secondary"
		| "success"
		| "danger"
		| "warning"
		| "info"
		| "light"
		| "dark";
};

const CenteredAlert = ({ info, variant }: PropsType) => {
	if (!info) {
		return null;
	}

	return (
		<div className={"d-flex justify-content-center w-100"}>
			<Alert variant={variant}>
				<Alert.Heading>{info.header}</Alert.Heading>
				<span>{info.message}</span>
			</Alert>
		</div>
	);
};

export default CenteredAlert;
