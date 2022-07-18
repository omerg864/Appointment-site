import FloatingLabelInput from "./FloatingLabelInput";
import CheckBox from "./CheckBox";



function UserInfo({ user, index, staff, setUser }) {

  return (
    <div className="user-info">
        <FloatingLabelInput label={"First Name"} value={user.f_name} setValue={setUser} obj={user} props={{required: true, type: "text", name: "f_name"}} containerStyle={{marginBottom: '20px',marginRight: '1px', flex: 1}}/>
        <FloatingLabelInput label={"Last Name"} value={user.l_name} setValue={setUser} obj={user} props={{required: true, type: "text", name: "l_name"}} containerStyle={{marginBottom: '20px',marginRight: '1px', flex: 1}}/>
        <FloatingLabelInput label={"Email"} value={user.email} setValue={setUser} obj={user} props={{required: true, type: "email", name: "email"}} containerProps={{id: "email-container"}} containerStyle={{marginBottom: '20px',marginRight: '1px'}}/>
        <FloatingLabelInput label={"Phone"} value={user.phone} setValue={setUser} obj={user} props={{required: true, type: "text", name: "phone", maxLength: '10'}} containerStyle={{marginBottom: '20px',marginRight: '1px', flex: 1}}/>
        {staff &&
        <CheckBox label={"Staff"} setValue={setUser} obj={user} props={{required: true, name: "staff", checked: user.staff}} containerStyle={{marginBottom: '20px',marginRight: '1px', flex: 1}}/>}
    </div>
  )
}

export default UserInfo