import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {post_message} from "./teachgram_api";
import {saveUserCookies} from "./cookies";
import {useState} from "react";

function Signup(props) {

    let [error, setError] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [confirm, setConfirm] = useState("")


    let handleChange = (event) => {
        if (event.target.type === "password")
            setPassword(event.target.value)
        else
            setUsername(event.target.value)
    }

    let handleConfirm = (event) => {
        setConfirm(event.target.value)
    }


    let handleSignup = () => {
        if (username && password && confirm)
            if (confirm === password)
                setUser(username, password)
            else
                setError("password dont`t match")

        else if(!username || !password)
            setError("you have to enter your username and password ")
        else if(!confirm)
            setError("you have to confirm your password")

    }


    let setUser = (username, password) => {

        let msg = {type: 'user', command: 'set', username: username, password: password}
        post_message(msg).then((data) => {
            switch (data.type) {
                case "ERROR":
                    setError(data.msg)
                    break;
                case "SUCCESS" :
                    props.setShowSignup(false)
                    props.setUser(data)
                    props.setLogged(true)
                    saveUserCookies(data)
                    break
                case "error" :
                    props.setSyntaxError(data.msg)
                    break

            }
        })
    }

    return (

        <Modal centered show={props.showSignup} onHide={() => props.setShowSignup(false)}>
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
    )
}


export {Signup}