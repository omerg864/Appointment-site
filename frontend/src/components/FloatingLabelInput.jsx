

function FloatingLabelInput({label, value, setValue, obj, indexed, props, containerStyle, containerProps}) {

    var input_class = '';
    if (value !== "" && value !== undefined){
        input_class = "label2 filled2";
    }
    document.querySelectorAll(".text-input2").forEach((element) => {
        element.addEventListener("blur",(event) => {
            if(event.target.value !== ""){
                event.target.nextElementSibling.classList.add("filled2");
            }else{
                event.target.nextElementSibling.classList.remove("filled2");
            }
        })
    });
    const OnChange = (e) => {
        if (indexed !== undefined) {
            console.log(indexed);
            setValue(e.target.name, e.target.value, indexed, false, false);
        } else {
            if (obj){
                setValue({...obj, [e.target.name]: e.target.value});
            } else {
                setValue(e.target.value);
            }
        }
    }
return (
        <div className="input-container2" {...containerProps} style={containerStyle}>
            <input
            id={label}
            value={value}
            onChange={(e) => OnChange(e)}
            className="text-input2"
            autoComplete="off"
            placeholder={`Enter your ${label}`}
            {...props}
            />
            <label id={`label2 ${label}`} className={input_class ? input_class : 'label2'} htmlFor={label}>{label}</label>
        </div>
)}

export default FloatingLabelInput