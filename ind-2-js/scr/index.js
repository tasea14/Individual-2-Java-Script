import { getRandomActivity } from "./activity.js";

async function UpdateActivity() {
    try {
        const randomActText = await getRandomActivity()
        document.getElementById('activity').innerText = randomActText
    } catch (error) {
        document.getElementById('activity').innerText = error.message
    }
    setTimeout(() => {
        UpdateActivity()
    }, 60000);
}

UpdateActivity()
