

function FloatingLabelInput({label, value, tooltip, setValue, obj, unique, indexed, props, containerStyle, containerProps}) {

    var input_class = '';
    if (value !== "" && value !== undefined){
        input_class = "label2 filled2";
    }
    document.querySelectorAll(".text-input2").forEach((element) => {
            element.addEventListener("blur",(event) => {
                if (tooltip && event.target.previousElementSibling){
                    event.target.previousElementSibling.classList.remove("activeTooltip");
                }
                if(event.target.value !== ""){
                        event.target.nextElementSibling.classList.add("filled2");
                }else{
                    event.target.nextElementSibling.classList.remove("filled2");
                }
            });
            element.addEventListener("focus",(event) => {
                if (tooltip &&  event.target.previousElementSibling){
                    event.target.previousElementSibling.classList.add("activeTooltip");
                }
            });
    });
    const OnChange = (e) => {
        if (indexed !== undefined) {
            console.log(indexed);
            setValue(e.target.name, e.target.value, indexed, false, false);
        } else {
            if (unique){
                setValue(e.target.name, e.target.value, false, false);
            }
            else if (obj){
                setValue({...obj, [e.target.name]: e.target.value});
            } else {
                setValue(e.target.value);
            }
        }
    }
return (
        <div className="input-container2" {...containerProps} style={containerStyle}>
            {tooltip}
            <input
            id={`${label}-${indexed ? indexed : ''}`}
            value={value}
            onChange={(e) => OnChange(e)}
            className="text-input2"
            autoComplete="off"
            placeholder={`Enter your ${label}`}
            {...props}
            />
            <label id={`label2 ${label}`} className={input_class ? input_class : 'label2'} htmlFor={`${label}-${indexed ? indexed : ''}`}>{label}</label>
        </div>
)}

export default FloatingLabelInput