



// getting credential 
const apiKey = "50c247020fbb2726df43bd1f21ea563d";
const apiToken = "ATTAd80283326aab1500fdf22d09fa6d5bae157c2a4ebb5a01e4acaef53a25bd4f4328A07824";
const listId = "646f67eded17ba1e7b1a2b51";




async function createTrelloCard(name, description, startDate, dueDate) {

    try {
        if (!name || !description || !dueDate || !startDate) {
            alert("All form fields are required")
            throw new Error("All form fields are required")
        }


        // formating date 
        const formattedStartDate = new Date(startDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
        const formattedDueDate = new Date(dueDate).toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });


        if (new Date(formattedStartDate) > new Date(formattedDueDate)) {
            alert("tart date cannot be greater than due date.")
            throw new Error('Start date cannot be greater than due date.');
        }

        // makeing request to trello 
        const response = await axios.post(`https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${apiToken}`, {
            name: name,
            desc: description,
            start: formattedStartDate,
            due: formattedDueDate
        })
        console.log('Card created successfully. You can visit here', response.data.url);
        alert('Card created successfully. You can visit here', response.data.url)

    } catch (error) {
        console.error('Error creating card:', error.response ? error.response.data : error.message);
    }

}




const trelloForm = document.getElementById('trelloForm')
// Add an event listener to the form submission
trelloForm.addEventListener('submit', handleTrelloForm);

function handleTrelloForm(event) {
    event.preventDefault();

    // Get form field values
    const name = trelloForm.name.value;
    const description = trelloForm.description.value;
    const startDate = trelloForm.startDate.value;
    const dueDate = trelloForm.dueDate.value;

    // Create a new card in Trello
    createTrelloCard(name, description, startDate, dueDate);
}