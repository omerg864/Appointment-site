import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';



function EmailResetPassword() {

    const [email, setEmail] = useState("");

    const sendEmail = () => {
        console.log("sendEmail");
    }

  return (
    <div className='login-container'>
        <h1>Reset Password</h1>
        <FloatingLabelInput label={"Email"} value={email} setValue={setEmail} props={{required: true, type: "email", name: "email"}} containerStyle={{marginBottom: '20px'}}/>
        <div className='save-container'>
            <button className='btn btn-light' id="btn-sub" onClick={sendEmail}>Send Reset Email</button>
        </div>
    </div>
  )
}

export default EmailResetPassword