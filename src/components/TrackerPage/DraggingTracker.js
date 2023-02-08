import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
function DraggingTracker(props) {

    const [counter, setCounter] = useState(0);
    const max = 10;
    
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

    //Draggable
    const [{isDragging}, dragRef] = useDrag({
        type: 'tracker',
        item: { title: props.title, counter: counter, index: props.index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    //Droppable
    const [spec, dropRef] = useDrop({
        accept: 'tracker',
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = props.index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            props.moveListItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

     // Join the 2 refs together into one (both draggable and can be dropped on)
     const ref = useRef(null)
     const dragDropRef = dragRef(dropRef(ref))

    return (
        <Card className="shadow p-3 mb-1 bg-body rounded m-3" ref={dragDropRef}>
            <Card.Body>
                <Row>
                    <Col>
                        <Card.Text>{props.title}</Card.Text>
                    </Col>
                    <Col>
                        <Row className="float-end">
                            <Col><Button variant="primary" size="sm" onClick={incrementCounter}>+</Button></Col>
                            <Col><Card.Text>{counter}/{max}</Card.Text></Col>
                            <Col><Button variant="danger" size="sm" onClick={decrementCounter}>-</Button></Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );

}

export default DraggingTracker;