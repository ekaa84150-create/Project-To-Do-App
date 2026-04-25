const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Ambil data, kalau kosong kasih array kosong
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

let filter = "all"

function render() {
    taskList.innerHTML = "";

    const filtered = tasks.filter(task => {
        if (filter === "active") return !task.done;
        if (filter === "completed") return task.done;
        return true;
    });

    filtered.forEach((task) => {
        const li = document.createElement("li");

        if (task.isEditing) {
            const editInput = document.createElement("input");
            editInput.value = task.text;
            editInput.classList.add("edit-input");

            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    task.text = editInput.value.trim();
                    task.isEditing = false;
                    save(); render();
                }
            });
            li.appendChild(editInput);
        } else {
            const span = document.createElement("span");
            span.textContent = task.text;
            if (task.done) span.classList.add("completed");
            span.addEventListener("dblclick", () => {
                task.isEditing = true;
                render();
            });
            const doneBtn = document.createElement("button");
            doneBtn.textContent = task.done ? "↩️" : "✔️";
            doneBtn.onclick = () => { task.done = !task.done; save(); render(); };

            const delBtn = document.createElement("button");
            delBtn.textContent = "❌";
            delBtn.onclick = () => {
                tasks = tasks.filter(t => t.id !== task.id);
                save(); render();
            }
            li.appendChild(span);
            li.appendChild(doneBtn);
            li.appendChild(delBtn);
        }
        taskList.appendChild(li);
    });

    const sisaTugas = tasks.reduce((acc, curr) => (curr.done ? acc : acc + 1), 0);
    const countElement = document.getElementById("count-todo");
    if (countElement) {
        countElement.textContent = sisaTugas;
    }
}

function cekStatistik() {
    const sisaTugas = tasks.reduce((acc, curr) => curr.done ? acc : acc + 1.0);
    console.log("Tugas Anda Sisa: " + sisaTugas);
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now(),
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