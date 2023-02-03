import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClassList} from "./7_1_0_ClassList";
import {ClassPreview} from "./7_2_0_ClassPreview";
import {ClassStandardList} from "./7_2_1_ClassStandardList";
import {ClassCycleList} from "./7_2_2_ClassCycleList";
import {Toolbar} from "./Toolbar";

function ClassWindow(props) {
    let [upSection, setUpSection] = useState("ClassStandardList")
    let [classSection, setClassSection] = useState("ClassList")
    let [activeClass, setActiveClass] = useState({})

    let [activeClassStandard, setActiveClassStandard] = useState({})
    let [activeClassUnit, setActiveClassUnit] = useState({})
    let [activeClassCycle, setActiveClassCycle] = useState({})

    let mainWindow;

    useEffect(() => {
        if(props.section==="Classes")
            setClassSection("ClassList")

        }   ,  [props.section])

    if (props.windowSize === "sm")
        switch (classSection) {
            case "ClassList" :
                mainWindow = <div><ClassList upSection={upSection} setUpSection={setUpSection}
                    setClassSection={setClassSection}
                    setActiveClass={setActiveClass} activeClass={activeClass}
                    {...props}></ClassList></div>
                break;
            case "ClassPreview":
                mainWindow = <ClassPreview activeClassStandard={activeClassStandard}
                    setActiveClassStandard={setActiveClassStandard}
                    activeClassUnit={activeClassUnit} setActiveClassUnit={setActiveClassUnit}
                    activeClassCycle={activeClassCycle} setActiveClassCycle={setActiveClassCycle}


                    upSection={upSection} setUpSection={setUpSection}
                                            classSection={classSection}
                                           setClassSection={setClassSection} activeClass={activeClass}
                                           setActiveClass={setActiveClass} {...props}></ClassPreview>
                break;
        }
    else if (props.windowSize === "lg") {

        switch (classSection) {

            case "ClassList":
            case "ClassPreview":
                mainWindow = (
                    <Container fluid className={"overflow-hidden px-0"}>
                        <Row className={"h-100 gx-0 "}>
                            <Col md={5} lg={4} xl={4} className={"h-100"}>
                                <ClassList upSection={upSection} setUpSection={setUpSection}
                                    setClassSection={setClassSection} activeClass={activeClass}
                                           setActiveClass={setActiveClass}  {...props}></ClassList>
                            </Col>
                            <Col md={7} lg={8} xl={8} className={"h-100"}>
                                {activeClass.name ?
                                    <ClassPreview activeClassStandard={activeClassStandard}
                                                  setActiveClassStandard={setActiveClassStandard}
                                                  activeClassUnit={activeClassUnit} setActiveClassUnit={setActiveClassUnit}
                                                  activeClassCycle={activeClassCycle} setActiveClassCycle={setActiveClassCycle}
                                                  upSection={upSection} setUpSection={setUpSection}
                                                  classSection={classSection}
                                                  setClassSection={setClassSection} activeClass={activeClass}
                                                  setActiveClass={setActiveClass} {...props}></ClassPreview>
                                    :
                                    <div className={"d-grid template-row-inverse h-100"}>

                                        <div></div>
                                        <Toolbar titleCenterd={true}
                                                 buttonVariant={"outline-dark"}
                                                 variant={"dark"} toggleDefualt={false}
                                                 selected={{}} className={"bg-dark "}
                                                 handleAdd={() => {
                                                 }} handleEdit={() => {
                                        }} handleDelete={() => {
                                        }}
                                                 editClassName={"d-none"} addClassName={"d-none"}
                                                 deleteClassName={"d-none"} toggleClassName={"my_icon_btn_dark"}
                                                 title={"Main"}
                                                 {...props}></Toolbar>

                                    </div>
                                }
                            </Col>
                        </Row>
                    </Container>)
                break;

        }
    }

    return (<>{mainWindow}</>)
}


export {ClassWindow}