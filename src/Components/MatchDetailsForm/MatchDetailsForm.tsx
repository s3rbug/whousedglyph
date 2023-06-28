import { useForm } from "react-hook-form";import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { setGlyphs } from "../../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { glyphActions } from "../../redux/slices/glyph";
import { useEffect } from "react";
import { useUrlMatchId } from "../../hooks/useUrlMatchId";
import clsx from "clsx";
import classes from "./MatchDetailsForm.module.css"

type FormDataType = {
	matchId: string;
};

const MatchDetailsForm = () => {
	const { register, handleSubmit, reset } = useForm<FormDataType>({});
	const { urlMatchId, setUrlMatchId } = useUrlMatchId();
	const isLoading = useTypedSelector(state => state.ui.isLoading)
	const dispatch = useTypedDispatch();

	const onSubmit = (data: FormDataType) => {
		dispatch(glyphActions.clearGlyphs());
        setUrlMatchId(data.matchId)
		dispatch(setGlyphs(data.matchId));
	};

	useEffect(() => {
		if (urlMatchId) {
			reset();
		}
	}, [urlMatchId, reset]);

	return (
		<div className={"d-flex justify-content-center align-items-center mt-3"}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="d-flex justify-content-center">
					<Form.Control
						className={clsx(classes.input, "ps-3 me-2 rounded-pill w-auto")}
						type="text"
						placeholder="Enter match id"
						{...register("matchId", { required: "Enter match id" })}
					/>
					<Button className="rounded-pill" variant="primary" type="submit" disabled={isLoading}>
						Submit
					</Button>
				</Form.Group>
			</Form>
		</div>
	);
};
export default MatchDetailsForm;
