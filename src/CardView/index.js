import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Typography from "@material-ui/core/Typography";
import { DeleteForever, Cancel } from '@material-ui/icons';
import './index.scss';
import {addNewCard} from "../redux/actions";
import AddItem from "../AddItem";

function CardView({ item, deleteItem, deleteCard }) {
    return (
        <div className='Card' key={item.id}>
            <Droppable key={item.id} droppableId={item.id}>
                {(provided, snapshot) => (
                    <div
                        key={item.id}
                        ref={provided.innerRef}
                        className={snapshot.isDraggingOver ? 'Card_Dragged' : 'Card_Dragging'}
                        {...provided.droppableProps}
                    >
                        <div className='Card__header'>
                            <Typography>{item.name}</Typography>
                            <DeleteForever className='Card__deleteIcon' onClick={() => deleteItem(item.id)} />
                        </div>
                        <div className='Card__cards'>
                            {item.cards && item.cards.map((card, index) => (
                                <Draggable
                                    key={card.id}
                                    draggableId={card.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            key={card.id}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className={provided.draggableProps.style}
                                        >
                                            <div className='Card__card'>
                                                <Typography className="Card_cardLabel">{card.name}</Typography>
                                                <Cancel className='Card__deleteIcon' onClick={() => deleteCard(item.id, index)}/>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    </div>
                )}
            </Droppable>
            <AddItem dispatchAction={addNewCard} label='Add New Card' placeHolder='Card Name' id={item.id} />
        </div>
    )
}
export default CardView;
