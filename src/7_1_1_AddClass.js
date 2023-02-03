import {Button, Form, FormGroup, InputGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Typeahead} from 'react-bootstrap-typeahead'; // ES2015
import 'react-bootstrap-typeahead/css/Typeahead.css';


import 'react-bootstrap-typeahead/css/Typeahead.css';
import './styles.css';
import {capitalize} from "./util";

function AddClass(props) {
    let currency_s = 'SDG', payment_s = 0
    let name = " "
    let cycleDate_s = new Date().toJSON().slice(0, 10)
    let lessonDate_s = new Date().toJSON().slice(0, 10), lessonDuration_s = 0
    let standard_s = "", subject_s = "" , unit_s="" , text_s = ""
    if (props.edit) {
        name = props.selected.name
        cycleDate_s = props.selected.date
        lessonDate_s = props.selected.date
        lessonDuration_s = props.selected.duration
        payment_s = props.selected.payment_rate
        currency_s = props.selected.currency
        standard_s = props.selected.name;
        unit_s = props.selected.name
        text_s = props.selected.text
    } else {
        name = ""
    }
    let [cycleDate, setCycleDate] = useState(cycleDate_s)
    let [classname, setClassname] = useState(name)
    let [payment, setPayment] = useState(payment_s)
    let [currency, setCurrency] = useState(currency_s)
    let [error , setError ] = useState("")
    let [lessonDate, setLessonDate] = useState(lessonDate_s)
    let [lessonDuration, setLessonDuration] = useState(lessonDuration_s)
    let [standardName, setStandardName] = useState(standard_s)
    let [subject, setSubject] = useState(subject_s)
    let [unitName, setUnitName] = useState(unit_s)
    let [objectiveText, setObjectiveText] = useState(text_s)


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
                    props.handleEditOk(event, classname, payment, currency)
                else
                    props.handleAddOk(event, classname, payment, currency)
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
                if (event.target.type === "date")
                    setLessonDate(event.target.value)
                else
                    setLessonDuration(event.target.value)
            }
            handleOk = (event) => {
                if (!cycleDate)
                    return;

                setLessonDate(new Date().toJSON().slice(0, 10))
                if (props.edit)
                    props.handleEditOk(lessonDate, lessonDuration)
                else
                    props.handleAddOk(lessonDate, lessonDuration)
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


        case "Standard":


            let handleChange1 = (event) => {
                setStandardName(event.target.value)
            }


            let handleChange2 = (subjects) => {
                let s = subjects[0]
                if(s) {
                    if (s.label) {
                        setSubject(s.label)
                    }else{
                        setSubject(subjects[0])
                    }
                }
            }

            handleOk = (event) => {
                if (!standardName ) {
                    setError("you have to enter a standard name")
                    return;
                }

                if (!subject ) {
                    setError("you have to select a subject")
                    return;
                }

                if (props.edit)
                    props.handleEditOk(event,standardName,subject)
                else
                    props.handleAddOk(event,standardName,subject)


            }

            form =
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Standard Name</Form.Label>
                        <Form.Control value={standardName} onChange={handleChange1} type={"text"}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Subject Name</Form.Label>
                        <Typeahead
                            allowNew
                            id="basic-example"
                            onChange={handleChange2}
                            options={props.subjectList}
                            placeholder="Choose a subject..."
                        /> </FormGroup>
                    <p className={"small text-danger"}>{error  }</p>
                </Form>

            break

        case "Unit":


             handleChange = (event) => {
                setUnitName(event.target.value)
            }


            handleOk = (event) => {
                if (!unitName ) {
                    setError("you have to enter a unit name")
                    return;
                }


                if (props.edit)
                    props.handleEditOk(event,unitName)
                else
                    props.handleAddOk(event,unitName)


            }

            form =
                <Form onClick={e => e.stopPropagation()}>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Unit Name</Form.Label>
                        <Form.Control value={unitName} onChange={handleChange} type={"text"}/>
                    </FormGroup>

                    <p className={"small text-danger"}>{error  }</p>
                </Form>

            break


        case "Objective":


            handleChange = (event) => {
                setObjectiveText(event.target.value)
            }


            handleOk = (event) => {
                if (!objectiveText ) {
                    setError("you have to write an objective")
                    return;
                }

                if (props.edit)
                    props.handleEditOk(event,objectiveText)
                else
                    props.handleAddOk(event,objectiveText)


            }

            form =
                <Form onClick={e => e.stopPropagation()}>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>Objective</Form.Label>
                        <Form.Control as={"textarea"} style={{height: "8.5rem"}} value={objectiveText} onChange={handleChange} />
                    </FormGroup>

                    <p className={"small text-danger"}>{error  }</p>
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