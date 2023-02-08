import Tracker from "./Tracker";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import { useState, useCallback } from "react";
function DraggingTrackerPage() 
{
    const [testTrackers, setTestTrackers] = useState([{name: 'one', id: 1}, {name: 'two', id: 2}, {name: 'three', id: 3}]);

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = testTrackers[dragIndex];
            const hoverItem = testTrackers[hoverIndex];

            //Swap places of dragItem and hoverItem in the tracker array
            setTestTrackers(testTrackers => {
                const updatedTrackers = [...testTrackers];
                updatedTrackers[dragIndex] = hoverItem;
                updatedTrackers[hoverIndex] = dragItem;
                return updatedTrackers;
            })
        },
        [testTrackers],
    )

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                {testTrackers.map((item, index) => (
                    <Tracker id={"trackers " + index} title={item.name} index={index} moveListItem={moveListItem}/>
                ))}
            </div>
        </DndProvider>
    );
}

export default DraggingTrackerPage;