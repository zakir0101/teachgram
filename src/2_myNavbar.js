import {useState} from "react";
import {Badge, Button, Container, Form, FormGroup, Modal, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import {Signup} from "./4_Signup";
import {Login} from "./3_login";
import {deleteUserCookies} from "./cookies";
import {capitalize} from "./util";

function MyNavbar(props) {
    let expand = 'md'
    let [show, setShow] = useState(false)
    let handleLogin = () => {
        setShow(false)
        props.setShowLogin(true)
    }

    let handleSignup = () => {
        setShow(false)

        props.setShowSignup(true)
    }

    let handleLogout = () => {
        setShow(false)
        props.setSection('Home')
        props.setShowLogin(false)
        props.setShowSignup(false)
        props.setLogged(false)
        props.setUser({username: "", password: ""})
        deleteUserCookies()
    }

    let btn_variant
    if (props.windowSize === "sm")
        btn_variant = "outline-primary"
    else
        btn_variant = "outline-light"


    let user_letter, login_form, offcanvas_h
    if (props.logged) {
        user_letter = <Badge bg={"secondary"}
                             className={"bg-light-subtle text-primary rounded-circle fs-5 fw-bold me-2  my-badge"}>
            {props.user.username.charAt(0).toUpperCase()}</Badge>

        login_form = (<><Button variant={btn_variant} onClick={handleLogout}>Logout</Button></>)
    } else {

        user_letter = <></>
        login_form = <>
            <Button variant={btn_variant} onClick={handleSignup}>Sign up</Button>
            <Button onClick={handleLogin} variant={btn_variant}
                    className={"ms-md-2 mt-2 mt-md-0"}>Login</Button>
        </>
    }


    return (
        <>
            <Navbar collapseOnSelect onSelect={() => {
                setShow(false)
            }}
                    variant={"dark"} key={expand} bg={"primary"}
                    expand={expand}
                    className="">
                <Container fluid>
                    {user_letter}
                    <Navbar.Brand href="#" className={"me-auto me-md-0"}>Teachgram</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setShow(true)}/>
                    <Navbar.Offcanvas className={""}
                                      id={`offcanvasNavbar-expand-${expand}`}
                                      placement="end"
                                      show={show}

                    >
                        <Offcanvas.Header closeButton onClick={() => setShow(false)}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                Welcome {capitalize(props.user.username)}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3 ">
                                <div
                                    className={"d-flex justify-content-start ms-2 flex-column flex-md-row flex-grow-1"}>
                                    {['Home', 'Classes', 'Standards', 'About'].map(name =>
                                        <Nav.Link key={"$" + name} onClick={() => props.setSection(name)}
                                                  href={"#" + name}> {name}</Nav.Link>
                                    )}
                                </div>
                            </Nav>
                            <Form className="d-flex flex-column flex-md-row mt-3 mt-md-0">
                                {login_form}
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            {props.logged ? <></> :
                <Login {...props}>
                </Login>
            }
            {!props.showSignup ? <></> :
                <Signup {...props}>
                </Signup>
            }
        </>
    )
}


export {MyNavbar}