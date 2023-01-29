import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {post_message_action} from "./teachgram_api";

function ConfirmDelete(props) {


    return (

        <Modal centered show={props.del} onHide={props.handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>are you sure you want to delete "{props.name}" , <strong>it can`t be undone</strong> </p>
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