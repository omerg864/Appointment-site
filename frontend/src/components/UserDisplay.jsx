import { MdModeEdit, MdCheck } from 'react-icons/md';




function UserDisplay({ user, onClick, selectedUser, edit, editSubmit }) {

    var className = "";

    if (user && selectedUser && user._id === selectedUser._id) {
      className = "active-btn-icon";
    }
  return (
    <div className="user-display-container">
        <div>
        <p style={{margin: 0}}>{user.f_name} {user.l_name}</p>
        <p style={{margin: 0}}>{user.phone}</p>
        <p style={{margin: 0}}>{user.email}</p>
        </div>
        {edit ?
        <button className={`btn-icon2`} onClick={() => editSubmit(user)} style={{height: '45px', width: '50px'}} name={`button-icon-${user._id}`}><MdModeEdit color='grey' size={'24px'}/></button>
        :
        <button className={`btn-icon2 ${className}`} onClick={() => onClick(user)} style={{height: '45px', width: '50px'}} name={`button-icon-${user._id}`}><MdCheck color='green' size={'24px'}/></button>}
    </div>
  )
}

export default UserDisplay;