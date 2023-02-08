import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

function AddingPage(props) 
{
    const [nameInput, setNameInput] = useState("");
    const [maxInput, setMaxInput] = useState(0);

    function nameChangeHandler(event) 
    {
        setNameInput(event.target.value);
    }

    function maxChangeHandler(event) 
    {
        setMaxInput(event.target.value);
    }
    function addTrackerHandler()
    {
        if(nameInput !== "")
        {
            props.addTracker(nameInput, 0, maxInput);
            props.toggleAdding();
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
                            <Form.Label>Max Value</Form.Label>
                            <Form.Control type="number" onChange={maxChangeHandler}/>
                            <Form.Text className="text-muted">Input 0 for a tracker without a maximum bound</Form.Text>
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