import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function AddingPage(props) 
{
    const [nameInput, setNameInput] = useState("");
    const [maxInput, setMaxInput] = useState(0);
    const [isFolder, setIsFolder] = useState(false);

    function nameChangeHandler(event) 
    {
        setNameInput(event.target.value);
    }

    function maxChangeHandler(event) 
    {
        setMaxInput(event.target.value);
    }
    function folderChangeHandler(event) 
    {
        setIsFolder(!isFolder);
    }

    function addTrackerHandler()
    {
        if(nameInput !== "")
        {
            props.addTracker(nameInput, 0, maxInput, isFolder);
            props.toggleAdding();
        }
        else
        {
            console.log('Bad Input');
        }
    }

    return(
        <div>
            <Row>
                <Col className="p-4">
                    <Form>
                        <Form.Group className="mb-3" controlId="formTrackerName">
                            <Form.Label>Tracker Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Tracker Name" onChange={nameChangeHandler}/>
                            <Form.Text className="text-muted"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTrackerMax">
                            <Form.Label>{'Max Value'}</Form.Label>
                            {!isFolder && <Form.Control type="number" onChange={maxChangeHandler}/>}
                            {isFolder && <Form.Control type="number" onChange={maxChangeHandler} disabled/>}
                            <Form.Text className="text-muted">{'Input 0 for a tracker without a maximum bound' + (isFolder ? " (Unnecessary for Tracker Folders)" : "")}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="switch" id="folder-switch" label="Tracker Folder?" onChange={folderChangeHandler}/>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="m-2" variant="primary" onClick={addTrackerHandler}>Add Tracker</Button>
                    <Button className="m-2" variant="danger" onClick={props.toggleAdding}>Cancel</Button>
                </Col>
            </Row>
        </div>
    );
}

export default AddingPage;