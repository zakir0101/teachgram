import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {post_message} from "./teachgram_api";
import {useEffect, useState} from "react";
import {getUserCookies, saveUserCookies} from "./cookies";

function Login(props) {
    let [error, setError] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")


    let handleChange = (event) => {
        setError("")
        if (event.target.type === "password")
            setPassword(event.target.value)
        else
            setUsername(event.target.value)
    }

    let handleLogin = () => {
        if (username && password)
            getUser(username, password)
        else
            setError("you have to enter your username and password")
    }

    let getUser = (username, password) => {
        let msg = {type: 'user', command: 'get', username: username, password: password}
        post_message(msg).then((data) => {
            switch (data.type) {
                case "ERROR":
                    setError(data.msg)
                    break;
                case "SUCCESS" :
                    props.setShowLogin(false)
                    props.setUser(data)
                    props.setLogged(true)
                    saveUserCookies(data)
                    props.setSection("Classes")
                    break
                case "error" :
                    props.setSyntaxError(data.msg)
                    break

            }
        })

    }


    useEffect(() => {
        let user = getUserCookies()
        if (user.username && user.password) {
            getUser(user.username, user.password)
            setError("")
        }
    }, []);

    return (
        <Modal centered show={props.showLogin} onHide={() => props.setShowLogin(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Login to your Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>username</Form.Label>
                        <Form.Control value={username} onChange={handleChange} type={"text"} placeholder={""}/>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <Form.Label>password</Form.Label>
                        <Form.Control type={"password"} value={password} onChange={handleChange} placeholder={""}/>
                    </FormGroup>
                    <p className={"small text-danger"}>{error}</p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex-grow-1 d-flex gap-2 align-items-center "}>
                    <div className={"me-auto small"}>don`t have acount ,
                        <span className={"link-primary"}
                              onClick={() => {
                                  props.setShowLogin(false);
                                  props.setShowSignup(true)
                              }}> sign up</span>
                    </div>
                    <Button variant="secondary" onClick={() => props.setShowLogin(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>)
}

export {Login}