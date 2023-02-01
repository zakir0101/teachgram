import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";


function ConfirmDelete(props) {

    let msg = ""
    if(props.text)
        msg = <p> {props.text}</p> ;
    else
        msg = <p> are you sure you want to delete "{props.name}" ,
        <strong>it can`t be undone</strong></p>

    return (

        <Modal centered show={props.del} onHide={props.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {msg}
            </Modal.Body>
            <Modal.Footer>
                <div className={"flex-grow-1 d-flex gap-2 align-items-center justify-content-end "}>
                    <Button variant="secondary" onClick={props.handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={props.handleDeleteOk}>
                        OK
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>)
}

export {ConfirmDelete}