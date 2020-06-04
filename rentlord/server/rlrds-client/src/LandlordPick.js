import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const LandlordPick = () => {
    const [chooseLandlordPick, setChooseLandlordPick] = useState('');
    const [pick, setPick] = useState('');
    const history = useHistory();

    useEffect(() => {
        axios.get('/api/landlords')
            .then(res => {
                console.log(res.data);
                setChooseLandlordPick(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        
    }, [])

    console.log(chooseLandlordPick)

    const newLandlordPick = e => {
        e.preventDefault();
        axios.put('/api/role', {role: chooseLandlordPick} )
        .then(response => {
            //routing user according to their choice
            if(chooseLandlordPick === 'Tenant') {
                history.push('/tenant-dashboard')
            } else {
                history.push('/landlord-dashboard')
            }
            console.log(response)
        
        })
        .catch(err => {
            console.log(err)
        })
    }

    // allows user to pick their landlord - will update the tenants array on landlords as well
    const picky = e => {
        e.preventDefault();
        console.log(e.target.value)
        axios.put('/api/landlords', {landlord: e.target.value})
            .then(res => {
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
            })
            history.push('/tenant-dashboard')
    }



    return (
        <div>
            {chooseLandlordPick.length > 0 ? chooseLandlordPick.map(land => {
                return <div><h1>{land.wholeName}</h1> <button value={land._id} onClick={picky}>Press</button></div>
            }): null }
        </div>
    )
}

export default LandlordPick;