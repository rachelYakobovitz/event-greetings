
import React, { useState } from 'react';
import axios from 'axios';

function GreetingForm() {
    const [greetingOptions, setGreetingOptions] = useState([]);
    const [displayedOptionIndex, setDisplayedOptionIndex] = useState(0);
    const [event, setEvent] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [type, setType] = useState('');
    const [atmosphere, setAtmosphere] = useState('');

    const handleGenerateGreeting = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/generate-greeting', {
                event,
                eventDetails,
                type,
                atmosphere,
            });

            if (!response.data.error) {
                setGreetingOptions(response.data);
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Server Request Error:', error.message);
        }
    };

    const handleShowAnotherOption = () => {
        // Increment the index to display the next option
        setDisplayedOptionIndex((prevIndex) => (prevIndex + 1) % greetingOptions.length);
    };

    return (
        <div>
            <h1>Greeting Generator</h1>

            {/* Event Selection */}
            <label>
                Event:
                <select value={event} onChange={(e) => setEvent(e.target.value)}>
                    <option value="">Select Event</option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                </select>
            </label>

            {/* Additional Questions Based on Event */}
            {event === 'birthday' && (
                <label>
                    Age:
                    <input type="number" value={eventDetails} onChange={(e) => setEventDetails(e.target.value)} />
                </label>
            )}

            {event === 'wedding' && (
                <div>
                    <label>
                        Bride's Name:
                        <input type="text" value={eventDetails} onChange={(e) => setEventDetails(e.target.value)} />
                    </label>
                </div>
            )}

            {/* General Answers */}
            <label>
                Type of Greeting:
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="song">Song</option>
                    <option value="greeting">Greeting</option>
                    <option value="letter">Letter</option>
                </select>
            </label>

            <label>
                Atmosphere:
                <select value={atmosphere} onChange={(e) => setAtmosphere(e.target.value)}>
                    <option value="">Select Atmosphere</option>
                    <option value="happy">Happy</option>
                    <option value="entertaining">Entertaining</option>
                    <option value="funny">Funny</option>
                </select>
            </label>

            {/* "Write me a greeting" button */}
            <button onClick={handleGenerateGreeting}>Write me a greeting</button>

            {/* Display Generated Greeting Options */}
            {greetingOptions.length > 0 && (
                <div>
                    <h2>Generated Greeting Option:</h2>
                    <p>{greetingOptions[displayedOptionIndex]}</p>
                    <button onClick={handleShowAnotherOption}>Show another option</button>
                </div>
            )}
        </div>
    );
}


export default GreetingForm;

