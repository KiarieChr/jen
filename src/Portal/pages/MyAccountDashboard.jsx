import React, { useState } from 'react';
import ProfileHeader from '../components/users/account/ProfileHeader';
import ProfileTabs from '../components/users/account/ProfileTabs';
import PersonalInfoPanel from '../components/users/account/PersonalInfoPanel';
import AttendanceRecordPanel from '../components/users/account/AttendanceRecordPanel';
import MembersInvitedPanel from '../components/users/account/MembersInvitedPanel';
import EditProfilePictureModal from '../components/users/account/EditProfilePictureModal';
import EditProfileModal from '../components/users/account/EditProfileModal';

const MyAccountDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditProfilePicModalOpen, setIsEditProfilePicModalOpen] = useState(false);
    const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '2rem' }}>
            <ProfileHeader
                onEditProfilePic={() => setIsEditProfilePicModalOpen(true)}
                onEditProfile={() => setIsEditProfileModalOpen(true)}
            />
            <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === 'profile' && <PersonalInfoPanel />}
            {activeTab === 'attendance' && <AttendanceRecordPanel />}
            {activeTab === 'invited' && <MembersInvitedPanel />}

            {isEditProfilePicModalOpen && <EditProfilePictureModal onClose={() => setIsEditProfilePicModalOpen(false)} />}
            {isEditProfileModalOpen && <EditProfileModal onClose={() => setIsEditProfileModalOpen(false)} />}
        </div>
    );
};

export default MyAccountDashboard;
