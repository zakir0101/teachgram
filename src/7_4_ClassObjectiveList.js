import {Breadcrumb, Card, ProgressBar} from "react-bootstrap";
import {Toolbar} from "./Toolbar";
import {capitalize} from "./util";
import {post_message_action} from "./teachgram_api";
import {useEffect} from "react";


function ClassObjectiveList(props) {

    let handleSyntaxError = (error) => {
        props.setSyntaxError(error);
    }

    let setObjectiveDone = (objective, done) => {

        let msg = {
            type: 'progress', command: 'edit',
            class_id: props.activeClass.id, objective_id: objective.id,
            done: done
        }
        post_message_action(msg, handleSyntaxError,
            (data) => {
                props.setActiveClass(data);
            },
            handleSyntaxError)

    }


    let handleDoubleClick = (objective) => {
        if(objective.progress == true)
            setObjectiveDone( objective ,false)
        else
            setObjectiveDone(objective , true)
    }
    let handleClick = (event, objective) => {
    }



    let title = <div className={"breadcrumb  m-0 p-0"}>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setUpSection("ClassStandardList")}>Standard
            List</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setUpSection("ClassUnitList")}>Unit
            List</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active>Objective List</Breadcrumb.Item>
    </div>


    let list = []
    for (const objective of props.activeClassUnit.objective_list) {
        let btn_d_class, btn_nd_class, text_class , card_bg

        if (objective.progress == true) {
            btn_d_class = " invisible"
            btn_nd_class = " "
            text_class = " text-decoration-line-through"
            card_bg = " objective-card"
        } else {
            btn_d_class = " "
            btn_nd_class = " invisible "
            text_class = " "
            card_bg = " "
        }

        let item =
            <Card onDoubleClick={() => handleDoubleClick(objective)}

                  onClick={(event) => handleClick(event, objective)}
                  className={"standard-card  w-100 "+card_bg}
            >
                <Card.Body >
                    <Card.Text className={"text-dark-emphasis mb-0 "+text_class}>
                        {objective.text}
                    </Card.Text>
                    <div className={"d-flex justify-content-end "}>
                        <Card.Link>


                                    <span onClick={() => setObjectiveDone(objective, true)}
                                          className={"text-success text-decoration-underline "+ btn_d_class}>
                                        done</span>
                        </Card.Link>
                        <Card.Link>
                                    <span onClick={() => setObjectiveDone(objective, false)}
                                          className={"text-danger text-decoration-underline  "+btn_nd_class}>not done</span>
                        </Card.Link>
                    </div>
                </Card.Body>
            </Card>

        list.push(item)
    }

    let  now = props.activeClassUnit.progress
    return (<>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={{}} className={"bg-light "}
                     handleAdd={null} handleEdit={null} handleDelete={null}
                     editClassName={"d-none"} addClassName={"d-none"}
                     deleteClassName={"d-none"} toggleClassName={"d-none"}
                     title={title}
                     {...props}></Toolbar>

            <div className={"pt-3 px-5"}>
                <ProgressBar className={""} style={{height:"1.5rem"}}
                             now={now} label={now + "%"} variant={"success"}/>
            </div>
            <div className={"d-flex gap-3 py-3 px-3 flex-column align-items-start w-100 "}>
                {list}
            </div>


        </>
    )


}


export {ClassObjectiveList}