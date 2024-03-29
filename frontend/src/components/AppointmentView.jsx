import { MdOutlineClose } from 'react-icons/md';
import { toDate } from '../functions/dateFunctions';


function AppointmentView({ data, onClick }) {

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    Date.prototype.addDays = function(days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    }

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="appointment-view-container">
        <div>
        <span className='appointment-view-text'>{formatDate(toDate(data.date))}</span>
        <span className='appointment-view-text'>{days[toDate(data.date).getDay()]}</span>
        <span className='appointment-view-text'>{data.time}</span>
        </div>
        <button className="btn" id="btn-icon" onClick={() => onClick(data)} style={{ width:"50px", height:"50px", marginTop:"auto", marginBottom:"auto" }}><MdOutlineClose color='red' size={"24px"}/></button>
    </div>
  )
}

export default AppointmentView