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
    let [selected , setSelected] = useState({})

    let [classList, setClassList] = useState([])


    let getClassList = () => {
        let msg = {type: 'class', command: 'get', user_id: props.user.id}
        post_message_action(msg, () => {
            },
            (data) => setClassList(data),
            () => {
            })
    }

    useEffect(() => getClassList(), [])

    let handleAdd = (e) => {
        setAdd(true)
    }
    let handleAddOk = (name) => {
        let msg = {type: 'class', command: 'add', name: name, user_id: props.user.id}
        let handelSuccess = (data) => {
            setClassList(data);
            setAdd(false)
        };
        post_message_action(msg, () => {
        }, handelSuccess, () => {
        })
        setSelected({})
    }

    let handleEdit = ( ) => {
        if (add === true)
            return;
        setEdit(true)
        setAdd(true)
    }
    let handleEditOk = ( name) => {
        let msg = {type: 'class', command: 'edit', class_id: selected.id, name: name, user_id: props.user.id}
        let handelSuccess = (data) => {
            setEdit(false);
            setSelected({})
            setAdd(false);
            setClassList(data);
        }
        post_message_action(msg, () => {
        }, handelSuccess, () => {
        })
    }


    let handleDelete = () => {
        setDel(true)
    }
    let handleDeleteOk = () => {

        let msg = {type: 'class', command: 'del', class_id: selected.id, user_id: props.user.id}

        post_message_action(msg, () => {
            },
            (data) => setClassList(data),
            () => {
            })
        setSelected({})
        setDel(false)
    }

    let handleCancel = (e) => {
        setAdd(false) ; setSelected({}) ; setEdit(false) ;setDel(false)
    }

    let handleDoubleClick = (clas) => {
        props.setActiveClass(clas)
        props.setClassSection("ClassPreview")

    }

    let handleClick = (event ,clas) => {
        if(event)
            event.stopPropagation()
        setSelected(clas)
    }

    let gen_random = (first, span) => {
        return Math.floor(Math.random() * (span))+first;
    }
















    let color = ['bg-dark-subtle text-dark','bg-secondary text-light' ,
        'bg-success text-light','bg-primary text-light' ,
        'bg-indigo text-light' , 'bg-blue text-light']
    let activeList = {}

    for (const classListElement of classList) {
        let active
        if(classListElement=== selected)
            active="my-active"
        else
            active=""
        activeList[classListElement.id]=active
    }

    let nav_btn_class="my_icon_btn_dark "
    let toggleClass = " "
    if(props.activeClass.name){
        toggleClass=" d-md-none"
    }

    let add_title
    if (edit)
        add_title = "Change class name"
    else
        add_title = "Add a new Class"

    return (
        <div className={"d-grid template-row-inverse h-100"}>
            <div className={"overflow-auto  border-end"} onClick={()=>setSelected({})}>
                <ListGroup  variant={"flush"}>
                    {classList.map((clas =>

                        <ListGroup.Item onDoubleClick={() => handleDoubleClick(clas)}
                                        onClick={(event) => handleClick(event,clas)}
                                         action    className={"d-flex align-items-center "+activeList[clas.id]}>

                            <div style={{height: "2.3rem", width: "2.3rem"}}
                                 className={"rounded-circle   d-flex lh-sm fs-4 justify-content-center align-items-center "+color[0] }>
                                {clas.name.charAt(0).toUpperCase()}
                            </div>

                            <div className={"ms-3 d-flex flex-column lh-small"}>
                                <div className={"fw-bold p-0 m-0 lh-sm lh-small"}>{capitalize(clas.name)}</div>
                                <small className={"lh-sm"}>default standard</small>

                            </div>
                        </ListGroup.Item>))}
                </ListGroup>
            </div>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-dark"}
                     variant={"dark"} toggleDefualt={false}
                     selected={selected} className={"bg-dark "}
                     handleAdd={handleAdd} handleEdit={handleEdit} handleDelete={handleDelete}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={nav_btn_class+toggleClass}
                     title={"Class List"}
                      {...props}></Toolbar>
            {!add ? <></> :
                <AddClass title={add_title} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"Class"}
                          handleEditOk={handleEditOk} add={add}
                          edit={edit} selected={selected} {...props}
                ></AddClass>
            }
            {!del ? <></>:
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                    name={selected.name}>
                </ConfirmDelete>

            }
        </div>)

}


export {ClassList}