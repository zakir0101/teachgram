import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {Badge, Breadcrumb, Card} from "react-bootstrap";
import {capitalize} from "./util";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";


function ClassStandardList(props) {
    let [error, setError] = useState("")
    let [add, setAdd] = useState(false)
    let [del, setDel] = useState(false)
    let [standardList, setStandardList] = useState([])
    let [selected, setSelected] = useState({})
    let [selected2, setSelected2] = useState({})


    let handleSyntaxError = (error) => {
        props.setSyntaxError(error)
    }
    let handleError = (error) => {
        setError(error)
    }


    let getStandardList = () => {

        let msg = {
            type: 'standard', command: 'get',
            user_id: props.user.id
        }

        post_message_action(msg, handleError, setStandardList, handleSyntaxError)
    }

    useEffect(() => {
        getStandardList()
    }, [props.user])


    let handleAdd = (e) => {
        setSelected({})
        setAdd(true)
    }

    let handleAddOk = () => {
        let msg = {
            type: 'class_standard', command: 'attach',
            standard_id: selected2.id, class_id: props.activeClass.id
        }
        let handelSuccess = (data) => {
            props.setActiveClass(data);
            setSelected({})
            setSelected2({})
            setAdd(false)
        };
        post_message_action(msg, handleError, handelSuccess, handleSyntaxError)

    }

    let handleDelete = () => {
        setDel(true)
    }
    let handleDeleteOk = () => {

        let msg = {
            type: 'class_standard', command: 'detach',
            standard_id: selected.id, class_id: props.activeClass.id
        }

        let handleSuccess = (data) => {
            props.setActiveClass(data);
            setSelected({})
            setSelected2({})
            setDel(false)
        }
        post_message_action(msg, handleError, handleSuccess,
            handleSyntaxError)

    }

    let handleCancel = (e) => {
        setAdd(false);
        setSelected({});
        setSelected2({});
        setDel(false)
    }

    let handleDoubleClick = (standard) => {

        props.setActiveClassStandard(standard)
        props.setUpSection("ClassUnitList")
    }


    let handleClick = (event, standard) => {
        if (event)
            event.stopPropagation()
        if (props.windowSize === "lg")
            setSelected(standard)
        else
            handleDoubleClick(standard)
    }

    let pressTimer;
    let onMouseUp = () => {
        clearTimeout(pressTimer)
        return false
    }
    let onMouseDown = (event, standard) => {
        pressTimer = window.setTimeout(() => {
            setSelected(standard)
        }, 1000);
        return false
    }



    let card_text = 'Some quick example text to build on the card title and make up the\n' +
        '                                bulk of the card\'s content.'
    card_text = 'Click heir to see how many objective you have taught in this class, and' +
        ' how many remain left for you'
    let nav_btn_className = "my_icon_btn_light"



    let list = []
    for (const standard of props.activeClass.standard_list) {
        let active = "" , border = " border-1"
        if(standard === selected)
        {
            active = " standard-card-selected"
            border = " border-5"
        }
        let item =
            <Card onTouchStart={(e) => onMouseDown(e, standard)}
                  onTouchEnd={() => onMouseUp()}
                  onDoubleClick={() => handleDoubleClick(standard)}
                  onClick={(event) => handleClick(event, standard)}
                  className={"standard-card   position-relative border-0 border-bottom border-end  "+active +border}
                  style={{minWidth: '15rem', width: '15rem', height: '13rem'}}>
                <Card.Body>
                    <div
                        className={"position-absolute start-0  end-0 top-0 bottom-0 " } >

                    </div>
                    <Card.Title><span className={"text-dark-emphasis"}>{standard.name}</span></Card.Title>
                    <Card.Subtitle
                        className="mb-2 text-muted">{capitalize(standard.subject_name)}</Card.Subtitle>
                    <Card.Text> <span className={"text-dark-emphasis "}>
                                {card_text.slice(0, 130)}</span>
                    </Card.Text>

                </Card.Body>

                <div pill
                     className={"position-absolute badge badge-bg-color rounded-pill end-0 opacity-75 bottom-0 mb-2 me-3   "}
                     bg={"secondary"}>{standard.progress + "%"} </div>
            </Card>

        list.push(item)
    }

    let title = "Standard List"
    if (props.windowSize === "sm")

        title = <div className={"breadcrumb  m-0 p-0"}>
            <Breadcrumb.Item className={"text-dark"}
                             active onClick={() => props.setClassSection("ClassList")}>
                Classes</Breadcrumb.Item>
            <Breadcrumb.Item className={""} active>Standards</Breadcrumb.Item>
        </div>


    return (<>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={selected} className={"bg-light border-bottom border-3 "}
                     handleAdd={handleAdd} handleEdit={() => {
            }} handleDelete={handleDelete}
                     editClassName={"d-none"} addClassName={nav_btn_className}
                     deleteClassName={nav_btn_className} toggleClassName={"d-none"}
                     title={title}
                     {...props}></Toolbar>
            <div style={{minHeight: '15rem'}} onClick={() => setSelected({})}
                 className={"d-flex gap-3    py-3 px-3 flex-nowrap overflow-x-auto align-items-center"}>
                <div><strong className={"text-danger-emphasis"}>{error}</strong></div>
                {list}

            </div>


            {!add ? <></> :
                <AddClass title={"add Standard "} handleCancel={handleCancel}
                          handleAddOk={handleAddOk} mode={"ClassStandard"}
                          handleEditOk={() => {
                          }} add={add}
                          selected2={selected2} setSelected2={setSelected2}
                          selected={selected} standardList={standardList}
                          {...props}
                ></AddClass>

            }
            {!del ? <></> :
                <ConfirmDelete handleCancel={handleCancel} handleDeleteOk={handleDeleteOk} del={del}
                               text={"remove standard '" + selected.name +
                                   "' from class '" + props.activeClass.name + "'"}>
                </ConfirmDelete>

            }

        </>
    )
}


export {ClassStandardList}