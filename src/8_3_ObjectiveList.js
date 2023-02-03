import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Breadcrumb, Card, Row} from "react-bootstrap";
import {Toolbar} from "./Toolbar";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";

function ObjectiveList(props) {

    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})
    let [objectiveList, setObjectiveList] = useState([])


    let handleSyntaxError = (error) => {
        props.setSyntaxError(error);
    }


    let getObjectiveList = () => {
        let msg = {type: 'objective', command: 'get', unit_id: props.activeUnit.id}
        post_message_action(msg, handleSyntaxError,
            (data) => setObjectiveList(data),
            handleSyntaxError)
    }


    useEffect(() => {
        getObjectiveList()
    }, [])


    let handleAdd = (e) => {
        if (e)
            e.stopPropagation()
        setAdd(true)
    }
    let handleAddOk = (e, text) => {
        if (e)
            e.stopPropagation()
        let msg = {
            type: 'objective', command: 'add',
            text: text, unit_id: props.activeUnit.id

        }
        let handelSuccess = (data) => {
            console.log("data after adding")
            console.log(data)
            setObjectiveList(data);
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
    let handleEditOk = (e, text) => {
        if (e)
            e.stopPropagation()

        let msg = {
            type: 'objective', command: 'edit',
            unit_id: props.activeUnit.id, text: text, objective_id: selected.id
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setObjectiveList(data);

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
            type: 'objective', command: 'del',
            unit_id: props.activeUnit.id, objective_id: selected.id
        }

        post_message_action(msg, handleSyntaxError,
            (data) => setObjectiveList(data),
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


    let handleDoubleClick = (e, objective) => {
        if (e)
            e.stopPropagation()
        setSelected(objective)
        handleEdit(e)

    }

    let handleClick = (event, objective) => {
        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg") {
            setSelected(objective)
        } else
            handleDoubleClick(event, objective)
    }

    let pressTimer;
    let onMouseUp = (e) => {
        if (e)
            e.stopPropagation()

        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, objective) => {
        if (event)
            event.stopPropagation()
        pressTimer = window.setTimeout(() => {
            setSelected(objective);
        }, 1000);
        return false
    }


    let gen_random = (first, span) => {
        return Math.floor(Math.random() * (span)) + first;
    }

    let color = ['bg-dark-subtle text-dark', 'bg-secondary text-light',
        'bg-success text-light', 'bg-primary text-light opacity-75',
        'bg-indigo text-light', 'bg-blue text-light']


    let nav_btn_class = "my_icon_btn_light"


    let add_title
    if (edit)
        add_title = "Change Unit "
    else
        add_title = "Add a new Unit"



    let list = []
    for (const objective of objectiveList) {

        let active = " ", border = " "
        if (objective === selected) {
            active = " standard-card-selected"
            border = "  border-4"
        }

        let item =
            <Card onDoubleClick={(event) => handleDoubleClick(event, objective)}
                  onClick={(event) => handleClick(event, objective)}
                  className={"standard-card position-relative border-0   border-end border-bottom  w-100 "+ active+border}
            >
                <div className={"position-absolute start-0  end-0 top-0 bottom-0  " }>
                </div>
                <Card.Body>
                    <Card.Text className={"text-dark-emphasis mb-0 " }>
                        {objective.text}
                    </Card.Text>

                </Card.Body>
            </Card>

        list.push(item)
    }


    let title =
        <div className={"breadcrumb  m-0 p-0"}>

            <Breadcrumb.Item className={"small"} active
                             onClick={() => props.setStandardSection("StandardList")}>Standards</Breadcrumb.Item>
            <Breadcrumb.Item className={"small"} active
                             onClick={() => props.setStandardSection("UnitList")}>Units</Breadcrumb.Item>
            <Breadcrumb.Item className={"small"} active o>Objective</Breadcrumb.Item>
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
            <div><strong className={"text-danger-emphasis"}></strong></div>
            <div     className={"d-flex gap-3 py-3 px-3 flex-column align-items-start w-100 "}>
                {list}
            </div>
            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Objective"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={selected.name}>
                </ConfirmDelete>

            }


        </>
    )


}

export
{
    ObjectiveList
}