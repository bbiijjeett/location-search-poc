import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationSearch = ({ onClose, setLocation }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch location suggestions from Google Places API
  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`http://localhost:5000/location-suggestions?input=${input}`);
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    fetchSuggestions(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    const selectedLocation = suggestion.description;
    setLocation(selectedLocation); // Set the selected location
    localStorage.setItem('userLocation', selectedLocation); // Save to localStorage
    onClose(); // Close the modal
  };

  const renderSuggestion = (suggestion) => (
    <div className="flex justify-between items-center py-2 border-b ">
      <span className='cursor-pointer'>{suggestion.description}</span>
      <FaMapMarkerAlt className="text-gray-500" size={20} /> {/* Map icon from react-icons */}
    </div>
  );
  
  return (
    <div className="bg-white relative w-full p-6 rounded">
      <h2 className="text-xl font-bold">Your Location</h2>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => fetchSuggestions(value)}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion) => suggestion.description}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Search for a location...',
          value,
          onChange,
        }}
        onSuggestionSelected={onSuggestionSelected}
      />
    </div>
  )
}

export default LocationSearch