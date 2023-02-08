import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
function Tracker(props) {

    const [counter, setCounter] = useState(props.item.counter);
    const max = props.item.max;
    
    function incrementCounter()
    {
        setCounter((prevCounter) => {
            return prevCounter + 1;
        })
    }

    function decrementCounter()
    {
        setCounter((prevCounter) => {
            return prevCounter - 1;
        })
    }
    function moveUpHandler()
    {
        props.moveUpHandler(props.index);
    }
    function moveDownHandler()
    {
        props.moveDownHandler(props.index);
    }


    return (
        <Card className="shadow p-3 mb-1 bg-body rounded m-3">
            <Card.Body>
                <Row>
                    <Col>
                    <Button variant="primary" size="sm" onClick={moveUpHandler}>^</Button>
                    <Button variant="primary" size="sm" onClick={moveDownHandler}>V</Button>
                    </Col>
                    <Col>
                        <Card.Text className="text-start">{props.item.name}</Card.Text>
                    </Col>
                    <Col className="">
                        <Row className="float-center">
                            <Col className=""><Button className="m-2 float-end" variant="primary" size="sm" onClick={incrementCounter}>+</Button></Col>
                            <Col className=""><Card.Text className={"m-2 text-center " + (max > 0 && counter > max ? "text-danger" : "")}>{counter}{max > 0 ? "/" + max : ""}</Card.Text></Col>
                            <Col className=""><Button className="m-2 float-start" variant="danger" size="sm" onClick={decrementCounter}>-</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

export default Tracker;