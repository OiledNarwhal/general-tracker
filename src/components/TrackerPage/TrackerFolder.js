import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Tracker from './Tracker';
import AddingPageFolder from '../AddingPage/AddingPageFolder';


function TrackerFolder(props)
{
    const [expand, setExpand] = useState(false);
    const [trackerList, setTrackerList] = useState(props.item.trackers);
    const [folderAdding, setFolderAdding] = useState(false);


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
    function addingHandler()
    {
        setFolderAdding(!folderAdding);
    }

    function addTracker(trackerName, counter, max)
    {
        /*
            Tracker properties:
            {name: 'one', id: 1, counter: 2, max: 10}
        */
        let tracker = {name: trackerName, id: Math.random(), counter: counter, max: max, folder: false};
        let updatedTrackerList = [...trackerList, tracker]
        setTrackerList(updatedTrackerList);
        props.updateInnerList(props.index, updatedTrackerList);
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
            {!folderAdding && <Card className="shadow p-3 mb-1 bg-body rounded m-3">
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
                    <div>
                        <Row>
                            <Col className="ml-3">
                                {props.item.trackers.map((item, index) => {
                                    return (<Tracker key={"trackers " + item.id} item={item} index={index} moveUpHandler={moveUp} moveDownHandler={moveDown}/>)
                                })}
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col md="auto">
                                <Button className="m-3" variant="primary" onClick={addingHandler}>+</Button>
                            </Col>
                        </Row>
                    </div>
                }
            </Card.Body>
        </Card>}
        {folderAdding && <div>
                <AddingPageFolder toggleAdding={addingHandler} addTracker={addTracker}></AddingPageFolder>
            </div>}
        </div>
    );
}

export default TrackerFolder;