const workouts = {
    Chest: [
        { name: 'Bench Press', setsReps: '4x10', video: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
        { name: 'Incline Dumbbell Press', setsReps: '3x12', video: 'https://www.youtube.com/watch?v=8iPEnn-ltC8' },
        { name: 'Chest Fly', setsReps: '3x15', video: 'https://www.youtube.com/watch?v=eozdVDA78K0' }
        // Add more exercises
    ],
    'Arms and Triceps': [
        { name: 'Bicep Curl', setsReps: '4x12', video: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
        { name: 'Tricep Dip', setsReps: '3x10', video: 'https://www.youtube.com/watch?v=0326dy_-CzM' },
        { name: 'Hammer Curl', setsReps: '3x12', video: 'https://www.youtube.com/watch?v=zC3nLlEvin4' }
        // Add more exercises
    ],
    'Shoulders and Back': [
        { name: 'Shoulder Press', setsReps: '4x10', video: 'https://www.youtube.com/watch?v=B-aVuyhvLHU' },
        { name: 'Lat Pulldown', setsReps: '3x12', video: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
        { name: 'Bent Over Row', setsReps: '3x15', video: 'https://www.youtube.com/watch?v=vT2GjY_Umpw' }
        // Add more exercises
    ],
    Legs: [
        { name: 'Squat', setsReps: '4x10', video: 'https://www.youtube.com/watch?v=Dy28eq2PjcM' },
        { name: 'Lunges', setsReps: '3x12', video: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U' },
        { name: 'Leg Press', setsReps: '3x15', video: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' }
        // Add more exercises
    ],
    'Cardio/HIIT': [
        { name: 'Sprint Intervals', setsReps: '6x30s', video: 'https://www.youtube.com/watch?v=Hs_gyx6GKtQ' },
        { name: 'Burpees', setsReps: '3x15', video: 'https://www.youtube.com/watch?v=JZQA08SlJnM' },
        { name: 'Jump Rope', setsReps: '5x2min', video: 'https://www.youtube.com/watch?v=Z1Z8VAqHqz8' }
        // Add more exercises
    ]
};

function generateWorkout(type) {
    const workout = workouts[type];
    const exerciseTable = document.getElementById('exerciseTable');
    exerciseTable.innerHTML = '';

    const randomExercises = workout.sort(() => 0.5 - Math.random()).slice(0, 7);

    randomExercises.forEach(exercise => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${exercise.name}</td>
            <td>${exercise.setsReps}</td>
            <td><a href="${exercise.video}" target="_blank">Watch</a></td>
        `;
        exerciseTable.appendChild(row);
    });
}

function generateCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('calendar-day');
        dayDiv.innerHTML = `
            <div>${day.toDateString()}</div>
            <button onclick="addWorkoutToDay('${day.toDateString()}')">Add Workout</button>
        `;
        calendarDays.appendChild(dayDiv);
    }
}

function addWorkoutToDay(date) {
    const workoutTable = document.getElementById('exerciseTable');
    const workoutData = [];
    Array.from(workoutTable.children).forEach(row => {
        workoutData.push({
            exercise: row.children[0].innerText,
            setsReps: row.children[1].innerText,
            video: row.children[2].children[0].href
        });
    });

    if (workoutData.length === 0) {
        alert('No workout selected to add.');
        return;
    }

    const storedWorkouts = JSON.parse(localStorage.getItem('workouts')) || {};
    storedWorkouts[date] = workoutData;
    localStorage.setItem('workouts', JSON.stringify(storedWorkouts));
    alert(`Workout added for ${date}`);
}

generateCalendar();
