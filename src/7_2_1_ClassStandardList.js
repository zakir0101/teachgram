import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";
import {Toolbar} from "./Toolbar";


function ClassStandardList(props) {

    let [addStandard, setAddStandard] = useState(false)
    let [delStandard, setDelStandard] = useState(false)
    let [editingStandard, setEditingStandard] = useState({})
    let [addCycle, setAddCycle] = useState(false)
    let [editCycle, setEditCycle] = useState(false)
    let [delCycle, setDelCycle] = useState(false)
    let [editingCycle, setEditingCycle] = useState({})
    let [StandardList, setStandardList] = useState([])
    let [selectedStandard, setSelectedStandard] = useState({})


    let getStandardList = () => {
        let msg = {type: 'standard', command: 'get', class_id: props.activeClass.id, user_id: props.user.id}
        post_message_action(msg, () => {
            },
            (data) => setStandardList(data),
            () => {
            })
    }

    useEffect(() => {
        getStandardList()
    }, [])




    let nav_btn_class = "my_icon_btn_light"

    return (<>
            <Toolbar titleCenterd={false}
                     buttonVariant={"outline-light"}
                     variant={"light"} toggleDefualt={false}
                     selected={{}} className={"bg-light "}
                     handleAdd={()=>{}} handleEdit={()=>{}} handleDelete={()=>{}}
                     editClassName={nav_btn_class} addClassName={nav_btn_class}
                     deleteClassName={nav_btn_class} toggleClassName={"d-none"}
                     title={"Standard List"}
                     {...props}></Toolbar>
            <div style={{height:"14rem"}} className={""}>

            </div>

        </>
    )
}


export {ClassStandardList}