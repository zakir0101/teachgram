import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {ConfirmDelete} from "./ConfirmDelete";
import {AddClass} from "./7_1_1_AddClass";


function ClassCycleList(props) {
    let [error, setError] = useState("")
    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})
    let [cycleList, setCycleList] = useState([])

    let handleSyntaxError = (error) => {
        props.setSyntaxError(error)
    }
    let handleError = (error) => {
        setError(error)
    }


    let getCycleList = () => {

        let msg = {
            type: 'cycle', command: 'get',
            class_id: props.activeClass.id
        }
        post_message_action(msg, handleError, (data) => setCycleList(data), handleSyntaxError)
    }

    useEffect(() => {
        getCycleList()
    }, [props.activeClass])


    let handleAdd = (e) => {
        setSelected({})
        setAdd(true)
    }
    let handleAddOk = (date) => {
        let msg = {
            type: 'cycle', command: 'add', date: date,
            class_id: props.activeClass.id, user_id: props.user.id
        }
        let handelSuccess = (data) => {
            setCycleList(data);
            setSelected({})
            setAdd(false)
        };
        post_message_action(msg, handleError, handelSuccess, handleSyntaxError)

    }
    let handleEdit = () => {
        if (add === true)
            return;
        setEdit(true)
        setAdd(true)
    }
    let handleEditOk = (newDate) => {
        let msg = {
            type: 'cycle', command: 'edit', cycle_id: selected.id,
            class_id: props.activeClass.id, date: newDate,
            user_id: props.user.id
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setCycleList(data);
        }
        post_message_action(msg, handleError, handelSuccess, handleSyntaxError)
    }


    let handleDelete = () => {
        setDel(true)
    }
    let handleDeleteOk = () => {

        let msg = {
            type: 'cycle', command: 'del',
            cycle_id: selected.id,
            class_id: props.activeClass.id, user_id: props.user.id
        }

        let handleSuccess = (data) => {
            setCycleList(data);
            setSelected({});
            setDel(false)
        }
        post_message_action(msg, handleError, handleSuccess,
            handleSyntaxError)

    }

    let handleCancel = (e) => {
        setAdd(false);
        setSelected({});
        setEdit(false);
        setDel(false)
    }

    let handleDoubleClick = (cycle) => {
        props.setActiveClassCycle(cycle)
        props.setUpSection("ClassLessonList")
    }


    let handleClick = (event, cycle) => {
        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg")
            setSelected(cycle)
        else
            handleDoubleClick(cycle)
    }

    let pressTimer;
    let onMouseUp = () => {
        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, cycle) => {
        pressTimer = window.setTimeout(() => {
            setSelected(cycle)
        }, 1000);
        return false
    }


    let color = ['bg-dark-subtle text-dark', 'bg-secondary text-light',
        'bg-success text-light opacity-75', 'bg-primary text-light',
        'bg-indigo text-light', 'bg-blue text-light']
    let activeList = {}

    for (const ListElement of cycleList) {
        let active
        if (ListElement === selected)
            active = "opacity-5"
        else
            active = "opacity-0"
        activeList[ListElement.id] = active
    }

    let list = []
    for (const cycle of cycleList) {
        let active = " opacity-0" , border = ""
        if (cycle === selected){
            active = " opacity-5"
            border = "  border-4"
        }


        let item =

            <ListGroup.Item onTouchStart={(e) => onMouseDown(e, cycle)}
                            onTouchEnd={() => onMouseUp(cycle)}
                            onDoubleClick={() => handleDoubleClick(cycle)}
                            onClick={(event) => handleClick(event, cycle)}
                            action className={"position-relative py-3 py-md-2  d-flex align-items-center  rounded-3 border-bottom border-end "+ border }>
                <div className={"position-absolute start-0   end-0 top-0 bottom-0 bg-primary "+active }>
                </div>
                <div style={{height: "2.6rem", width: "2.6rem"}}
                     className={"rounded-circle   d-flex lh-sm fs-4 justify-content-center align-items-center " + color[0]}>
                    <span className={"material-symbols-outlined "}>home</span>
                </div>

                <div className={"ms-3 d-flex flex-column "}>
                    <div className={"fw-bold p-0 m-0 lh-sm text-dark-emphasis lh-small"}>Cycle on {cycle.date}</div>
                    <small className={"lh-sm"}>{cycle.count} Lessons</small>

                </div>

                <div className={"ms-3 d-flex flex-column align-items-end justify-content-between ms-auto "}>

                    <small className={"lh-sm "}>{cycle.duration} Hours</small>
                    <small className={"lh-sm"}>{(
                            props.activeClass.payment_rate * cycle.duration) + " " +
                        props.activeClass.currency} </small>

                </div>
            </ListGroup.Item>


        list.push(item)
    }


    let nav_btn_className = "my_icon_btn_light"


    let add_title

    if (edit)
        add_title = "Change Cycle date"
    else
        add_title = "Add a new Cycle"

    return (<>
        <Toolbar titleCenterd={false}
                 buttonVariant={"outline-light"}
                 variant={"light"} toggleDefualt={false}
                 selected={selected} className={"bg-light border-3 border-bottom  "}
                 handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                 editClassName={nav_btn_className} addClassName={nav_btn_className}
                 deleteClassName={nav_btn_className} toggleClassName={"d-none"}
                 title={"Cycle List"}
                 {...props}></Toolbar>
        <div style={{height: "11rem"}} className={" mb-3"} onClick={() => {
            setSelected({})
        }}>
            <div><strong className={"text-danger-emphasis"}>{error}</strong></div>
            <Row className={"m-0"}>
                <Col md={12} lg={{span: 8, offset: 2}} xl={{span: 6, offset: 3}} className={"px-0 "}>
                    <ListGroup variant={"flush"} className={"d-flex flex-column gap-1 pt-1 pt-md-3 px-2 px-lg-0 "}>
                        {list}

                    </ListGroup>
                </Col>
            </Row>

            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Cycle"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={"Cycle on " + selected.date}>
                </ConfirmDelete>

            }


        </div>
    </>)


}

export {ClassCycleList}