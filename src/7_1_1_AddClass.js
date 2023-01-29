import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

function AddClass(props) {
    let name = " "
    let title = " "
    let cycleDate_s = new Date().toJSON().slice(0,10)
    let lessonDate_s = new Date().toJSON().slice(0,10)
    let lessonDuration_s = 0
    console.log("selected")
    if (props.edit) {
        name = props.selected.name
        cycleDate_s=props.selected.date
        lessonDate_s=props.selected.date
        lessonDuration_s = props.selected.duration
    } else {
        name = ""
    }

    let [classname, setClassname] = useState(name)
    let [cycleDate, setCycleDate] = useState(cycleDate_s)
    let [lessonDate, setLessonDate] = useState(lessonDate_s)
    let [lessonDuration, setLessonDuration] = useState(lessonDuration_s)



    let handleOk ,handleChange
    let form;
    switch (props.mode) {


        case "Class":

            handleChange = (event) => {
                setClassname(event.target.value)
            }
            handleOk = (event) => {
                if (!classname)
                    return;

                setClassname("")
                if (props.edit)
                    props.handleEditOk(classname)
                else
                    props.handleAddOk(classname)
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control value={classname} onChange={handleChange} type={"text"} placeholder={""}/>
                    </FormGroup>
                    <p className={"small text-danger"}></p>
                </Form>

            break

        case "Cycle":


            handleChange = (event) => {
                setCycleDate(event.target.value)
            }
            handleOk = (event) => {
                if (!cycleDate)
                    return;

                setCycleDate(new Date().toJSON().slice(0,10))
                if (props.edit)
                    props.handleEditOk(cycleDate)
                else
                    props.handleAddOk(cycleDate)
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control value={cycleDate} onChange={handleChange} type={"date"} />
                    </FormGroup>
                    <p className={"small text-danger"}></p>
                </Form>

            break

    }

    return (

        <Modal centered show={props.add} onHide={props.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {form}
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex-grow-1 d-flex gap-2 align-items-center justify-content-end "}>
                    <Button variant="secondary" onClick={props.handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleOk}>
                        OK
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>)
}

export {AddClass}