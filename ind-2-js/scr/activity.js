export async function getRandomActivity() {
    try {
        const response = await fetch('http://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Failed to fetch activity');
        }
        const data = await response.json();
        return data.activity; // Возвращаем данные активности
    } catch (error) {
        console.error('Error fetching activity:', error);
        return null;
    }
}

export function updateActivity() {
    getRandomActivity()
        .then(activity => {
            if (activity) {
                document.getElementById('activity').textContent = activity;
            } else {
                document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
            }
        })
        .catch(error => {
            console.error('Error updating activity:', error);
            document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
        });
}

updateActivity(); 

setTimeout(updateActivity, 60000); 
