import {Toolbar} from "./Toolbar";
import {ClassStandardList} from "./7_2_1_ClassStandardList";
import {ClassCycleList} from "./7_2_2_ClassCycleList";

function ClassPreview(props) {




    let nav_btn_class_main="my_icon_btn_dark"
    return (
        <div className={"d-grid template-row-inverse h-100"}>

           <div className={" overflow-auto " }>
               <ClassStandardList {...props}></ClassStandardList>
               <ClassCycleList  {...props}></ClassCycleList>
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