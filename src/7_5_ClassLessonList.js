import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {Badge, Breadcrumb, Card, Col, ListGroup, Row} from "react-bootstrap";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";
import {capitalize} from "./util";


function ClassLessonList(props) {


    let [error, setError] = useState("")
    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})
    let [lessonList, setLessonList] = useState([])

    let handleSyntaxError = (error) => {
        props.setSyntaxError(error)
    }
    let handleError = (error) => {
        setError(error)
    }


    let getLessonList = () => {

        let msg = {
            type: 'lesson', command: 'get',
            cycle_id: props.activeClassCycle.id
        }
        post_message_action(msg, handleError, (data) => setLessonList(data), handleSyntaxError)
    }

    useEffect(() => {
        getLessonList()
    }, [props.activeClassCycle])


    let handleAdd = (e) => {
        setSelected({})
        setAdd(true)
    }
    let handleAddOk = (date, duration) => {
        let msg = {
            type: 'lesson', command: 'add', date: date,
            cycle_id: props.activeClassCycle.id, duration: duration
        }
        let handelSuccess = (data) => {
            setLessonList(data);
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
    let handleEditOk = (newDate, duration) => {
        let msg = {
            type: 'lesson', command: 'edit', cycle_id: props.activeClassCycle.id,
            lesson_id: selected.id, date: newDate,
            duration: duration
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setLessonList(data);
        }
        post_message_action(msg, handleError, handelSuccess, handleSyntaxError)
    }


    let handleDelete = () => {
        setDel(true)
    }
    let handleDeleteOk = () => {

        let msg = {
            type: 'lesson', command: 'del',
            lesson_id: selected.id,
            cycle_id: props.activeClassCycle.id
        }

        let handleSuccess = (data) => {
            setLessonList(data);
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

    let handleDoubleClick = (lesson) => {
        setSelected(lesson)
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
        'bg-success text-light', 'bg-primary text-light',
        'bg-indigo text-light', 'bg-blue text-light']
    let activeList = {}

    for (const ListElement of lessonList) {
        let active
        if (ListElement === selected)
            active = "opacity-5"
        else
            active = "opacity-0"
        activeList[ListElement.id] = active
    }

    let nav_btn_class = "my_icon_btn_light"


    let add_title

    if (edit)
        add_title = "Change Lesson date"
    else
        add_title = "Add a new lesson"


    let card_text = 'Click heir to see how many objective you have taught in this class, and' +
        ' how many remain left for you';
    let title = <div className={"breadcrumb  m-0 p-0"}>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setSection("Home")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setUpSection("ClassCycleList")}>Cycle
            List</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active>Lesson List</Breadcrumb.Item>
    </div>

    return (
        <>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={selected} className={" bg-light "}
                     handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={"d-none"}
                     title={title}
                     {...props}></Toolbar>
            <div><strong className={"text-danger-emphasis"}>{error}</strong></div>

            <div  onClick={() => setSelected({})}
                 className={"d-flex gap-3    py-3 px-3 flex-wrap overflow-x-auto justify-content-center"}>
                {lessonList.map((lesson) =>
                    <Card onTouchStart={(e) => onMouseDown(e, lesson)}
                          onTouchEnd={() => onMouseUp()}
                          onDoubleClick={() => handleDoubleClick(lesson)}
                          onClick={(event) => handleClick(event, lesson)}
                          className={"standard-card  position-relative "}
                          style={{minWidth: '15rem', width: '15rem', height: '13rem'}}>
                        <Card.Body>
                            <div className={"d-flex align-items-end justify-content-between"}>
                                <div>
                                    <div
                                        className={"position-absolute start-0  end-0 top-0 bottom-0 bg-primary " + activeList[lesson.id]}>

                                    </div>
                                    <Card.Title>Lesson {lessonList.indexOf(lesson) + 1}</Card.Title>
                                    <Card.Subtitle
                                        className="mb-2 text-muted">{lesson.date}</Card.Subtitle>
                                </div>
                                <small className={"m-0 mb-2 small "}>{lesson.duration} hours</small>
                            </div>
                            <Card.Text className={"text-dark-emphasis"}>
                                {card_text.slice(0, 130)}
                            </Card.Text>

                        </Card.Body>

                    </Card>
                )}

            </div>

            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Lesson"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={"Lesson on " + selected.date}>
                </ConfirmDelete>

            }


        </>)


}


export {ClassLessonList}