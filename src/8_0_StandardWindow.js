import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";

import {Toolbar} from "./Toolbar";
import {StandardList} from "./8_1_StandardList";
import {UnitList} from "./8_2_UnitList";
import {ObjectiveList} from "./8_3_ObjectiveList";

function StandardWindow(props) {
    let [standardSection, setStandardSection] = useState("StandardList")
    let [activeStandard, setActiveStandard] = useState({})
    let [activeUnit, setActiveUnit] = useState({})

    let mainWindow, sideWindow;

    useEffect(() => {
        if (props.section === "Standards")
            setStandardSection("StandardList")

    }, [props.section])

    let nav_btn_class_main="my_icon_btn_dark"

    let title = "Main"
    if(activeStandard.name)
        title = activeStandard.name

    if (props.windowSize === "sm") {
        switch (standardSection) {
            case "StandardList" :
                mainWindow = <StandardList setStandardSection={setStandardSection}
                                           setActiveStandard={setActiveStandard}
                                           activeStandard={activeStandard}
                                           {...props} ></StandardList>
                break;
            case "UnitList":
                sideWindow = <UnitList standardSection={standardSection}
                                       setStandardSection={setStandardSection} activeStandard={activeStandard}
                                       setActiveUnit={setActiveUnit} {...props}></UnitList>
                break;

            case "ObjectiveList" :
                sideWindow = <ObjectiveList standardSection={standardSection}
                                            setStandardSection={setStandardSection} activeUnit={activeUnit}
                                            {...props}></ObjectiveList>
                break;
        }
        if(!mainWindow)
            mainWindow=  <div className={"d-grid template-row-inverse overflow-auto h-100"}>

                <div className={" overflow-auto " }>
                    {sideWindow}
                </div>
                <Toolbar titleCenterd={true}
                         buttonVariant={"outline-dark"}
                         variant={"dark"} toggleDefualt={false}
                         selected={{}} className={"bg-dark "}
                         handleAdd={()=>{}} handleEdit={()=>{}} handleDelete={()=>{}}
                         editClassName={"d-none"} addClassName={"d-none"}
                         deleteClassName={"d-none"} toggleClassName={nav_btn_class_main}
                         title={title.slice(0,23)+" ..."}
                         {...props}></Toolbar>

            </div>

    }
    else if (props.windowSize === "lg") {


        if (standardSection === "StandardList")
            sideWindow = <div></div>

        else if (standardSection === "UnitList")
            sideWindow =
                <UnitList        standardSection={standardSection}
                                 setStandardSection={setStandardSection} activeStandard={activeStandard}
                                 setActiveUnit={setActiveUnit} {...props}></UnitList>

        else if (standardSection === "ObjectiveList")
            sideWindow =
                <ObjectiveList   standardSection={standardSection}
                                 setStandardSection={setStandardSection} activeUnit={activeUnit}
                                 {...props}></ObjectiveList>



        mainWindow =
            <Container fluid className={"overflow-hidden px-0"}>
                <Row className={"h-100 gx-0 "}>
                    <Col md={5} lg={4} xl={4} className={"h-100"}>
                        <StandardList setStandardSection={setStandardSection}
                                      setActiveStandard={setActiveStandard}
                                      activeStandard={activeStandard}
                                      {...props} ></StandardList></Col>
                    <Col md={7} lg={8} xl={8} className={"h-100"}>
                        <div className={"d-grid template-row-inverse  h-100"}>

                            <div className={" overflow-x-hidden " }>
                                {sideWindow}
                            </div>
                            <Toolbar titleCenterd={true}
                                     buttonVariant={"outline-dark"}
                                     variant={"dark"} toggleDefualt={false}
                                     selected={{}} className={"bg-dark "}
                                     handleAdd={()=>{}} handleEdit={()=>{}} handleDelete={()=>{}}
                                     editClassName={"d-none"} addClassName={"d-none"}
                                     deleteClassName={"d-none"} toggleClassName={nav_btn_class_main}
                                     title={title}
                                     {...props}></Toolbar>

                        </div>
                    </Col>
                </Row>
            </Container>


    }


    return (<>{mainWindow}</>)
}


export {StandardWindow}