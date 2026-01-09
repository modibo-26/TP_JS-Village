document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            taskInput.value = '';
            saveTasks();
        }
    });

    loadTasks();    

});
