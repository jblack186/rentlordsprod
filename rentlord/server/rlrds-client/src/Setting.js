import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Dropdown, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Setting.css';
import SideBar from './SideBar';


const Settings = (props) => {
    const [file, setFile] = useState('');;
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState('')
    const [imageName, setImageName] = useState('')
    const [userImage, setUserImage] = useState('')
    const [userId, setUserId] = useState('')
    // const [userPic, setUserPic] = useState(props.landlord.picture)
    const [newPic, setNewPic] = useState(false)
    
console.log(userImage.length)

console.log(image)
//cloudinary upload
const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'rentlords')
    setLoading(true)
    const res = await fetch(
        'https://api.cloudinary.com/v1_1/drgfyozzd/image/upload',
        {
            method: 'POST',
            body: data
        }
    )
    const file = await res.json()

    setImage(file.secure_url);
    setImageName(`${file.public_id}.${file.format}`)
    setLoading(false)
}



    const submitImage = (e) => {
        e.preventDefault();
        axios.put('/api/picture', { url: imageName } )
        .then(res => {
            if(res.status === 200) {
                console.log(res)
              setUserImage(image)
              setNewPic(true)
            }
        })
        .catch(err =>
            console.log(err))
     
  }
console.log(imageName)

        return (
            <div className='setting-contain'>
                <SideBar />
                <div className='content-contain'>
                <form onSubmit={submitImage}>
                    <input name="file" type="file" onChange={uploadImage} placeholder='Upload an image' />
                    <button type='submit'>Upload</button>
                </form>
                {loading ? (
                    <h3 style={{ paddingLeft: '100px', color: 'white'}} >Loading...</h3>
                ): (
                <img src={image}  alt=''/>
                )}
               {props.landlord ? <img className={newPic === true ? 'pic-hide' : null}  src={`https://res.cloudinary.com/drgfyozzd/image/upload/${props.landlord.picture}`} alt=''/> : null}
            </div>
            </div>
        )
    }


export default Settings;
