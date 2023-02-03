import './bootstrap.css'
import './styles.css'
import { useState} from "react";
import {Home} from "./5_Home";
import {About} from "./6_About";
import {MyNavbar} from "./2_myNavbar";
import userEvent from "@testing-library/user-event";
import {ClassWindow} from "./7_0_ClassWindow";
import {StandardWindow} from "./8_0_StandardWindow";


function getScreenSize() {
    if (window.innerWidth < 768)
        return "sm"
    else
        return 'lg'
}
function App() {
    let [syntaxError, setSyntaxError] = useState("")
    let [showLogin, setShowLogin] = useState(false);
    let [showSignup, setShowSignup] = useState(false);
    let [section, setSection] = useState("Home")
    let [windowSize, setWindowSize] = useState(getScreenSize())
    let [windowHeight, setWindowHeight] = useState(window.innerHeight.toString()+"px")
    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState({username: "", password: ""})
    window.onresize = () => {

        setWindowSize(getScreenSize());
        setWindowHeight(window.innerHeight.toString()+"px")
        console.log(window.innerHeight.toString()+"px")
    }

    let def =
        <div
            className={"d-flex  justify-content-center align-items-center "} >
            <strong>you have to
                <span onClick={() => setShowLogin(true)} className={"link-primary "}> login </span>
                to view this page
            </strong>
        </div>
    let navbar_hide = false
    let mainWindow = {}

    switch (section) {
        case 'Home':
            mainWindow = <Home className={"mb-0 overflow-auto"}></Home>
            break
        case 'Classes':
            if (!logged)
                mainWindow = def
            else {
                mainWindow = <ClassWindow section={section} setSection={setSection} setSyntaxError={setSyntaxError}
                                          windowSize={windowSize} user={user}></ClassWindow>
                navbar_hide = true
            }
                break;
        case 'Standards':
            if (!logged)
                mainWindow = def
            else {
                mainWindow= <StandardWindow section={section} setSection={setSection} setSyntaxError={setSyntaxError}
                                         windowSize={windowSize} user={user}></StandardWindow>
                navbar_hide = true
            }
            break
        case 'About':
            mainWindow = <About className={"overflow-auto"}></About>
            break

    }

    return (
        <div style={{height:windowHeight}}
                className={"d-grid template-row overflow-hidden   app-bg"}>
            {syntaxError ? <div className={"vh-100 text-danger"}
                                dangerouslySetInnerHTML={{__html: syntaxError}}></div> :
                <>
                    {navbar_hide ? <div></div> :
                        <MyNavbar user={user} setUser={setUser} setSyntaxError={setSyntaxError}
                                  showLogin={showLogin} showSignup={showSignup}
                                  setShowLogin={setShowLogin} setShowSignup={setShowSignup}
                                  windowSize={windowSize} setLogged={setLogged} logged={logged}
                                  setSection={setSection}></MyNavbar>
                    }
                    {mainWindow}
                </>
            }
        </div>
    );
}

export default App
