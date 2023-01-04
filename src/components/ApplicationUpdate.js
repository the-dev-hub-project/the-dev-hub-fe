import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ApplicationUpdate = () => {
    const token= sessionStorage.getItem("accessToken"); 
    const { id } = useParams();
    const navigate = useNavigate();
    const[appUpdate, setAppUpdate] = useState({
        title: "",
        company: "",
        applied: "",
        hiring_manager: "",
        compensation: "",
        work_site: "",
        location: "",
        url:""
    })
    
    const appUpdateCall = async(e) => {
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8080/api/thedevhub/application/update/${id}`, appUpdate, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate(`/myhub/application/${id}`)
        } catch(err){
            console.log(err)
        }
    }

    const handleAppUpdate = (e) => {
        e.preventDefault()
        const appUpdateInput = {...appUpdate}
        appUpdateInput[e.target.name] = e.target.value;
        setAppUpdate(appUpdateInput);
    }
    
    return (
    <div>
        <div>Update an Application</div>
        <form onSubmit={appUpdateCall}>
        <input placeholder='Job title' name='title' value={appUpdate.title} onChange={handleAppUpdate}/>
        <input placeholder='Company' name='company' value={appUpdate.company} onChange={handleAppUpdate}/>
        <input placeholder='Date applied' name='applied' value={appUpdate.applied} onChange={handleAppUpdate} />
        <input placeholder='Name of recruiter/hiring manager' name='hiring_manager' value={appUpdate.hiring_manager} onChange={handleAppUpdate}/>
        <input placeholder='Compensation' name='compensation' value={appUpdate.compensation} onChange={handleAppUpdate} />
        <input placeholder='Remote/In-person/Hybrid' name='work_site' value={appUpdate.work_site} onChange={handleAppUpdate}  />
        <input placeholder='Job location' name='location' value={appUpdate.location} onChange={handleAppUpdate} />
        <input placeholder='Job URL' name='url' value={appUpdate.url} onChange={handleAppUpdate} />
        <button>Submit</button>
        </form>
    </div>
  )
}

export default ApplicationUpdate