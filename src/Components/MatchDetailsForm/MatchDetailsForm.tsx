import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { setGlyphs } from "../../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { glyphActions } from "../../redux/slices/glyph";
import { useEffect } from "react";
import { useUrlMatchId } from "../../hooks/useUrlMatchId";
import clsx from "clsx";
import classes from "./MatchDetailsForm.module.css";

type FormDataType = {
	matchId: string;
};

const MatchDetailsForm = () => {
	const { register, handleSubmit, reset } = useForm<FormDataType>({});
	const { urlMatchId, setUrlMatchId } = useUrlMatchId();
	const isLoading = useTypedSelector((state) => state.ui.isLoading);
	const dispatch = useTypedDispatch();

	const onSubmit = (data: FormDataType) => {
		dispatch(glyphActions.clearGlyphs());		
		dispatch(setGlyphs(data.matchId, setUrlMatchId));
	};

	useEffect(() => {
		if (urlMatchId) {
			reset();
		}
	}, [urlMatchId, reset]);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="d-flex gap-2">
				<Form.Control
					className={clsx(classes.input, "rounded-pill flex-grow-1")}
					type="text"
					placeholder="Enter match id"
					{...register("matchId", { required: "Enter match id" })}
				/>
				<Button
					className="rounded-pill"
					variant="primary"
					type="submit"
					disabled={isLoading}
				>
					Submit
				</Button>
			</Form.Group>
		</Form>
	);
};
export default MatchDetailsForm;
