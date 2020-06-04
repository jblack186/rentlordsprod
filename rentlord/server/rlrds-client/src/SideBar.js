import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import './SideBar.css'
import LandlordDashboard from './LandlordDashboard';
import TenantDashboard from './TenantDashboard';

const SideBar = (props) => {

    return (
        <div>
            <div className='sidebar'>
                <ul className='side-list'>
                    <li className='list-item'>
                    <Link style={{color: 'white', listStyle: 'none', textDecoration: 'none'}} to={ localStorage.getItem('Role') === 'Landlord' ? './landlord-dashboard' : './tenant-dashboard'}>Dashboard</Link>
                    </li>
                    <li className='list-item'>
                        <Link style={{color: 'white', listStyle: 'none', textDecoration: 'none'}} to='/settings'>Settings</Link>
                    </li>
                    <li className='list-item'>
                        <a  style={{textDecoration: 'none', color: 'white', listStyle: 'none'}} href='/api/logout'>Logout</a>
                    </li>

                </ul>
            </div>

        </div>
    )
}

export default SideBar;