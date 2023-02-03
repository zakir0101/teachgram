import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {capitalize} from "./util";
import {Badge, Breadcrumb, Card, Col, ListGroup, Row} from "react-bootstrap";
import {Toolbar} from "./Toolbar";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";

function UnitList(props) {

    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})
    let [untList, setUnitList] = useState([])


    let handleSyntaxError = (error) => {
        props.setSyntaxError(error);
    }


    let getUnitList = () => {
        let msg = {type: 'unit', command: 'get', standard_id: props.activeStandard.id}
        post_message_action(msg, handleSyntaxError,
            (data) => setUnitList(data),
            handleSyntaxError)
    }


    useEffect(() => {
        getUnitList()
    }, [])
    useEffect(() => {
        getUnitList()
    }, [props.activeStandard])


    let handleAdd = (e) => {
        if (e)
            e.stopPropagation()
        setAdd(true)
    }
    let handleAddOk = (e, name) => {
        if (e)
            e.stopPropagation()
        let msg = {
            type: 'unit', command: 'add',
            name: name, standard_id: props.activeStandard.id

        }
        let handelSuccess = (data) => {
            setUnitList(data);
            setAdd(false)
        };
        post_message_action(msg, handleSyntaxError, handelSuccess, handleSyntaxError)
        setSelected({})
    }

    let handleEdit = (e) => {
        if (e)
            e.stopPropagation()
        if (add === true)
            return;
        setEdit(true)
        setAdd(true)
    }
    let handleEditOk = (e, name) => {
        if (e)
            e.stopPropagation()
        console.log("selected unit")
        console.log(selected.name)
        let msg = {
            type: 'unit', command: 'edit',
            standard_id: props.activeStandard.id, name: name, unit_id: selected.id
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setUnitList(data);
        }
        post_message_action(msg, handleSyntaxError, handelSuccess, handleSyntaxError)
    }


    let handleDelete = (e) => {
        if (e)
            e.stopPropagation()
        setDel(true)
    }
    let handleDeleteOk = (e) => {
        if (e)
            e.stopPropagation()
        let msg = {
            type: 'unit', command: 'del',
            standard_id: props.activeStandard.id, unit_id: selected.id
        }

        post_message_action(msg, handleSyntaxError,
            (data) => setUnitList(data),
            handleSyntaxError)
        setSelected({})
        setDel(false)
    }

    let handleCancel = (e) => {
        if (e)
            e.stopPropagation()
        setAdd(false);
        setSelected({});
        setEdit(false);
        setDel(false)
    }


    let handleDoubleClick = (e, unit) => {
        if (e)
            e.stopPropagation()
        props.setActiveUnit(unit)
        props.setStandardSection("ObjectiveList")
    }

    let handleClick = (event, unit) => {
        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg")
            setSelected(unit)
        else
            handleDoubleClick(event, unit)
    }

    let pressTimer;
    let onMouseUp = (e) => {
        if (e)
            e.stopPropagation()

        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, unit) => {
        if (event)
            event.stopPropagation()
        pressTimer = window.setTimeout(() => {
            setSelected(unit);
        }, 1000);
        return false
    }


    let gen_random = (first, span) => {
        return Math.floor(Math.random() * (span)) + first;
    }

    let color = ['bg-dark-subtle text-dark', 'bg-secondary text-light',
        'bg-success text-light', 'bg-primary text-light opacity-75',
        'bg-indigo text-light', 'bg-blue text-light']

    let style = {minWidth: '10rem', width: '10rem', height: '8rem'}
    let list = [];
    for (const unit of untList) {
        let active = " opacity-0", border = "border-1"
        if (unit === selected) {
            active = " standard-card-selected"
            border = "  border-4"
        }

        let item =
            <Col>
                <Card onDoubleClick={(event) => handleDoubleClick(event, unit)}
                      onClick={(event) => handleClick(event, unit)}
                      className={"standard-card position-relative w-100 border-0 border-bottom border-end  "+active+border}
                      style={{height:"8rem"}}
                    >
                    <Card.Body>
                        <div className={"position-absolute start-0  end-0 top-0 bottom-0    " }>
                        </div>
                        <div className={"d-flex justify-content-between "}>
                            <div className={"card-title fs-5 mb-0 pb-0 lh-sm"}>
                                {unit.name}</div>

                            <span></span>
                        </div>
                        <Card.Text className={"text-dark-emphasis "}>
                            {unit.first_objective.slice(0, 25) + " ..."}
                        </Card.Text>

                    </Card.Body>
                </Card>
            </Col>

        list.push(item)
    }


    let nav_btn_class = "my_icon_btn_light "

    let add_title
    if (edit)
        add_title = "Change Unit "
    else
        add_title = "Add a new Unit"


    let title = "Units";
    if (props.windowSize === "sm")

        title = <div className={"breadcrumb  m-0 p-0"}>

            <Breadcrumb.Item className={"small"} active
                             onClick={() => props.setStandardSection("StandardList")}>Standards</Breadcrumb.Item>
            <Breadcrumb.Item className={"small"} active o>Units</Breadcrumb.Item>
        </div>

    let old = "d-flex gap-3    py-3 px-3 flex-wrap overflow-x-auto justify-content-center"
    return (
        <div    className={"h-100"} onClick={()=>setSelected({})}>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={selected} className={" bg-light "}
                     handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={"d-none"}
                     title={title}
                     {...props}></Toolbar>
            <div><strong className={"text-danger-emphasis"}></strong></div>

            <Row onClick={() => setSelected({})}
                 xs={2 } sm={3} lg={4} xl={5}
                className={"g-2 p-2"}>
                {list}
            </Row>

            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Unit"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={selected.name}>
                </ConfirmDelete>

            }


        </div>
    )


}

export {UnitList}