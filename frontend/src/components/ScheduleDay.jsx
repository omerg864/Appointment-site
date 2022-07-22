import FloatingLabelInput from "./FloatingLabelInput";
import TagsInput from "./TagsInput";

function ScheduleDay({title, data, setData, index, containerStyles}){

    return (
    <div style={containerStyles}>
        <div>
        <h5>{title}</h5>
        </div>
        <div style={{display: 'flex', marginBottom: '10px'}}>
    <FloatingLabelInput label="Start Time" value={data ? data.start_time : ""} setValue={setData} indexed={index}  props={{required: true, type: "time", name: "start_time"}} containerStyle={{width: '50%', flex: 1, marginRight: '10px'}}/>
    <FloatingLabelInput label="End Time" value={data ? data.end_time : ""} setValue={setData} indexed={index} props={{required: true, type: "time", name: "end_time"}} containerStyle={{width: '50%', flex: 1}}/>
    </div>
    <FloatingLabelInput label="Interval" value={data ? data.interval : ""} setValue={setData} indexed={index} props={{required: true, type: "text", name: "interval"}} containerStyle={{width: '100%', marginBottom: '10px'}}/>
    <TagsInput label={"Breaks"} index1={index} values={data ? data.breaks : []} props={{name: "breaks"}} setValues={setData} obj={data} />
    </div>
    )
}

export default ScheduleDay;