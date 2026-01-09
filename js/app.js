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

    async function fetchInitialTasks() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
            const data = await response.json();
            data.forEach(item => {
                addTaskToDOM(item.title);
            });
            saveTasks();
        } catch (error) {
            console.error('Erreur lors de la récupération des tâches initiales:', error);
            errormsg = document.createElement('p');
            errormsg.textContent = "Impossible de charger les tâches initiales.";
            document.querySelector('.container').appendChild(errormsg);
            
        }
    }

    fetchInitialTasks();

});
