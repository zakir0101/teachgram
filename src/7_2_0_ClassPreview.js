import {Toolbar} from "./Toolbar";
import {ClassStandardList} from "./7_2_1_ClassStandardList";
import {ClassCycleList} from "./7_2_2_ClassCycleList";
import {useEffect, useState} from "react";
import {ClassUnitList} from "./7_3_ClassUnitList";
import {ClassObjectiveList} from "./7_4_ClassObjectiveList";
import {ClassLessonList} from "./7_5_ClassLessonList";

function ClassPreview(props) {
    let [activeClassStandard, setActiveClassStandard] = useState({})
    let [activeClassUnit, setActiveClassUnit] = useState({})
    let [activeClassCycle, setActiveClassCycle] = useState({})


    useEffect(() => {
        let standard_id = activeClassStandard.id
        if ( standard_id) {
            for (const standard of props.activeClass.standard_list) {
                if (standard.id === standard_id) {
                    setActiveClassStandard(standard)
                    let unit_id = activeClassUnit.id
                    if ( unit_id ) {
                        for (const unit of standard.unit_list) {
                            if (unit.id === unit_id)
                                setActiveClassUnit(unit)
                        }
                    }

                }
            }
        }


    } , [props.activeClass])


    let upWindow
    switch (props.upSection){
        case "ClassCycleList":
        case "ClassStandardList":
            upWindow =<>
                <ClassStandardList setActiveClassStandard={setActiveClassStandard}
                                   setUpSection={props.setUpSection} {...props}></ClassStandardList>;
                <ClassCycleList  setActiveClassCycle={setActiveClassCycle}
                    setUpSection={props.setUpSection} {...props}></ClassCycleList>

            </>
            break;
        case "ClassUnitList":
            upWindow = <ClassUnitList  setActiveClassUnit={setActiveClassUnit}
                        activeClassStandard={activeClassStandard}
                        setUpSection={props.setUpSection} {...props} ></ClassUnitList>
            break;
        case "ClassObjectiveList":
            upWindow = <ClassObjectiveList activeClassUnit={activeClassUnit}
                setUpSection={props.setUpSection} {...props} ></ClassObjectiveList>
                break ;
        case "ClassLessonList":
            upWindow = <ClassLessonList activeClassCycle={activeClassCycle}
                setUpSection={props.setUpSection} {...props} ></ClassLessonList>
            break;
    }




    let nav_btn_class_main="my_icon_btn_dark"
    return (
        <div className={"d-grid template-row-inverse overflow-auto h-100"}>

           <div className={" overflow-auto " }>
               {upWindow}
            </div>
            <Toolbar titleCenterd={true}
                     buttonVariant={"outline-dark"}
                     variant={"dark"} toggleDefualt={false}
                     selected={{}} className={"bg-dark "}
                     handleAdd={()=>{}} handleEdit={()=>{}} handleDelete={()=>{}}
                     editClassName={"d-none"} addClassName={"d-none"}
                     deleteClassName={"d-none"} toggleClassName={nav_btn_class_main}
                     title={props.activeClass.name}
                      {...props}></Toolbar>

        </div>)
}







export {ClassPreview}