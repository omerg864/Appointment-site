import $ from 'jquery';


function TagsInput({ values,  setValues, index, containerStyles, label, props}) {

    var idIndex = index !== undefined ? index : "";

    var active = values ? "label-active" : "";

    $(function() {
    const tagInput = document.querySelector(`#tag-input-${idIndex}`);
    const tagArea = document.querySelector(`#tag-area-${idIndex}`);
    const ul = document.querySelector(`#tag-ul-${idIndex}`);
    const label = document.querySelector(`#tag-label-${idIndex}`);
    
    let tags = values || [];

    if (values) {
        renderTags();
    }
    
    function addEvent(element) {
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
                setValues([...tags, e.target.value.trim()]);
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
                tags.push(e.target.value.trim());
                element.value = "";
                renderTags();
            }
            if (e.keyCode === 8 && value === "") {
                tags.pop();
                renderTags();
            }
        });
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
        input.focus();
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