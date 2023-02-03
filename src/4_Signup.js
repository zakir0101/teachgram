import {Button, Form, FormGroup, Modal, Spinner} from "react-bootstrap";
import {post_message, post_message_action} from "./teachgram_api";
import {saveUserCookies} from "./cookies";
import {useState} from "react";

function Signup(props) {
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [confirm, setConfirm] = useState("")


    let handleChange = (event) => {
        setError("")
        if (event.target.type === "password")
            setPassword(event.target.value)
        else
            setUsername(event.target.value)
    }

    let handleConfirm = (event) => {
        setError("")
        setConfirm(event.target.value)
    }


    let handleSignup = () => {
        if (username && password && confirm)
            if (confirm === password) {
                setUser(username, password)
                setLoading(true)
            } else
                setError("password dont`t match")

        else if (!username || !password)
            setError("you have to enter your username and password ")
        else if (!confirm)
            setError("you have to confirm your password")

    }


    let setUser = (username, password) => {

        let msg = {type: 'user', command: 'set', username: username, password: password}

        let handleSuccess = (data) => {
            setLoading(true)
            props.setShowSignup(false)
            props.setUser(data)
            props.setLogged(true)
            saveUserCookies(data)
            props.setSection("Classes")

        }

        post_message_action(msg, (msg) => {
            setError(msg);
            setLoading(false)
        }, handleSuccess, props.setSyntaxError)
        // post_message(msg).then((data) => {
        //     switch (data.type) {
        //         case "ERROR":
        //             setError(data.msg)
        //             break;
        //         case "SUCCESS" :
        //             props.setShowSignup(false)
        //             props.setUser(data)
        //             props.setLogged(true)
        //             saveUserCookies(data)
        //             break
        //         case "error" :
        //             props.setSyntaxError(data.msg)
        //             break
        //
        //     }
        // })
    }

    let divClass = "d-none"
    if(loading)
        divClass=" "
    return (

        <div className={"position-relative"}>
            <Modal centered show={props.showSignup} onHide={() => props.setShowSignup(false)}
            >
                <div
                    className={"position-absolute z-3 w-100 h-100 standard-card justify-content-center" +
                        " align-items-center start-50 me-5 top-50 d-flex flex-column translate-middle "+divClass}
                >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h5>Registering User ...</h5>
                </div>
                <Modal.Header closeButton>
                    <Modal.Title>Create new Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup className={"mb-3"}>
                            <Form.Label>username</Form.Label>
                            <Form.Control value={username} onChange={handleChange} type={"text"} placeholder={""}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"}>
                            <Form.Label>password</Form.Label>
                            <Form.Control value={password} onChange={handleChange} type={"password"} placeholder={""}/>
                        </FormGroup>
                        <FormGroup className={"mb-3"}>
                            <Form.Label>Confirm your password</Form.Label>
                            <Form.Control type={"password"} placeholder={""} value={confirm} onChange={handleConfirm}/>
                        </FormGroup>
                        <p className={"small text-danger"}>{error}</p>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className={"flex-grow-1 d-flex gap-2 align-items-center "}>
                        <div className={"me-auto small"}>already user ,
                            <span className={"link-primary"}
                                  onClick={() => {
                                      props.setShowSignup(false)
                                      props.setShowLogin(true);
                                  }}> login</span>
                        </div>
                        <Button variant="secondary" onClick={() => props.setShowSignup(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSignup}>
                            Sign up
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}


export {Signup}