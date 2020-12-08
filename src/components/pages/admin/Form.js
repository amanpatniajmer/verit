import React, { Component, useState } from 'react'
import './form.css'
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Form(props) {
    let [submitCount, increase] = useState(0);
    let [id, setID] = useState();
    let [btn, setBtn] = useState('Submit');
    let [success, setSuccess] = useState();
    let [error, setError] = useState();
    var submit = (data) => {
        increase(submitCount + 1);
        if (submitCount == 0) {
            axios.post('https://react-form-7006e.firebaseio.com/users.json', JSON.stringify(data))
                .then(responseText => {
                    console.log("Document Added with id:" + responseText.data.name);
                    setSuccess(success = 'Document Added');
                    setTimeout(() => {
                        setSuccess(success = null);
                    }, 5000);
                    setID(id = responseText.data.name); console.log(id)
                })
                .catch(err => { console.log(err);
                     setError(error = err);
                     setTimeout(() => {
                        setError(error = null);
                    }, 5000); });
            setBtn(btn = 'Update Details');
        }
        else {
            console.log(id);
            axios.patch('https://react-form-7006e.firebaseio.com/users/' + id + '.json', JSON.stringify(data))
                .then(responseText => { console.log('Updated!');
                 setSuccess(success = "Updated!");
                 setTimeout(() => {
                    setSuccess(success = null);
                }, 5000);
                 })
                .catch(err => { 
                    console.log(err); 
                    setError(error = err);
                    setTimeout(() => {
                        setError(error = null);
                    }, 5000);
                 });
        }
    }
    const { register, handleSubmit, errors } = useForm();
    return (
        <div id="container">
            < h1 > Form </h1>
            <form action="" method="post" onSubmit={handleSubmit(submit)}>
                <label> Name: <input type="text" name="name" id="name" ref={register({ required: true, minLength: 5, maxLength: 50, pattern: /^[A-Za-z]+([\ A-Za-z]+)*$/i })} /></label>
                {errors.name && <div className="error"> Required field of 5 to 50 alphabets! </div>}
                <label> Email: <input type="email" name="email" id="email" ref={register({ required: true })} /></label>
                {errors.email && <div className="error"> Required field with valid email address! </div>}
                <label> Phone: <input type="phone" name="phone" id="phone" ref={register({ pattern: /^[0-9]+$/, minLength: 10, maxLength: 10 })} /></label>
                {errors.phone && <div className="error"> 10 digits allowed</div>}
                <label> Gender:
            <div className="gender">
                        Male:<input type="radio" value="male" name="gender" id="male" ref={register} />
            Female: <input type="radio" name="gender" value="female" id="female" ref={register} />
            Other: <input type="radio" name="gender" value="other" id="other" ref={register} />
                    </div>
                </label>
                <br/>
                <label> Skills:<select name="skills" id="skills" defaultValue="" ref={register({ required: true })}>
                    <option value="" disabled={true}>Select One..</option>
                    <option value="ui">UI</option>
                    <option value="ux">UX</option>
                    <option value="backend">Backend</option>
                    <option value="css">CSS</option>
                </select>
                </label>
                {errors.skills && <div className="error"> Required Field! </div>}
                <label> Description:
                <textarea name="description" id="description" ref={register} />
                </label>
                <input type="submit" id="submit" value={btn} />
                <br /><br />
                {<div className="success">{success} </div>}
                {<div className="error">{error} </div>}
            </form>

        </div>
    )
}

