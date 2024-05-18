// Importing the getRandomActivity function from the activity.js file
import { getRandomActivity } from "./activity.js";

/**
 * Asynchronous function to update the activity text.
 */
async function UpdateActivity() {
    try {
        // Calling the getRandomActivity function to get a random activity text
        const randomActText = await getRandomActivity();
        // Updating the text content of the element with id 'activity' with the random activity text
        document.getElementById('activity').innerText = randomActText;
    } catch (error) {
        // Handling any errors that occur during the process and updating the activity text with the error message
        document.getElementById('activity').innerText = error.message;
    }
    // Setting a timer to call the UpdateActivity function again after 60 seconds
    setTimeout(() => {
        UpdateActivity();
    }, 60000);
}

// Calling the UpdateActivity function to start updating the activity text
UpdateActivity();
