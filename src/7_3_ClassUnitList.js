import {capitalize} from "./util";

import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";
import {Badge, Breadcrumb, Card, Col, ListGroup, ProgressBar, Row} from "react-bootstrap";
import {AddClass} from "./7_1_1_AddClass";
import {ConfirmDelete} from "./ConfirmDelete";

function ClassUnitList(props) {

    let handleDoubleClick = (unit) => {
        props.setActiveClassUnit(unit)
        props.setUpSection("ClassObjectiveList")
    }

    let handleClick = (event, unit) => {
        handleDoubleClick(unit)
    }


    let title = <div className={"breadcrumb  m-0 p-0"}>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setSection("Home")}>Home</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active onClick={() => props.setUpSection("ClassStandardList")}>Standard
            List</Breadcrumb.Item>
        <Breadcrumb.Item className={"small"} active>Unit List</Breadcrumb.Item>
    </div>


    let list = []
    for (const unit of props.activeClassStandard.unit_list) {
        let card_bg = " ", text_class = " " , icon = "invisible"
        if (unit.progress === 100) {
          //  text_class = " text-decoration-line-through"
            //card_bg = " objective-card"
            icon = "visible"
        }
        let item =
            <Card onDoubleClick={() => handleDoubleClick(unit)}
                  onClick={(event) => handleClick(event, unit)}
                  className={"standard-card border-0 border-bottom border-end border-2 " + card_bg}
                  style={{minWidth: '10rem', width: '10rem', height: '8rem'}}>
                <Card.Body>
                    <div className={"d-flex justify-content-between "}>
                        <div className={"card-title fs-5 mb-0 pb-0 lh-sm" + text_class}>
                            {unit.name}</div>

                        <span className={"material-symbols-outlined  text-dark-emphasis text-success "+icon}>
                            done_all</span>
                    </div>
                    {/*<Card.Subtitle><span className={text_class}>*/}
                    {/*    {capitalize(props.activeClassStandard.name.slice(0, 20)) + " ..."}*/}
                    {/*</span></Card.Subtitle>*/}
                    <Card.Text className={"text-dark-emphasis "}>
                        {unit.first_objective.slice(0, 25) + " ..."}
                    </Card.Text>

                </Card.Body>

                <Badge
                    className={"position-absolute badge badge-bg-color rounded-pill end-0 opacity-75 bottom-0 mb-2 me-3 "}
                    bg={"secondary"}
                >{unit.progress + "%"} </Badge>
            </Card>

        list.push(item)

    }


    let now = props.activeClassStandard.progress;
    return (<>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={{}} className={"bg-light "}
                     handleAdd={null} handleEdit={() => {
            }} handleDelete={null}
                     editClassName={"d-none"} addClassName={"d-none"}
                     deleteClassName={"d-none"} toggleClassName={"d-none"}
                     title={title}
                     {...props}></Toolbar>
            <div className={"pt-3 px-5"}>
                <ProgressBar className={""} style={{height: "1.5rem"}}
                             now={now} label={now + "%"} variant={"success"}/>
            </div>
            <div className={"d-flex gap-3    py-3 px-3 flex-wrap  align-items-start justify-content-center"}>
                {list}
            </div>

        </>
    )


}

export {ClassUnitList}