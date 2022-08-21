import classes from "./MatchDetailsForm.module.css"
import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap";
import { setGlyphs } from "../redux/middleware/glyph";
import { useTypedDispatch } from "../redux/store/store";
import { uiActions } from "../redux/slices/ui";
import { glyphActions } from "../redux/slices/glyph";
import { useNavigate } from "react-router-dom";

type FormDataType = {
    matchId: string;
}

const MatchDetailsForm = () => {
    const {register, handleSubmit} = useForm<FormDataType>({})
    const dispatch = useTypedDispatch()
    const navigate = useNavigate();
    
    const onSubmit = (data: FormDataType) => {
        dispatch(uiActions.setIsLoading({isLoading: true}))
        dispatch(glyphActions.clearGlyphs())
        dispatch(setGlyphs(data.matchId))
        navigate(`matches/${data.matchId}`)
    }

    return (
    <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className={classes.formGroup}>
            <Form.Control type="text" className={classes.lineedit} placeholder="Enter match id" {...register("matchId", {required: "Enter match id"})}/>
            <Button variant="primary" type="submit" className={classes.button}>
                Submit
            </Button>
        </Form.Group>
    </Form>
    )
}
export default MatchDetailsForm