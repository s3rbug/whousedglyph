import classes from "./MatchDetailsForm.module.css"
import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap";
import { setGlyphs } from "../redux/middleware/glyph";
import { useTypedDispatch } from "../redux/store/store";
import { uiActions } from "../redux/slices/ui";
import { glyphActions } from "../redux/slices/glyph";

type FormDataType = {
    matchId: string;
}

const MatchDetailsForm = () => {
    const {register, handleSubmit} = useForm<FormDataType>({})
    const dispatch = useTypedDispatch()
    
    const onSubmit = (data: FormDataType) => {
        dispatch(uiActions.setIsLoading({isLoading: true}))
        dispatch(uiActions.setError({error: null}))
        dispatch(glyphActions.clearGlyphs())
        dispatch(setGlyphs(data.matchId))        
    }

    return (
    <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className={classes.formGroup}>
            <Form.Control
                className={classes.lineedit} 
                type="text"
                placeholder="Enter match id" 
                {...register("matchId", {required: "Enter match id"})}
            />
            <Button 
                variant="primary" 
                type="submit" 
                className={classes.button}
            >
                Submit
            </Button>
        </Form.Group>
    </Form>
    )
}
export default MatchDetailsForm