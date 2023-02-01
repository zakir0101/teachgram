import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";

function AddClass(props) {
    let currency_s = 'SDG', payment_s = 0
    let name = " "
    let cycleDate_s = new Date().toJSON().slice(0, 10)
    let lessonDate_s = new Date().toJSON().slice(0, 10) , lessonDuration_s = 0
    if (props.edit) {
        name = props.selected.name
        cycleDate_s = props.selected.date
        lessonDate_s = props.selected.date
        lessonDuration_s = props.selected.duration
        payment_s = props.selected.payment_rate
        currency_s = props.selected.currency

    } else {
        name = ""
    }
    let [cycleDate, setCycleDate] = useState(cycleDate_s)
    let [classname, setClassname] = useState(name)
    let [payment, setPayment] = useState(payment_s)
    let [currency, setCurrency] = useState(currency_s)

    let [lessonDate, setLessonDate] = useState(lessonDate_s)
    let [lessonDuration, setLessonDuration] = useState(lessonDuration_s)


    let handleOk, handleChange
    let form;
    switch (props.mode) {


        case "Class":


            handleChange = (event) => {
                if (event.target.type === "number")
                    setPayment(event.target.value)
                else
                    setClassname(event.target.value)
            }
            let handleChangeCurrency = (e) => {
                setCurrency(e.target.value)
            }
            handleOk = (event) => {
                if (!classname)
                    return;

                setClassname("")
                if (props.edit)
                    props.handleEditOk(event, classname ,payment ,currency)
                else
                    props.handleAddOk(event , classname ,payment ,currency)
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control value={classname} onChange={handleChange} type={"text"} placeholder={""}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Payment \ hour</Form.Label>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control type={"number"} value={payment} onChange={handleChange} className={"w-50"}/>
                            <Form.Select value={currency} onChange={handleChangeCurrency} className={""}>
                                <option value="SDG">SDG</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>

                            </Form.Select>
                        </InputGroup>
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

                setCycleDate(new Date().toJSON().slice(0, 10))
                if (props.edit)
                    props.handleEditOk(cycleDate)
                else
                    props.handleAddOk(cycleDate)
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Cycle Date</Form.Label>
                        <Form.Control value={cycleDate} onChange={handleChange} type={"date"}/>
                    </FormGroup>
                    <p className={"small text-danger"}></p>
                </Form>

            break


        case "ClassStandard":


            handleChange = (event) => {
                if (event.target.value === "none")
                    return;
                props.setSelected2(props.standardList[event.target.value])
            }

            handleOk = (event) => {

                if (!props.selected2.name)
                    return;
                console.log(props.selected2)
                props.handleAddOk()
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>select Standard</Form.Label>
                        <Form.Select onChange={handleChange}>
                            <option value="none"> none</option>
                            {props.standardList.map((standard =>
                                    <option value={props.standardList.indexOf(standard)}>{standard.name}</option>
                            ))}
                        </Form.Select>
                    </FormGroup>
                    <p className={"small text-danger"}></p>
                </Form>

            break


        case "Lesson":


            handleChange = (event) => {
                if (event.target.type === "date" )
                    setLessonDate(event.target.value)
                else
                    setLessonDuration(event.target.value)
            }
            handleOk = (event) => {
                if (!cycleDate)
                    return;

                setLessonDate(new Date().toJSON().slice(0, 10))
                if (props.edit)
                    props.handleEditOk(lessonDate,lessonDuration)
                else
                    props.handleAddOk( lessonDate , lessonDuration)
            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Lesson Date</Form.Label>
                        <Form.Control value={lessonDate} onChange={handleChange} type={"date"}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Lesson Duration</Form.Label>
                        <Form.Control value={lessonDuration} onChange={handleChange} type={"number"}/>
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