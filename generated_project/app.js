// app.js
// Todo List application logic
// Implements Task model, persistence, rendering, CRUD, filtering, and event handling.

// -----------------------
// 1. Data Model
// -----------------------
class Task {
    /**
     * @param {string} id - Unique identifier for the task.
     * @param {string} text - Description of the task.
     * @param {boolean} [completed=false] - Completion status.
     */
    constructor(id, text, completed = false) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }
}

/** @type {Task[]} */
let tasks = [];

// -----------------------
// 2. Persistence Layer
// -----------------------
function loadTasksFromStorage() {
    const raw = localStorage.getItem('todo-tasks');
    if (!raw) {
        tasks = [];
        return;
    }
    try {
        const parsed = JSON.parse(raw);
        // Re‑instantiate as Task objects (preserve prototype chain)
        tasks = parsed.map(item => new Task(item.id, item.text, item.completed));
    } catch (e) {
        console.error('Failed to parse tasks from localStorage', e);
        tasks = [];
    }
}

function saveTasksToStorage() {
    try {
        localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    } catch (e) {
        console.error('Failed to save tasks to localStorage', e);
    }
}

// -----------------------
// 3. Rendering
// -----------------------
/**
 * Render the task list according to the supplied filter.
 * @param {string} [filter='all'] - "all", "active", or "completed".
 */
function renderTasks(filter = 'all') {
    const listEl = document.getElementById('task-list');
    if (!listEl) return;
    // Clear existing content
    listEl.innerHTML = '';

    const filtered = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true; // all
    });

    filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.completed) li.classList.add('completed');
        li.dataset.id = task.id;

        // Checkbox to toggle completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'complete-toggle';
        checkbox.checked = task.completed;
        // For accessibility, associate label via aria-label
        checkbox.setAttribute('aria-label', 'Mark task as completed');

        // Text span (visible when not editing)
        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;

        // Edit input (hidden by default, shown in editing mode)
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;
        editInput.placeholder = 'Edit task';

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className = 'edit-btn';
        editBtn.title = 'Edit task';
        editBtn.innerHTML = '&#9998;'; // pencil unicode

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-btn';
        deleteBtn.title = 'Delete task';
        deleteBtn.innerHTML = '&#10006;'; // heavy multiplication X

        // Assemble li
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        listEl.appendChild(li);
    });
}

// -----------------------
// 4. CRUD Operations
// -----------------------
function generateId() {
    // Using timestamp + random to reduce collision risk when many tasks added quickly.
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function addTask(text) {
    const trimmed = text.trim();
    if (!trimmed) return; // ignore empty input
    const newTask = new Task(generateId(), trimmed, false);
    tasks.push(newTask);
    saveTasksToStorage();
    renderTasks(currentFilter);
}

function editTask(id, newText) {
    const trimmed = newText.trim();
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    if (trimmed) task.text = trimmed;
    saveTasksToStorage();
    renderTasks(currentFilter);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasksToStorage();
    renderTasks(currentFilter);
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    task.completed = !task.completed;
    saveTasksToStorage();
    renderTasks(currentFilter);
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasksToStorage();
    renderTasks(currentFilter);
}

// -----------------------
// 5. Filtering
// -----------------------
let currentFilter = 'all';
function setFilter(filter) {
    currentFilter = filter;
    // Update active class on filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    renderTasks(filter);
}

// -----------------------
// 6. Event Handling
// -----------------------
document.addEventListener('DOMContentLoaded', () => {
    // Load persisted tasks and render initial view
    loadTasksFromStorage();
    renderTasks(currentFilter);

    // Add task via button click
    const addBtn = document.getElementById('add-task-btn');
    const inputEl = document.getElementById('new-task-input');
    if (addBtn && inputEl) {
        addBtn.addEventListener('click', () => {
            addTask(inputEl.value);
            inputEl.value = '';
        });
        // Enter key on input
        inputEl.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                addTask(inputEl.value);
                inputEl.value = '';
            }
        });
    }

    // Delegate task list actions
    const taskList = document.getElementById('task-list');
    if (taskList) {
        taskList.addEventListener('click', e => {
            const target = e.target;
            const li = target.closest('li.task-item');
            if (!li) return;
            const id = li.dataset.id;

            // Completion toggle
            if (target.classList.contains('complete-toggle')) {
                toggleComplete(id);
                return;
            }

            // Delete button
            if (target.classList.contains('delete-btn')) {
                deleteTask(id);
                return;
            }

            // Edit button – enter editing mode
            if (target.classList.contains('edit-btn')) {
                li.classList.add('editing');
                const editInput = li.querySelector('.edit-input');
                if (editInput) {
                    editInput.focus();
                    // Move cursor to end
                    const val = editInput.value;
                    editInput.value = '';
                    editInput.value = val;
                }
                return;
            }
        });

        // Handle editing input – blur or Enter key commits edit
        taskList.addEventListener('keydown', e => {
            if (e.key !== 'Enter' && e.key !== 'Escape') return;
            const editInput = e.target.closest('.edit-input');
            if (!editInput) return;
            const li = editInput.closest('li.task-item');
            if (!li) return;
            const id = li.dataset.id;
            if (e.key === 'Enter') {
                editTask(id, editInput.value);
            }
            // Exit editing mode for both Enter and Escape
            li.classList.remove('editing');
        });
        taskList.addEventListener('blur', e => {
            const editInput = e.target.closest('.edit-input');
            if (!editInput) return;
            const li = editInput.closest('li.task-item');
            if (!li) return;
            const id = li.dataset.id;
            // Commit on blur
            editTask(id, editInput.value);
            li.classList.remove('editing');
        }, true); // useCapture to catch blur
    }

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            setFilter(filter);
        });
    });

    // Clear completed button
    const clearBtn = document.getElementById('clear-completed-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            clearCompleted();
        });
    }

    // Expose testing API
    if (typeof window !== 'undefined') {
        window.todoApp = {
            addTask,
            editTask,
            deleteTask,
            toggleComplete,
            setFilter,
            loadTasksFromStorage,
            saveTasksToStorage,
            clearCompleted,
            tasks,
        };
    }
});
