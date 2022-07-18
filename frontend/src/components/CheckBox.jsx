




function CheckBox({label, setValue, obj, props, containerStyles}) {

    const OnChange = (e) => {
        if (obj){
            setValue({...obj, [e.target.name]: e.target.value});
        } else {
            setValue(e.target.value);
        }
    }

  return (
    <div className="checkbox-container" style={containerStyles}>
        <input type="checkbox" id={label} onChange={(e) => OnChange(e)}
            className="checkbox-input"
            autoComplete="off" {...props}/>
        <label htmlFor={label} className="checkbox-label">{label}</label>
    </div>
  )
}

export default CheckBox