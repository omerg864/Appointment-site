



function FloatingLabelTextArea({ label, value, setValue, obj, props, containerStyle }) {

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
        if (obj){
            setValue({...obj, [e.target.name]: e.target.value});
        } else {
            setValue(e.target.value);
        }
    }

  return (
    <div className="input-container2" style={containerStyle}>
    <textarea
    id={label}
    value={value}
    onChange={(e) => OnChange(e)}
    className="text-input2"
    autoComplete="off"
    placeholder={`Enter your ${label}`}
    {...props}
    ></textarea>
    <label id={`label2 ${label}`} className={input_class ? input_class : 'label2'} htmlFor={label}>{label}</label>
</div>
  )
}

export default FloatingLabelTextArea