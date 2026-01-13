let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const clearBtn = document.getElementById('clearBtn');
const deleteAllBtn = document.getElementById('deleteAllBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const totalTasks = document.getElementById('totalTasks');
const completedTasks = document.getElementById('completedTasks');
const pendingTasks = document.getElementById('pendingTasks');

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
    pendingTasks.textContent = `Pending: ${pending}`;
}

function getFilteredTasks() {
    if (currentFilter === 'active') return tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
}

function renderTasks() {
    taskList.innerHTML = '';
    const filteredTasks = getFilteredTasks();
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks to show</li>';
    } else {
        filteredTasks.forEach((task) => {
            const index = tasks.indexOf(task);
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span ondblclick="editTask(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }
    updateStats();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        renderTasks();
        showNotification('✅ Task added!');
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
    showNotification(tasks[index].completed ? '✅ Task completed!' : '♻️ Task reopened!');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
    showNotification('🗑️ Task deleted!');
}

function editTask(index) {
    const newText = prompt('Edit task:', tasks[index].text);
    if (newText && newText.trim()) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
        showNotification('✏️ Task updated!');
    }
}

function clearCompleted() {
    const count = tasks.filter(t => t.completed).length;
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
    if (count > 0) showNotification(`🧹 Cleared ${count} completed task(s)!`);
}

function deleteAll() {
    if (confirm('Delete all tasks?')) {
        tasks = [];
        saveTasks();
        renderTasks();
        showNotification('🗑️ All tasks deleted!');
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearBtn.addEventListener('click', clearCompleted);
deleteAllBtn.addEventListener('click', deleteAll);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

renderTasks();