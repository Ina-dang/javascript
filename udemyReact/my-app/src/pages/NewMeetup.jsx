import { useHistory } from 'react-router-dom'

import { NewMeetupForm } from "../components/meetups/NewMeetupForm"

function NewMeetupPage() {
    const history = useHistory();

    function addMeetupHandler(meetupData) {
        fetch(
            'https://react-getting-dashed-default-rtdb.firebaseio.com/meetups.json',
            {
                method: 'POST',
                body: JSON.stringify(meetupData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(() => {
            history.replace('/')
        })
    }

    return (
        <section>
            <h1>New Meetups Page</h1>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </section>
    )
}

export { NewMeetupPage }