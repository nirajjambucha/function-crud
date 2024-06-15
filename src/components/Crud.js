import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { userSubmit } from '../redux/Action';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from './Wrapper';
import axios from 'axios';

function Crud({ navigate }) {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        country: "",
        language: "",
        interests: [],
    });
    const [userDetailsDummy, setUserDetailsDummy] = useState({ ...userDetails });
    const [userData, setUserData] = useState([]);
    const [index, setIndex] = useState("");
    const dispatch = useDispatch()
    const formData = useSelector((state) => state?.editData)
    const tableData = useSelector((state) => state?.data || [])

    useEffect(() => {
        if (id) {
            setUserDetails(formData);
        }
        setUserData(tableData);
    }, []);

    const handleChange = (e) => {
        if (e.target.type === "checkbox") {
            let interests = [...userDetails.interests];
            if (e.target.checked) {
                interests.push(e.target.value);
            } else {
                let id = interests.indexOf(e.target.value);
                interests.splice(id, 1);
            }
            setUserDetails({ ...userDetails, interests: [...interests] });
        } else {
            setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {
        const data = [...userData]
        if (id) {
            data[id] = userDetails;
            setUserData(data);
            setIndex("");
        } else {
            data.push(userDetails)
            setUserData(data);
        }
        dispatch(userSubmit(data))
        addData();
        updateDate();
        //  userDetailsSubmit(data);    
        navigate("/table");
        clearForm();
    };

    // const addData = () =>{
    //     fetch('https://dummyjson.com/products/add', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         userDetails,
    //     }),
    // })
    // .then((res) => console.log(res.json()))
    // .then(console.log); 
    // }

    const addData = () => {
        axios
            .post('https://dummyjson.com/products/add', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userDetails,
                }),
            })
            .then(res => console.log(res))
            .then(console.log);
    }
    
    // const updateDate = () =>{
    //      fetch('https://dummyjson.com/products/1', {
    //     method: 'PUT', 
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         userDetails,
    //     })
    // })
    //     .then(res => console.log(res.json()))
    //     .then(console.log);
    // }

    const updateDate = () =>{
        axios
        .put('https://dummyjson.com/products/1', {
       method: 'PUT', 
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
           userDetails,
       })
   })
       .then(res => console.log(res))
       .then(console.log);
   }
        
    const clearForm = () => {
        setUserDetails({
            firstName: "",
            lastName: "",
            country: "",
            language: "",
            interests: [],
        });
        setIndex("");
    };

    const buttonText = index !== "" ? "Update" : "Submit";
    return (
        <div className="container">
            <h3 className="alert alert-primary text-center" style={{ marginTop: "100px" }}>Contact Form</h3>
            <div className="employee-form">
                <div className="form-group">
                    <label htmlFor="fname">First name :- </label>
                    <input type="text" className="form-control" name="firstName" id="fname" value={userDetails.firstName} onChange={handleChange} placeholder="Please enter your name..." />
                </div> 

                <div className="form-group">
                    <label htmlFor="lname">Last name :- </label>
                    <input type="text" className="form-control" name="lastName" id="lname" value={userDetails.lastName} onChange={handleChange} placeholder="Please enter your name..." />
                </div>

                <div className="form-group">
                    <label htmlFor="country">Country :- </label>
                    <select name="country" id="country" className="form-control" value={userDetails.country} onChange={handleChange}>
                        <option value="" disabled>Selected</option>
                        <option value="australia">Australia</option>
                        <option value="canada">Canada</option>
                        <option value="usa">USA</option>
                    </select>
                </div>

                <div className="form-group">
                    <p>Please select your favorite web language :-</p>
                    <div>
                        <input type="radio" name="language" id='html' value="HTML" checked={userDetails.language === "HTML"} onChange={(e) => handleChange(e)} />
                        <label htmlFor="html" className="ml-2">HTML</label><br />

                        <input type="radio" name="language" id='css' value="CSS" checked={userDetails.language === "CSS"} onChange={(e) => handleChange(e)} />
                        <label htmlFor="css" className="ml-2">CSS</label><br />

                        <input type="radio" name="language" id='javascript' value="javaScript" checked={userDetails.language === "javaScript"} onChange={(e) => handleChange(e)} />
                        <label htmlFor="javascript" className="ml-2">javaScript</label>
                    </div>
                </div>

                <div className="form-group">
                    <p>Please select your interests :- </p>
                    <div>
                        <input type="checkbox" name="interests" id="interest1" value="Sports" checked={userDetails.interests.includes("Sports")} onChange={(e) => handleChange(e)} />
                        <label htmlFor="interest1" className="ml-2">Sports</label><br />

                        <input type="checkbox" name="interests" id="interest2" value="Music" checked={userDetails.interests.includes("Music")} onChange={(e) => handleChange(e)} />
                        <label htmlFor="interest2" className="ml-2">Music</label><br />

                        <input type="checkbox" name="interests" id="interest3" value="Movies" checked={userDetails.interests.includes("Movies")} onChange={(e) => handleChange(e)} />
                        <label htmlFor="interest3" className="ml-2">Movies</label>
                    </div>
                </div>

                <div className="form-group">
                    <button type="button" className="btn btn-primary mr-2" onClick={handleSubmit}>{buttonText}</button>
                    <button type="button" className="btn btn-danger" onClick={clearForm}>Reset</button>
                </div>
            </div>
        </div>
    );
}

// const mapStateToprops = (state) => {
//     return {
//         formData: state?.editData,
//         tableData: state?.data || [],
//     };
// };

// const mapDispatchToprops = (dispatch) => {
//     return {
//         userDetailsSubmit: (data) => dispatch(userSubmit(data)),
//     };
// };       

export default withRouter(Crud);
// export default withRouter(connect(mapStateToprops, mapDispatchToprops)(Crud));  