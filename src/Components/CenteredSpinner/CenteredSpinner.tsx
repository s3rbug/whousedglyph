import { Spinner } from "react-bootstrap";

export const CenteredSpinner = () => {
	return (
		<div className="d-flex justify-content-center my-3">
			<Spinner animation="border" variant="primary" />
		</div>
	);
};
