import {useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {ClassList} from "./7_1_0_ClassList";
import {ClassPreview} from "./7_2_0_ClassPreview";

function ClassWindow(props) {
    let [classSection, setClassSection] = useState("ClassList")
    let [activeClass, setActiveClass] = useState({})
    let [activeClassStandard, setActiveClassStandard] = useState({})
    let [activeClassUnit, setActiveClassUnit] = useState({})
    let [activeClassSubjective, setActiveClassSubjective] = useState({})
    let [activeClassCycle, setActiveClassCycle] = useState({})
    let mainWindow;


    if (props.windowSize === "sm")
        switch (classSection) {
            case "ClassList" :
                mainWindow = <ClassList setClassSection={setClassSection}
                                        setActiveClass={setActiveClass} activeClass={activeClass}
                                        {...props}></ClassList>
                break;
            case "ClassPreview":
                mainWindow = <ClassPreview setActiveClassCycle={setActiveClassCycle}
                    setClassSection={setClassSection} activeClass={activeClass}
                    setActiveClass={setActiveClass} {...props}></ClassPreview>
                break;
            case "ClassUnitList":
                mainWindow = <ClassUnitList {...props}></ClassUnitList>
                break;
            case "ClassSubjectiveList":
                mainWindow = <ClassSubjectiveList {...props}></ClassSubjectiveList>
                break;
            case "ClassSubjectiveDetail":
                mainWindow = <ClassSubjectiveDetail {...props}></ClassSubjectiveDetail>
                break;
            case "ClassLessonList":
                mainWindow = <ClassLessonList {...props}></ClassLessonList>
                break;
            case "ClassLessonDetail":
                mainWindow = <ClassLessonDetail {...props}></ClassLessonDetail>
                break;
        }
    else if (props.windowSize === "lg") {

        switch (classSection) {

            case "ClassList":
            case "ClassPreview":
                console.log("iam here")
                mainWindow = (
                    <Container fluid className={"overflow-hidden px-0"}>
                        <Row className={"h-100 gx-0 "}>
                            <Col md={5} lg={4} xl={3} className={"h-100"}>
                                <ClassList setClassSection={setClassSection} activeClass={activeClass}
                                           setActiveClass={setActiveClass}  {...props}></ClassList>
                            </Col>
                            <Col md={7} lg={8} xl={9} className={"h-100"}>
                                {!activeClass.name ? <></> :
                                    <ClassPreview setActiveClassCycle={setActiveClassCycle}
                                        setClassSection={setClassSection} activeClass={activeClass}
                                                  setActiveClass={setActiveClass} {...props}></ClassPreview>
                                }
                            </Col>
                        </Row>
                    </Container>)
                break;
            case "ClassUnitList":
                mainWindow = <ClassUnitList {...props}></ClassUnitList>
                break;
            default:
                mainWindow = <div></div>

        }
    }

    return (<>{mainWindow}</>)
}

function ClassUnitList(props) {
    return (<div></div>)

}


function ClassSubjectiveList(props) {
    return (<div></div>)
}

function ClassSubjectiveDetail(props) {
    return (<div></div>)
}


function ClassLessonList(props) {
    return (<div></div>)

}

function ClassLessonDetail(props) {
    return (<div></div>)
}

export {ClassWindow}