import React from 'react';
import { Box, Typography, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Home } from '@mui/icons-material';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import { toast } from 'react-toastify';
import PersonIcon from '@mui/icons-material/Person';
import { formatDate } from '../../Utils/utilFunctions';
import ArticleIcon from '@mui/icons-material/Article';
const StyledPaper = styled(Box)(({ theme }) => ({
  borderRadius: '12px',
  padding: theme.spacing(3),
  background: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  border: '1px solid rgba(0, 0, 0, 0.08)',
}));

export default function UserCard({ user }) {
  return (
    <StyledPaper>
      <div className="flex flex-col items-center p-6">
        <div className="relative w-32 h-32 mb-4">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <AccountCircleOutlinedIcon
              sx={{ fontSize: 128, color: 'primary.main' }}
            />
          )}
          {/* Verification Badge */}
          {user.verify && (
            <div className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full">
              <TaskAltIcon sx={{ fontSize: 20 }} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          {user.verify ? (
            <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
              Verified
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-100 rounded-full">
              Unverified
            </span>
          )}
        </div>
        <p className="text-gray-600 font-medium mb-2 capitalize">{user.role}</p>
        <div className="w-full space-y-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <PersonIcon className="text-blue-500" />
              Personal Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="text-gray-900">{user.dateOfBirth ? formatDate(user.dateOfBirth) : 'Not provided'}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ContactsIcon className="text-blue-500" />
              Contact Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EmailIcon className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-blue-500 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(user.email);
                      toast.success("Email copied to clipboard");
                    }}
                  >
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <PhoneIcon className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-900">
                    {user.phone ? (
                      <>+{user.phone.dialCode} {user.phone.phoneNumber}</>
                    ) : (
                      'Not provided'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <LocationOnIcon className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-900">
                    {user.city && user.country ? (
                      <>{user.city}, {user.country}</>
                    ) : (
                      'Location not specified'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Home className="text-blue-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-900">{user.address || 'Address not provided'}</p>
                  <p className="text-sm text-gray-600">
                    Postal Code: {user.postalCode || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.passportPhoto && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ArticleIcon className="text-blue-500" />
                Documents
              </h3>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={user.passportPhoto}
                  alt="Passport"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </StyledPaper>
  );
}