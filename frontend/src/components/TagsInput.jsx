import $ from 'jquery';


function TagsInput({ values,  setValues, unique, index1, obj, containerStyles, label, props}) {

    var idIndex = index1 !== undefined ? index1 : "";

    var active = values ? "label-active" : "";

    $(function() {
    const tagInput = document.querySelector(`#tag-input-${idIndex}`);
    const tagArea = document.querySelector(`#tag-area-${idIndex}`);
    const ul = document.querySelector(`#tag-ul-${idIndex}`);
    const label = document.querySelector(`#tag-label-${idIndex}`);
    
    let tags = [...values] || [];

    if (tags && tags.length > 0) {
        renderTags();
    }
    
    function addEvent(element) {
        if (element) {
        tagArea.addEventListener("click", () => {
            element.focus();
        });
    
        element.addEventListener("focus", () => {
            tagArea.classList.add("tag-active");
            label.classList.add("label-active");
        });
    
        element.addEventListener("blur", (e) => {
            tagArea.classList.remove("tag-active");
            if (element.value === "" && tags.length === 0) {
                label.classList.remove("label-active");
            }
            if (!element.value.match(/^\s+$/gi) && element.value !== "") {
                tags.push(e.target.value.trim());
                element.value = "";
                renderTags();
            }
        });
    
        element.addEventListener("keydown", (e) => {
            const value = e.target.value;
            if (
                (e.keyCode === 32 ||
                    e.keyCode === 13 ||
                    value[value.length - 1] === " ") &&
                !value.match(/^\s+$/gi) &&
                value !== ""
            ) {
                if (unique) {
                    setValues("breaks", e.target.value, true, false);
                } else {
                    setValues("breaks", e.target.value, index1, true, false);
                }
                tags.push(e.target.value.trim());
                element.value = "";
                renderTags();
            }
            if (e.keyCode === 8 && value === "") {
                if (unique) {
                    setValues("breaks", e.target.value, false, true);
                } else {
                    setValues("breaks", e.target.value, index1, false, true);
                }
                tags.pop();
                renderTags();
            }
        });
    }
}
    addEvent(tagInput);
    
    function renderTags() {
        ul.innerHTML = "";
        tags.forEach((tag, index) => {
            createTag(tag, index);
        });
        const input = document.createElement("input");
        input.type = "text";
        input.className = "tag-input";
        addEvent(input);
        ul.appendChild(input);
        setTimeout(() => (input.value = ""), 0);
    }
    
    function createTag(tag, index) {
        const li = document.createElement("li");
        li.className = "tag";
        const text = document.createTextNode(tag);
        const span = document.createElement("span");
        span.className = "cross";
        span.dataset.index = index;
        span.addEventListener("click", (e) => {
            tags = tags.filter((_, index) => index != e.target.dataset.index);
            if (unique){
                setValues("breaks", tag, false, false);
            } else {
                setValues("breaks", tag, index1, false, false);
            }
            renderTags();
        });
        li.appendChild(text);
        li.appendChild(span);
        ul.appendChild(li);
    }

});

  return (
    <div className="tag-area" id={`tag-area-${idIndex}`} style={containerStyles}>
        <label htmlFor={`tag-input-${idIndex}`} id={`tag-label-${idIndex}`} className={`tag-label ${active}`}>{label}</label>
        <ul className='ul-tag' id={`tag-ul-${idIndex}`}>
            <input {...props} type="text" className="tag-input" id={`tag-input-${idIndex}`} />
        </ul>
    </div>
  )
  
}

export default TagsInput