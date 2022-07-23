import FloatingLabelInput from "../components/FloatingLabelInput";
import { useState, useEffect } from "react";
import { login } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isSuccess, isLoading, isError, message } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
            dispatch(reset());
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
    }, [isSuccess, isError, message]);

    const submitForm = e => {
        e.preventDefault();
        dispatch(login(formData));
    }

    if (isLoading){
        return <Spinner />
    }


    return (
        <div className="login-container">
        <div className="login-header">
            <h1>Login</h1>
        </div>
            <form className="form-container" onSubmit={submitForm}>
            <FloatingLabelInput label="Email" value={formData["email"]} setValue={setFormData} obj={formData} props={{required: true, type: "email", name: "email"}}/>
            <div style={{textAlign: "start"}}>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <FloatingLabelInput label="Password" value={formData["password"]} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: "password"}}/>
            <div className="d-grid gap-2">
            <button style={{marginTop: '10px'}} type="submit" className="btn btn-primary btn-block" id="btn-sub">Login</button>
            </div>
            </form>
            <div style={{marginTop: '10px'}} className="space-div">
                <span>Forgot your password? <a href="/forgot" style={{color: "white"}}>Reset Password</a></span>
            <span>Don't have an account? <a href="/register" style={{color: "white"}}>Register</a></span>
            </div>
        </div>
    );
}

export default Login;