import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


import '../css/board-list-item.css'
import { useHistory } from 'react-router-dom'


export default function BoardListItem({ title }) {
    const history = useHistory();
    const handleClick = (e) => {
        e.preventDefault();
        history.push('/board/321382173281');
    }

    return (
        <>
            <li className="board-list-item">
                <a href="" onClick={handleClick}>
                    {title}
                    <FontAwesomeIcon className="board-list-item__coffee" icon={faCoffee} />
                </a>
            </li>
        </>
    )
}
