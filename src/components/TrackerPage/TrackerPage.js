import Tracker from "./Tracker";
import AddingPage from "../AddingPage/AddingPage";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import { useState, useCallback } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function TrackerPage() 
{
    const [testTrackers, setTestTrackers] = useState([{name: 'one', id: 0, counter: 2, max: 10}, {name: 'two', id: 1, counter: 3, max: 4}, {name: 'three', id: 2, counter: 0, max: 0}]);
    const [adding, setAdding] = useState(false);

    //A button to move the specific tracker up one slot.
    function moveUp(currIndex)
    {
        if(currIndex === 0)
        {
            //Do nothing
        }
        else
        {
            let updatedTrackers = [...testTrackers];
            const currentNode = testTrackers[currIndex];
            const displacedNode = testTrackers[currIndex - 1];

            updatedTrackers[currIndex] = displacedNode;
            updatedTrackers[currIndex - 1] = currentNode;

            setTestTrackers(updatedTrackers);
        }
    }

    function moveDown(currIndex)
    {
        if(currIndex === testTrackers.length - 1)
        {
            //Do nothing
        }
        else
        {
            let updatedTrackers = [...testTrackers]
            const currentNode = testTrackers[currIndex];
            const displacedNode = testTrackers[currIndex + 1];

            updatedTrackers[currIndex] = displacedNode;
            updatedTrackers[currIndex + 1] = currentNode;
            
            setTestTrackers(updatedTrackers);
        }
    }

    function toggleAdding()
    {
        setAdding(!adding);
    }
    function addTracker(trackerName, counter, max)
    {
        /*
            Tracker properties:
            {name: 'one', id: 1, counter: 2, max: 10}
        */
        let tracker = {name: trackerName, id: testTrackers.length, counter: counter, max: max};
        setTestTrackers([...testTrackers, tracker]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {!adding && <div>
            <div>
                {testTrackers.map((item, index) => (
                    <Tracker key={"trackers " + item.id} item={item} index={index} moveUpHandler={moveUp} moveDownHandler={moveDown}/>
                ))}
            </div>
            <div>
                <Card className="shadow mb-1 bg-primary rounded m-3">
                    <Card.Body>
                        <Row>
                            <Button variant="primary" onClick={toggleAdding}>+</Button>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
            </div>}
            {adding && <div>
                <AddingPage toggleAdding={toggleAdding} addTracker={addTracker}></AddingPage>
            </div>}
        </DndProvider>
    );
}

export default TrackerPage;