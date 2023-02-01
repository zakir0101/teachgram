import add_circle from './icon/add_circle.svg'
import add_icon from './icon/add.svg'
import edit_icon from './icon/edit.svg'
import del_icon from './icon/delete.svg'
import {Button, Container, Image, ListGroup, Modal, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {capitalize} from "./util";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";


function ClassList(props) {
    let [add, setAdd] = useState(false)
    let [edit, setEdit] = useState(false)
    let [del, setDel] = useState(false)
    let [selected, setSelected] = useState({})

    let [classList, setClassList] = useState([])

    let handleSyntaxError = (error) => {
        props.setSyntaxError(error);
    }
    let getClassList = () => {
        let msg = {type: 'class', command: 'get', user_id: props.user.id}
        post_message_action(msg, handleSyntaxError,
            (data) => setClassList(data),
            handleSyntaxError)
    }


    useEffect(() => getClassList(), [])
    useEffect(getClassList, [props.activeClass])


    let handleAdd = (e) => {
        if(e)
            e.stopPropagation()
        setAdd(true)
    }
    let handleAddOk = ( e,name, payment, currency) => {
        if(e)
            e.stopPropagation()
        let msg = {
            type: 'class', command: 'add',
            name: name, user_id: props.user.id
            , payment_rate: payment,
            currency: currency
        }
        let handelSuccess = (data) => {
            setClassList(data);
            setAdd(false)
        };
        post_message_action(msg, handleSyntaxError, handelSuccess, handleSyntaxError)
        setSelected({})
    }

    let handleEdit = (e) => {
        if(e)
            e.stopPropagation()
        if (add === true)
            return;
        setEdit(true)
        setAdd(true)
    }
    let handleEditOk = (e, name, payment, currency) => {
        if(e)
            e.stopPropagation()
        let msg = {
            type: 'class', command: 'edit',
            class_id: selected.id, name: name,
            user_id: props.user.id, payment_rate: payment,
            currency: currency
        }
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setClassList(data);
        }
        post_message_action(msg, handleSyntaxError, handelSuccess, handleSyntaxError)
    }


    let handleDelete = (e) => {
        if(e)
            e.stopPropagation()
        setDel(true)
    }
    let handleDeleteOk = (e) => {
        if(e)
            e.stopPropagation()
        let msg = {type: 'class', command: 'del', class_id: selected.id, user_id: props.user.id}

        post_message_action(msg, handleSyntaxError,
            (data) => setClassList(data),
            handleSyntaxError)
        setSelected({})
        setDel(false)
    }

    let handleCancel = (e) => {
        if(e)
            e.stopPropagation()
        setAdd(false);
        setSelected({});
        setEdit(false);
        setDel(false)
    }

    let handleDoubleClick = (e,clas) => {
        if(e)
            e.stopPropagation()
        props.setActiveClass(clas)
        props.setClassSection("ClassPreview")
        props.setUpSection('ClassStandardList')

    }

    let handleClick = (event, clas) => {

        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg")
            setSelected(clas)
        else
            handleDoubleClick(clas)
    }

    let pressTimer;
    let onMouseUp = (e) => {
        if(e)
            e.stopPropagation()
        if (e) {
        }
        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, clas) => {
        if(event)
            event.stopPropagation()
        pressTimer = window.setTimeout(() => {
            setSelected(clas);
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
    for (const clas of classList) {
        let active = " opacity-0" , border = ""
        if (clas === selected){
            active = " opacity-5"
            border = "  border-4"
        }

        let item =
            <ListGroup.Item onTouchEnd={(e) => onMouseUp(e)}
                            onTouchStart={(e) => onMouseDown(e, clas)}
                            onDoubleClick={(e) => handleDoubleClick(e , clas)}
                            onClick={(event) => handleClick(event, clas)}
                            action
                            className={"position-relative  py-3 py-md-2  d-flex standard-card align-items-center rounded-3 border-bottom border-end "+ border }>
                <div className={"position-absolute start-0  end-0 top-0 bottom-0 bg-primary   "+ active}>
                </div>
                <div style={{height: "2.6rem", width: "2.6rem"}}
                     className={"rounded-circle   d-flex lh-sm fs-4 justify-content-center align-items-center " + color[0]}>
                    {clas.name.charAt(0).toUpperCase()}
                </div>

                <div className={"ms-3 d-flex flex-column lh-sm justify-content-between h-100"}>
                    <strong className={"text-dark-emphasis "}>{capitalize(clas.name)}</strong>
                    <small className={"lh-sm"}>{clas['standard_list'][0]?.name ?
                        clas['standard_list'][0].name : "No Standard defined"}</small>

                </div>
            </ListGroup.Item>


        list.push(item)
    }


    let nav_btn_class = "my_icon_btn_dark "
    let toggleClass = " "
    if (props.activeClass.name) {
        toggleClass = " d-md-none"
    }

    let add_title
    if (edit)
        add_title = "Change class name"
    else
        add_title = "Add a new Class"

    return (
        <div className={"d-grid template-row-inverse h-100"}>
            <div className={"overflow-auto  border-end"} onClick={() => setSelected({})}>
                <ListGroup variant={"flush"} className={"d-flex flex-column gap-1 px-2 pt-1"}>
                    {list}
                </ListGroup>
            </div>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-dark"}
                     variant={"dark"} toggleDefualt={false}
                     selected={selected} className={"bg-dark "}
                     handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={nav_btn_class + " d-md-none"}
                     title={"Class List"}
                     {...props}></Toolbar>
            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Class"}
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


export {ClassList}