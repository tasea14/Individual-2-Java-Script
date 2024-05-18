/**
 * Asynchronous function to fetch a random activity from the API.
 * @returns {Promise<string|null>} A promise that resolves with the random activity text or null if there's an error.
 */
export async function getRandomActivity() {
    try {
        // Fetching data from the API endpoint
        const response = await fetch('http://www.boredapi.com/api/activity/');
        
        // Checking if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch activity');
        }
        
        // Parsing the response data as JSON
        const data = await response.json();
        
        // Returning the activity text from the response data
        return data.activity;
    } catch (error) {
        // Handling any errors that occur during the fetch process
        console.error('Error fetching activity:', error);
        return null;
    }
}

/**
 * Function to update the activity displayed on the webpage.
 */
export function updateActivity() {
    // Calling the getRandomActivity function asynchronously
    getRandomActivity()
        .then(activity => {
            // Updating the DOM element with id 'activity' based on the fetched activity
            if (activity) {
                document.getElementById('activity').textContent = activity;
            } else {
                document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
            }
        })
        .catch(error => {
            // Handling errors that occur during the update process
            console.error('Error updating activity:', error);
            document.getElementById('activity').textContent = 'К сожалению, произошла ошибка';
        });
}

// Initial call to updateActivity to display the activity
updateActivity(); 

// Setting a timer to update the activity every 60 seconds
setTimeout(updateActivity, 60000); 
