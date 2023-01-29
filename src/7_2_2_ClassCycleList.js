import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {Col, Container, ListGroup, Row} from "react-bootstrap";
import {capitalize} from "./util";
import {ConfirmDelete} from "./ConfirmDelete";
import {AddClass} from "./7_1_1_AddClass";








function ClassCycleList(props){
    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected , setSelected] = useState({})
    let [cycleList, setCycleList] = useState([])


    let getCycleList = () => {



        let msg = {type: 'cycle', command: 'get',
            class_id : props.activeClass.id, user_id: props.user.id}
        post_message_action(msg, () => {
            },
            (data) => setCycleList(data),
            () => {
            })
    }

    useEffect(() =>{ getCycleList() }, [])



    let handleAdd = (e) => {
        setSelected({})
        setAdd(true)
    }
    let handleAddOk = (date) => {
        let msg = {type: 'cycle', command: 'add', date: date,
            class_id:props.activeClass.id, user_id: props.user.id}
        let handelSuccess = (data) => {
            setCycleList(data);
            setSelected({})
            setAdd(false)
        };
        post_message_action(msg, () => {}, handelSuccess, () => {})
    }

    let handleEdit = ( ) => {
        if (add === true)
            return;
        setEdit(true)
        setAdd(true)
    }
    let handleEditOk = ( newDate) => {
        let msg = {type: 'cycle', command: 'edit', cycle_id:selected.id,
            class_id: props.activeClass.id, date: newDate,
            user_id: props.user.id}
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setCycleList(data);
        }
        post_message_action(msg, () => {}, handelSuccess, () => {})
    }


    let handleDelete = () => {
        setDel(true)
    }
    let handleDeleteOk = () => {

        let msg = {type: 'cycle', command: 'del',
            cycle_id:selected.id ,
            class_id : props.activeClass.id, user_id: props.user.id}

        let handleSuccess = (data) => {setCycleList(data);setSelected({}) ;setDel(false) }
        post_message_action(msg, () => {
            },
            (handleSuccess),
            () => {
            })

    }

    let handleCancel = (e) => {
        setAdd(false) ; setSelected({}) ; setEdit(false) ;setDel(false)
    }

    let handleDoubleClick = (cycle) => {
        props.setActiveClassCycle(cycle)
        props.setClassSection("LessonList")

    }

    let handleClick = (event ,cycle) => {
        if(event)
            event.stopPropagation()
        setSelected(cycle)
    }















    let color = ['bg-dark-subtle text-dark','bg-secondary text-light' ,
        'bg-success text-light','bg-primary text-light' ,
        'bg-indigo text-light' , 'bg-blue text-light']
    let activeList = {}

    for (const ListElement of cycleList) {
        let active
        if(ListElement=== selected)
            active="my-active"
        else
            active=""
        activeList[ListElement.id]=active
    }

    let nav_btn_class = "my_icon_btn_light"


    let add_title
    if (edit)
        add_title = "Change Cycle date"
    else
        add_title = "Add a new Cycle"

    return( <>
        <Toolbar titleCenterd={false}
                 buttonVariant={"outline-light"}
                 variant={"light"} toggleDefualt={false}
                 selected={selected} className={"bg-light "}
                 handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                 editClassName={nav_btn_class} addClassName={nav_btn_class}
                 deleteClassName={nav_btn_class} toggleClassName={"d-none"}
                 title={"Cycle List"}
                 {...props}></Toolbar>
        <div  className={" mb-3"}>
            <Row className={"m-0"}>
                <Col md={12} lg={8} xl={6} >
                    <ListGroup  variant={"flush"}>
                        {cycleList.map((cycle =>

                            <ListGroup.Item onDoubleClick={() => handleDoubleClick(cycle)}
                                            onClick={(event) => handleClick(event,cycle)}
                                            action    className={"d-flex align-items-center "+activeList[cycle.id]}>

                                <div style={{height: "2.3rem", width: "2.3rem"}}
                                     className={"rounded-circle   d-flex lh-sm fs-4 justify-content-center align-items-center "+color[0] }>
                                    <span className={"material-symbols-outlined "}>home</span>
                                </div>

                                <div className={"ms-3 d-flex flex-column lh-small"}>
                                    <div className={"fw-bold p-0 m-0 lh-sm lh-small"}>Cycle on {cycle.date}</div>
                                    <small className={"lh-sm"}>default standard</small>

                                </div>
                            </ListGroup.Item>))}

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
            {!del ? <></>:
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={"Cycle on "+selected.date }>
                </ConfirmDelete>

            }


        </div>
    </>)


}


export {ClassCycleList}