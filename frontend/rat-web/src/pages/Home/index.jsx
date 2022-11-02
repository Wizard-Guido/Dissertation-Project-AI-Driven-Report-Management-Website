import React from 'react'
import TopBar from '../../components/TopBar'
import { Outlet } from 'react-router-dom'
import './index.css'

export default function Home(props) {

        return (
            <div className="home_container">
                <TopBar logOut={props.clearupToken} />
                <Outlet />

            </div>
        )
};
