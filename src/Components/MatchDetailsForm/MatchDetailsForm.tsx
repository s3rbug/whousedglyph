import { useForm } from "react-hook-form"
import Button from "react-bootstrap/Button"
import { Form } from "react-bootstrap";
import { setGlyphs } from "../../redux/middleware/glyph";
import { useTypedDispatch, useTypedSelector } from "../../redux/store/store";
import { glyphActions } from "../../redux/slices/glyph";
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
    <div className={"d-flex justify-content-center align-items-center mt-3"}>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="d-flex justify-content-center">
                <Form.Control
                    className={"ps-3 me-2 rounded-pill w-auto"}
                    type="text"
                    placeholder="Enter match id" 
                    {...register("matchId", {required: "Enter match id"})}
                />
                <Button 
                    variant="primary" 
                    type="submit"
                >
                    Submit
                </Button>
            </Form.Group>
        </Form>
    </div>
    )
}
export default MatchDetailsForm