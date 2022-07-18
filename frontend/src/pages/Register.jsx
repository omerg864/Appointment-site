import FloatingLabelInput from "../components/FloatingLabelInput";


function Register() {
  return (
    <div className="login-container">
        <div className="login-header">
            <h1>Register</h1>
        </div>
            <form className="form-container">
            <FloatingLabelInput label="First Name" props={{required: true, type: "text"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Last Name" props={{required: true, type: "text"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Email" props={{required: true, type: "email"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Phone Number" props={{required: true, type: "text"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Password" props={{required: true, type: "password"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Repeat Password" props={{required: true, type: "password"}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Registration Code" props={{required: true, type: "text", maxlength :"6"}} containerStyle={{marginTop: '10px'}}/>
            <div className="d-grid gap-2">
            <button style={{marginTop: '10px'}} type="submit" className="btn btn-primary btn-block" id="btn-sub">Register</button>
            </div>
            </form>
        </div>
  );
}

export default Register;