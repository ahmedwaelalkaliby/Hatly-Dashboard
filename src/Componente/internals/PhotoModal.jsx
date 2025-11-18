import React from 'react'
import { FaTimes } from 'react-icons/fa';

export default function PhotoModal({ imageSrc, setShowPhotoModal }) {

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto left-10">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
                    onClick={() => setShowPhotoModal(false)}
                ></div>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900"></h3>
                            <button
                                onClick={() => setShowPhotoModal(false)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                            >
                                <FaTimes className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex justify-center min-h-screen">
                            <img
                                src={imageSrc}
                                alt="Ticket"
                                className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg min-w-64"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = '/placeholder.jpg'; // Placeholder image
                                }
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

