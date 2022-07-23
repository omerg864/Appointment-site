import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { toast } from 'react-toastify';



function EmailResetPassword() {

    const [email, setEmail] = useState("");

    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const sendEmail = () => {
      let valid = true;
      if (email === '') {
        valid = false;
        toast.error('Email is required');
      }
      if (!email_regex.test(email)) {
        valid = false;
        toast.error('Email is invalid');
      }
      if (valid) {
        console.log("sendEmail");
      }
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