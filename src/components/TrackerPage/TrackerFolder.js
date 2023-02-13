import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import React, { useState } from 'react';
import Tracker from './Tracker';


function TrackerFolder(props)
{
    const [expand, setExpand] = useState(false);
    const [trackerList, setTrackerList] = useState(props.item.trackers);

    function expandHandler()
    {
        setExpand(!expand);
    }

    function moveUpHandler()
    {
        props.moveUpHandler(props.index);
    }
    function moveDownHandler()
    {
        props.moveDownHandler(props.index);
    }

    function moveUp(currIndex)
    {
        if(currIndex === 0)
        {
            //Do nothing
        }
        else
        {
            let updatedTrackers = [...trackerList];
            const currentNode = trackerList[currIndex];
            const displacedNode = trackerList[currIndex - 1];

            updatedTrackers[currIndex] = displacedNode;
            updatedTrackers[currIndex - 1] = currentNode;

            setTrackerList(updatedTrackers);
            props.updateInnerList(props.index, updatedTrackers);
        }
    }

    function moveDown(currIndex)
    {
        if(currIndex === trackerList.length - 1)
        {
            //Do nothing
        }
        else
        {
            let updatedTrackers = [...trackerList]
            const currentNode = trackerList[currIndex];
            const displacedNode = trackerList[currIndex + 1];

            updatedTrackers[currIndex] = displacedNode;
            updatedTrackers[currIndex + 1] = currentNode;
            
            setTrackerList(updatedTrackers);
            props.updateInnerList(props.index, updatedTrackers);
        }
    }


    return(
        <div>
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
                            <Button className="float-end" variant="primary" size="sm" onClick={expandHandler}>{expand ? "v" : ">"}</Button>
                    </Col>
                </Row>
                {expand && 
                    <Row>
                        <Col className="ml-3">
                            {props.item.trackers.map((item, index) => {
                                return (<Tracker key={"trackers " + item.id} item={item} index={index} moveUpHandler={moveUp} moveDownHandler={moveDown}/>)
                            })}
                        </Col>
                    </Row>
                }
            </Card.Body>
        </Card>
        </div>
    );
}

export default TrackerFolder;