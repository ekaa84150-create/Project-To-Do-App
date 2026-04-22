const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Ambil data, kalau kosong kasih array kosong
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
    taskList.innerHTML = "";

    const sisaTugas = tasks.reduce((acc, curr) => (curr.done ? acc : acc + 1), 0);
    const countElement = document.getElementById("count-todo");
    if (countElement) {
        countElement.textContent = sisaTugas;
    }

    tasks.forEach((task) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        
        // GUNAKAN CLASS, BUKAN .STYLE
        if (task.done) {
            span.classList.add("completed");
        }

        const doneBtn = document.createElement("button");
        doneBtn.textContent = "✔️";
        doneBtn.classList.add("done-btn");

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.classList.add("delete-btn");

        // HAPUS PAKE FILTER (ID UNIK)
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            save();
            render();
        });

        // TOGGLE DONE PAKE CLASS
        doneBtn.addEventListener("click", () => {
            task.done = !task.done;
            save();
            render();
        });

        li.appendChild(span);
        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function cekStatistik() {
    const sisaTugas = tasks.reduce((acc, curr) => curr.done ? acc : acc + 1.0);
    console.log("Tugas Anda Sisa: " + sisaTugas);
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({
        id: Date.now(), // PAKAI DATE BUKAN DATA
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