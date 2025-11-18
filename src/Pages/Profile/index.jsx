import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    FaUser, 
    FaPhone, 
    FaMapMarkerAlt, 
    FaBirthdayCake, 
    FaEnvelope, 
    FaIdCard, 
    FaShieldAlt, 
    FaPassport, 
    FaTimes, 
    FaImage, 
    FaCamera, 
    FaEdit 
} from 'react-icons/fa';
import { getUser } from '../../redux/Slices/authSlice';

// Helper functions
const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const getUserInitial = (firstName) => {
    if (firstName) {
        return firstName.charAt(0).toUpperCase();
    }
    return 'U';
};

export default function Profile() {
    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    
    // State
    const [showPhotoModal, setShowPhotoModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Effects
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(getUser(user?.id));
    }, [dispatch]);

    // Handlers
    const handleEditProfile = () => {
        navigate(`/landingPage/users/${user?.id}`);
    };

    // Render functions
    const renderProfileHeader = () => (
        <div className="bg-white shadow">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
                        {renderProfilePhoto()}
                        {renderProfileInfo()}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProfilePhoto = () => (
        <div className="relative">
            {user?.profilePhoto ? (
                <img
                    src={user.profilePhoto}
                    alt="Profile"
                    className="h-40 w-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
            ) : (
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-6xl text-white font-bold">
                        {getUserInitial(user?.firstName)}
                    </span>
                </div>
            )}
            <button 
                className="absolute bottom-0 right-0 bg-white text-blue-600 rounded-full p-2 shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                title="Change profile photo"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            </button>
        </div>
    );

    const renderProfileInfo = () => (
        <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    {user?.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
                </h1>
                <button
                    onClick={handleEditProfile}
                    className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full transition-colors duration-200"
                    title={isEditing ? "Save Changes" : "Edit Profile"}
                >
                    <FaEdit className="h-6 w-6" />
                </button>
            </div>
            <div className="mt-4 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    user?.verify 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {user?.verify ? 'Verified' : 'Not Verified'}
                </span>
                <span className="text-gray-500 text-lg">
                    Member since {formatDate(user?.createdAt)}
                </span>
            </div>
        </div>
    );

    const renderPhotoModal = () => (
        showPhotoModal && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div 
                        className="fixed inset-0 transition-opacity bg-black bg-opacity-75"
                        onClick={() => setShowPhotoModal(false)}
                    ></div>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Passport Photo</h3>
                                <button
                                    onClick={() => setShowPhotoModal(false)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-200"
                                >
                                    <FaTimes className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <img
                                    src={user?.passportPhoto}
                                    alt="Passport"
                                    className="max-h-[80vh] w-auto object-contain rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {renderProfileHeader()}
            {/* Main Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Personal Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaUser className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Full Name</h3>
                                    <p className="mt-2 text-lg text-gray-900">
                                        {user?.firstName ? `${user.firstName} ${user.lastName}` : 'Not specified'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaEnvelope className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Email Address</h3>
                                    <p className="mt-2 text-lg text-gray-900">{user?.email || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaPhone className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Phone Number</h3>
                                    <p className="mt-2 text-lg text-gray-900">{"+" + user?.phone?.dialCode + " " + user?.phone?.phoneNumber || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaMapMarkerAlt className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Address</h3>
                                    <p className="mt-2 text-lg text-gray-900">{user?.country + " - " + user?.city  || 'Not specified'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white rounded-lg shadow-sm p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Account Information</h2>
                        <div className="space-y-8">
                            {/* Passport Photo Section */}
                            <div className="flex flex-col space-y-4">
                                <div className="flex items-center space-x-6">
                                    <div className="flex-shrink-0">
                                        <FaPassport className="h-8 w-8 text-gray-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-medium text-gray-500">Passport Photo</h3>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    {user?.passportPhoto ? (
                                        <div 
                                            className="cursor-pointer group relative"
                                            onClick={() => setShowPhotoModal(true)}
                                        >
                                            <div className="h-40 w-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                <FaImage className="h-16 w-16 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="bg-black/60 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                                        <FaCamera className="h-6 w-6 text-white" />
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                                                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        Click to view passport photo
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-40 w-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300">
                                            <div className="relative">
                                                <FaPassport className="h-16 w-16 text-gray-400 mb-2" />
                                                <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1.5">
                                                    <FaCamera className="h-4 w-4" />
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-500 text-center px-4 mt-2">No passport photo uploaded</p>
                                            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium">
                                                Upload Photo
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaIdCard className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">User ID</h3>
                                    <p className="mt-2 text-lg text-gray-900">{user?.id || 'Not specified'}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaShieldAlt className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Account Status</h3>
                                    <p className="mt-2">
                                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-medium ${
                                            user?.verify 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user?.verify ? 'Verified' : 'Not Verified'}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <FaBirthdayCake className="h-8 w-8 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-medium text-gray-500">Member Since</h3>
                                    <p className="mt-2 text-lg text-gray-900">{formatDate(user?.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {renderPhotoModal()}
        </div>
    );
}
