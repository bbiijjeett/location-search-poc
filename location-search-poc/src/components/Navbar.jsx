import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaLocationArrow } from 'react-icons/fa';
import LocationSearch from './LocationSearch';
import { MdClose } from 'react-icons/md'

const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' }
];

const iconList = [
    { icon: <FaLocationArrow /> },
];

const bgColor = 'bg-gray-800';
const modalColor = 'bg-gray-900';

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
    const [showModal, setShowModal] = useState(false);

    const [locationMode, setLocationMode] = useState(null); // 'manual' or 'gps'
    const [location, setLocation] = useState(''); // Store the location address
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Check if the user has already selected a location before
        const savedLocation = localStorage.getItem('userLocation');
        if (!savedLocation) {
          // If location doesn't exist in localStorage, show the modal
          setLocationMode(null);
        } else {
          setLocation(savedLocation); // Set the location if it already exists
          setLocationMode('gps'); // Set the location mode to 'gps'
        }
      }, []);

    // Handle location mode change
  const handleLocationModeChange = (locMode) => {
    console.log('Location mode:', locMode);
    setLocationMode(locMode);
    if (locMode === 'manual') {
      setIsModalOpen(true); // Open modal for manual input
    } else if (locMode === 'gps') {
      getCurrentLocation();
    }
  };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            // You can use a geocoding API to convert the coordinates to a human-readable address
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR-API-KEY`)
              .then((response) => response.json())
              .then((data) => {
                const address = data.results[0]?.formatted_address || 'Location not found';
                setLocation(address);
                localStorage.setItem('userLocation', address); // Save to localStorage
              })
              .catch((error) => console.error('Error fetching current location:', error));
          }, (error) => {
            console.error('Error getting current location:', error);
          });
        } else {
          alert('Geolocation is not supported by this browser.');
        }
      };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 769);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleBarsIconClick = () => {
        toggleModal();
    };

    return (
        <>  
            {!isMobile ? (
                // Laptop Navbar Code Here
                <nav className={`h-auto ${bgColor}`}>
                    <div className="flex justify-between mx-auto items-center py-4 px-24">
                        <div className="text-white font-bold text-xl">Logo</div>
                        <ul className="flex gap-8 md:gap-16 items-center justify-center text-center cursor-pointer">
                            {navLinks.map((link, index) => (
                                <li key={index} className="text-white text-sm">{link.title}</li>
                            ))}
                        </ul>
                        <ul className="flex text-white gap-6 items-center cursor-pointer" onClick={()=>{setLocationMode(null)}}>
                            <FaLocationArrow  />
                            {location ? `${location.substring(0, 30)}${location.length > 20 ? '...' : ''}` : 'Select a location'}
                        </ul>
                        
                        {locationMode === null && (
                            <div className='rounded-lg top-12 right-10 p-4 shadow-lg absolute bg-white w-[450px]'>
                                <div className='flex flex-row'>
                                    <div className='w-1/5 flex items-center justify-center'><FaLocationArrow /></div>
                                    <div className='w-4/5'>
                                        <div className='my-4'>
                                            <p className="block font-body text-base tracking-[0.5px]">
                                                To serve you as quickly as possible, we would like your current location
                                            </p>
                                        </div>
                                        <div className='flex flex-row'>
                                            <button onClick={()=>{handleLocationModeChange('manual')}} 
                                                    className="block text-sm font-medium px-2 bg-blue-500 text-white rounded-md mr-4 max-w-[8rem] py-1 hover:bg-blue-600">
                                                Type manually
                                            </button>
                                            <button onClick={()=>{handleLocationModeChange('gps')}} 
                                                    className="block text-sm font-medium px-2 bg-blue-500 text-white rounded-md max-w-[8rem] py-1 hover:bg-blue-600">
                                                Use Current location
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        
                        
                    </div>
                </nav>
            ) : (
                // Mobile Navbar Code Here
                <nav className={`h-auto ${bgColor} py-4 px-4`}>
                    <div className="mx-auto flex justify-between items-center ">
                        <div className="text-white font-bold text-xl">Logo</div>
                        <div className="flex justify-end items-center gap-6 text-white cursor-pointer">
                        <div onClick={()=>{setLocationMode(null)}}>
                            <FaLocationArrow  />
                            {location ? `${location.substring(0, 30)}${location.length > 20 ? '...' : ''}` : 'Select a location'}
                        </div>
                        <FaBars onClick={handleBarsIconClick} className="text-white cursor-pointer" />
                        </div>
                    </div>

                    {locationMode === null && (
                        <div className='rounded-lg top-12 right-4 px-2 py-4 shadow-lg absolute bg-white w-[400px]'>
                            <div className='flex flex-row'>
                                <div className='w-1/5 flex items-center justify-center'><FaLocationArrow /></div>
                                <div className='w-4/5'>
                                    <div className='my-4'>
                                        <p className="block font-body text-base tracking-[0.5px]">
                                            To serve you as quickly as possible, we would like your current location
                                        </p>
                                    </div>
                                    <div className='flex flex-row'>
                                        <button onClick={()=>{handleLocationModeChange('manual')}} 
                                                className="block text-sm font-medium px-2 bg-blue-500 text-white rounded-md mr-4 max-w-[8rem] py-1 hover:bg-blue-600">
                                            Type manually
                                        </button>
                                        <button onClick={()=>{handleLocationModeChange('gps')}} 
                                                className="block text-sm font-medium px-2 bg-blue-500 text-white rounded-md max-w-[8rem] py-1 hover:bg-blue-600">
                                            Use Current location
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}



                    {showModal && (
                        <div className="fixed inset-0 flex justify-center items-center">
                            <div className={`absolute inset-0 ${modalColor}`} />
                            
                            <FaTimes
                                className="absolute top-6 right-4 text-white cursor-pointer"
                                onClick={toggleModal}
                                style={{ fontSize: '16px' }}
                            />
                            <div className="relative bg-gray-900 w-full">
                                <div className="flex flex-col gap-8 items-center justify-center h-full">
                                    {navLinks.map((link, index) => (
                                        <span key={index} className="text-white font-light text-2xl cursor-pointer">{link.title}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </nav>
            )}
            {
                isModalOpen && (
                    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="relative bg-white p-6 rounded-lg shadow-lg 
                                        w-full md:max-w-[592px] h-screen md:h-[416px] md:w-[592px]">
                            {/* Close button in the top-right corner */}
                            <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                            <MdClose size={24} />
                            </button>

                            {/* Your modal content */}
                            <LocationSearch setLocation={setLocation} onClose={() => setIsModalOpen(false)} />
                        </div>
                    </div>
                )
            }

        </>
    );
}

export default Navbar;