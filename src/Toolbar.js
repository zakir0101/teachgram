import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useState} from "react";

function Toolbar(props) {
    let containerClass , brandMargin
    if(props.titleCenterd)
    {
        containerClass="justify-content-between"
        brandMargin = ""
    }
    else {
        containerClass="justify-content-end"
        brandMargin = "me-auto"
    }
    return (
        <Navbar collapseOnSelect     variant={props.variant} className={props.className}  expand={false}>
            <Container fluid className={"gap-1 "+containerClass}>
                {props.titleCenterd ? <div></div>:<></>}
                <Navbar.Brand href="#home" className={brandMargin}>{props.title}</Navbar.Brand>
                {  Object.keys(props.selected).length === 0  ? <></> :
                    <>
                        <Button id={"del"} variant={props.buttonVariant} onClick={props.handleDelete}
                                className={"navbar-toggler "+props.deleteClassName}>
                        <span className="material-symbols-outlined d-flex m-0 align-items-center  fs-4 ">delete</span>
                        </Button>
                        <Button id={"edit"} variant={props.buttonVariant} onClick={props.handleEdit}
                                className={"navbar-toggler  "+props.editClassName}>
                            <span
                                className="material-symbols-outlined d-flex m-0 align-items-center  fs-4 ">edit</span>
                        </Button>
                    </>
                }
                <Button id={"add"} variant={props.buttonVariant} onClick={props.handleAdd}
                        className={"navbar-toggler "+props.addClassName}>
                        <span className="material-symbols-outlined d-flex m-0 align-items-center   fs-4 ">
                            add</span></Button>

                <Navbar.Toggle className={"btn btn-"+props.buttonVariant+" "+props.toggleClassName} aria-controls="basic-navbar-nav ">
                    <span className="material-symbols-outlined d-flex m-0 align-items-center    fs-4 ">
                            more_vert</span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {['Home', 'Classes', 'Standards', 'About'].map(name =>
                            <Nav.Link key={"$" + name} onClick={() =>{ props.setSection(name) }}
                                      href={"#" + name}> {name}</Nav.Link>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}

export {Toolbar}