import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';




function ResetPassword() {
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    const savePassword = () => {
        console.log("savePassword");
    }

  return (
    <div className="login-container">
        <h1>Reset Password</h1>
        <FloatingLabelInput label={"New Password"} value={formData.password} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: "password"}} containerStyle={{marginBottom: '20px'}}/>
        <FloatingLabelInput label={"Confirm Password"} value={formData.confirmPassword} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: "confirmPassword"}} containerStyle={{marginBottom: '20px'}}/>
        <div className='save-container'>
            <button className='btn btn-light' id="btn-sub" onClick={savePassword}>Change Password</button>
        </div>
    </div>
  )
}

export default ResetPassword