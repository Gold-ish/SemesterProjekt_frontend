import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import facade from "./apiFacade";

export function EditUser({ username, gender, birthday, setUserData }) {
    const [catchError, setCatchError] = useState();
    const [show, setShow] = useState(false);
    const [isBlocking, setIsBlocking] = useState(false);
    const [newGender, setNewGender] = useState();
    const [newBirthday, setNewBirthday] = useState();

    const handleClose = () => {
        if (isBlocking) {
            if (catchError === undefined) {
                alert("Are you sure you want to close?");
            }
            setIsBlocking(false);
        } else {
            setShow(false);
        }
    };
    const handleShow = () => setShow(true);
    const handleSubmit = (event) => {
        event.preventDefault();
        facade.editUser(username, newGender, newBirthday)
            .then((data) => setUserData(data),
                (rejected) => {
                    if (rejected.status) {
                        rejected.fullError.then((error) => setCatchError(error.message));
                    }
                }
            );
        handleClose();
    };

    return (
        <>
            <Button onClick={handleShow}>
                Edit user
        </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit user</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <p>Gender:</p>
                        <fieldset
                            onChange={(event) => {
                                setNewGender(event.target.value);
                                setIsBlocking(true);
                            }} defaultChecked={gender}
                        >
                            <input type="radio" id="male" name="gender" value="male" />
                            <label htmlFor="male">Male</label>
                            <input type="radio" id="female" name="gender" value="female" />
                            <label htmlFor="female">Female</label>
                            <input type="radio" id="other" name="gender" value="other" />
                            <label htmlFor="other">Other</label>
                        </fieldset>
                        <br />
                        <p>Date of birth: </p>
                        <input
                            type="date" defaultValue={birthday}
                            onChange={(event) => {
                                setIsBlocking(true);
                                setNewBirthday(event.target.value);
                            }}
                        />
                        {catchError !== undefined && <ShowErrorMsg catchError={catchError} setIsBlocking={setIsBlocking} />}
                    </Modal.Body>
                    <Modal.Footer>
                        <input
                            type="submit"
                            value="Save changes"
                            onClick={() => setIsBlocking(false)}
                        />
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

function ShowErrorMsg({ catchError, setIsBlocking }) {
    setIsBlocking(true);
    return <p className="errorMsg"><b>{catchError}</b></p>;
}
