import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {ListGroup} from "react-bootstrap";
import {capitalize} from "./util";
import {Toolbar} from "./Toolbar";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";

function StandardList(props) {
    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})
    let [standardList, setStandardList] = useState([])
    let [subjectList, setSubjectList] = useState([])


    let handleSyntaxError = (error) => {
        props.setSyntaxError(error);
    }


    let getStandardList = () => {
        let msg = {type: 'standard', command: 'get', user_id: props.user.id}
        post_message_action(msg, handleSyntaxError,
            (data) => setStandardList(data),
            handleSyntaxError)
    }


    let getSubjectList = () => {
        let msg = {type: 'subject', command: 'get'}
        let handleSuccess = (data) => {
            list = data.map((subject) => capitalize( subject.name))
            setSubjectList(list)
        }
        post_message_action(msg ,handleSyntaxError, handleSuccess,
            handleSyntaxError)
    }


    useEffect(() => {getSubjectList();getStandardList()}, [])


    let handleAdd = (e) => {
        if (e)
            e.stopPropagation()
        setAdd(true)
    }
    let handleAddOk = (e, name, subject_name) => {
        if (e)
            e.stopPropagation()
        let msg = {
            type: 'standard', command: 'add',
            name: name, user_id: props.user.id
            , subject_name: subject_name
        }
        let handelSuccess = (data) => {
            setStandardList(data);
            setAdd(false)
            getSubjectList()
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
    let handleEditOk = (e, name, subject_name, currency) => {
        if (e)
            e.stopPropagation()
        let msg = {
            type: 'standard', command: 'edit',
            standard_id: selected.id, name: name,
            user_id: props.user.id, subject_name: subject_name
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setStandardList(data);
            getSubjectList()
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
            type: 'standard', command: 'del',
            standard_id: selected.id, user_id: props.user.id
        }

        post_message_action(msg, handleSyntaxError,
            (data) => setStandardList(data),
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


    let handleDoubleClick = (e, standard) => {
        if (e)
            e.stopPropagation()
        props.setActiveStandard(standard)
        props.setStandardSection("UnitList")
    }

    let handleClick = (event, standard) => {
        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg")
            setSelected(standard)
        else
            handleDoubleClick(event, standard)
    }

    let pressTimer;
    let onMouseUp = (e) => {
        if (e)
            e.stopPropagation()

        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, standard) => {
        if (event)
            event.stopPropagation()
        pressTimer = window.setTimeout(() => {
            setSelected(standard);
        }, 1000);
        return false
    }


    let gen_random = (first, span) => {
        return Math.floor(Math.random() * (span)) + first;
    }

    let color = ['bg-dark-subtle text-dark', 'bg-secondary text-light',
        'bg-success text-light', 'bg-primary text-light opacity-75',
        'bg-indigo text-light', 'bg-blue text-light']


    let list = [];
    for (const standard of standardList) {
        let active = " ", border = ""
        if (standard === selected) {
            active = "standard-card-selected"
            border = " border-4"
        }

        let item =
            <ListGroup.Item onTouchEnd={(e) => onMouseUp(e)}
                            onTouchStart={(e) => onMouseDown(e, standard)}
                            onDoubleClick={(e) => handleDoubleClick(e, standard)}
                            onClick={(event) => handleClick(event, standard)}
                            action
                            className={"position-relative  py-3 py-md-2  d-flex standard-card align-items-center rounded-3 border-bottom border-end "+ active + border}>
                <div className={"position-absolute start-0  end-0 top-0 bottom-0    " }>
                </div>
                <div style={{height: "2.3rem", width: "2.3rem"}}
                     className={"rounded-circle flex-sch  d-flex lh-sm fs-4 justify-content-center align-items-center flex-shrink-0  " + color[2]}>
                    <span className={"material-symbols-outlined "}>menu_book</span>
                </div>

                <div className={"ms-3 d-flex flex-column lh-sm justify-content-between h-100"}>
                    <strong className={"text-dark-emphasis "}>{standard.name}</strong>
                    <small className={"lh-sm"}>{capitalize( standard.subject_name )}</small>

                </div>
            </ListGroup.Item>


        list.push(item)
    }


    let nav_btn_class = "my_icon_btn_dark "

    let add_title
    if (edit)
        add_title = "Change Standard "
    else
        add_title = "Add a new Standard"

    return (

        <div className={"d-grid template-row-inverse h-100"}>
            <div className={"overflow-auto  border-end"} onClick={() => setSelected({})}>
                <ListGroup variant={"flush"} className={"d-flex flex-column gap-1 px-2 pt-1"}>
                    {list}
                </ListGroup>
            </div>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-dark"}
                     variant={"dark"} toggleDefual t={false}
                     selected={selected} className={"bg-dark "}
                     handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={nav_btn_class + " d-md-none"}
                     title={"Standard List"}
                     {...props}></Toolbar>
            {!add ? <></> :
                <AddClass subjectList={subjectList}
                          title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Standard"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               name={selected.name}
                >
                </ConfirmDelete>

            }
        </div>
    )

}

export {StandardList}