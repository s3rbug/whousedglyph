import classes from "./MatchDetailsForm.module.css"
import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap";
import { setGlyphs } from "../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../redux/store/store";
import { glyphActions } from "../redux/slices/glyph";
import { useEffect } from "react";

type FormDataType = {
    matchId: string;
}

const MatchDetailsForm = () => {
    const {register, handleSubmit, reset} = useForm<FormDataType>({})
    const dispatch = useTypedDispatch()
    const queryMatchId = useTypedSelector(state => state.glyph.queryMatchId)
    const onSubmit = (data: FormDataType) => {
        dispatch(glyphActions.clearGlyphs())
        dispatch(setGlyphs(data.matchId))
    }

    useEffect(() => {
        if(queryMatchId){
            reset()
        }
    }, [queryMatchId, reset])

    return (
    <div className={classes.details}>
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
    </div>
    )
}
export default MatchDetailsForm