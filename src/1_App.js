import './bootstrap.css'
import './styles.css'
import { useState} from "react";
import {Home} from "./5_Home";
import {About} from "./6_About";
import {MyNavbar} from "./2_myNavbar";
import userEvent from "@testing-library/user-event";
import {ClassWindow} from "./7_0_ClassWindow";


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
    let [logged, setLogged] = useState(false);
    let [user, setUser] = useState({username: "", password: ""})
    window.onresize = () => {
        setWindowSize(getScreenSize());
    }
    let def =
        <div className={"d-flex  justify-content-center align-items-center "}>
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
                mainWindow = <ClassWindow setSection={setSection} windowSize={windowSize} user={user}></ClassWindow>
                navbar_hide = true
            }
                break;
        case 'Standards':
            if (!logged)
                mainWindow = def
            break
        case 'About':
            mainWindow = <About className={"overflow-auto"}></About>
            break

    }

    return (
        <div className={"vh-100  d-grid template-row overflow-hidden"}>
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
