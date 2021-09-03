import React from 'react'
import BoardListItem from '../components/BoardListItem'


export default function Home() {

    const list = [1, 2, 3, 4]
    const boards = list.map(x => {
        return <BoardListItem title="Project Orbital NUS" />
    })
  
    return (
        <main className="home">
            <div className="max-width">
                <header className="home__heading">
                Current Boards:
                </header>
                <ul className="home__board-list">
                    {boards}
                </ul>
            </div>
        </main>
    )
}
