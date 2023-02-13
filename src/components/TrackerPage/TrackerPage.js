import Tracker from "./Tracker";
import TrackerFolder from "./TrackerFolder";
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
    const [testTrackers, setTestTrackers] = useState([
        {name: 'one', id: 0, counter: 2, max: 10, folder: false}, 
        {name: 'two', id: 1, counter: 3, max: 4, folder: false}, 
        {name: 'three', id: 2, counter: 0, max: 0, folder: false},
        {name: 'folderTest', id: 3, counter: 0, max: 0, folder: true, trackers: [
            {name: 'inside Folder', id: 4, counter: 0, max: 0, folder: false}, 
            {name: 'inside Folder 2', id: 5, counter: 0, max: 15, folder: false}]}
    ]);
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
    function updateFolderList(index, trackerList)
    {
        let updatedTrackers = [...testTrackers];
        testTrackers[index].trackers = trackerList;
        setTestTrackers(updatedTrackers)
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
        let tracker = {name: trackerName, id: Math.random(), counter: counter, max: max};
        setTestTrackers([...testTrackers, tracker]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            {!adding && <div>
            <div>
                {testTrackers.map((item, index) => {
                    return(item.folder === true ?
                        <TrackerFolder key={"trackers " + item.id} item={item} index={index} moveUpHandler={moveUp} moveDownHandler={moveDown} updateInnerList={updateFolderList}/>
                        :
                        <Tracker key={"trackers " + item.id} item={item} index={index} moveUpHandler={moveUp} moveDownHandler={moveDown}/>
                    )
                })}
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