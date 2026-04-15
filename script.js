const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
    
        if (task.done) {
            span.style.textDecoration ="line-through";
            span.style.opacity = "0.5";
        }

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔️";
        doneBtn.classList.add("done-btn");

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.classList.add("delete-btn");

        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            save();
            render();
        });

        doneBtn.addEventListener("click", () => {
            tasks[index].done = !tasks[index].done;
            if (task.done) {
                span.style.textDecoration = "line-through";
                span.style.opacity = "0.5";
            } else {
                span.style.textDecoration = "none";
                span.style.opacity ="1";
            }
            save();
            render();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        text: text,
        done: false
    });

    taskInput.value = "";
    save();
    render();
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addBtn.click();
});

render();