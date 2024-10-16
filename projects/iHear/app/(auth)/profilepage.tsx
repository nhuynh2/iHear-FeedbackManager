import React from 'react';
import data from "../../assets/data/profilepage.json";

const ProfilePage: React.FC = () => {
  return (
    <div style={styles.profilePage}>
      {/* Header */}
      <h1 style={styles.profileHeader}>PROFILE</h1>

      {/* Profile Container */}
      <div style={styles.profileBox}>
        {/* Avatar Section */}
        <div style={styles.avatarSection}>
          <div style={styles.avatarPlaceholder}>
            <p>Avatar Photo</p>
          </div>
        </div>

        {/* User Information Fields */}
        <div style={styles.infoSection}>
          <p><strong>Name:</strong></p>
          <p><strong>Net ID:</strong></p>
          <p><strong>Role:</strong></p>
          <p><strong>Contact:</strong></p>
        </div>
      </div>
    </div>
  );
}


const styles = {
  profilePage: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    padding: '20px',
    backgroundColor: 'white',
  },
  profileHeader: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    fontSize: '24px',
    color: '#0000FF', 
    marginTop: '10px',
    marginBottom: '30px',
  },
  profileBox: {
    width: '90%',
    maxWidth: '400px',
    border: '2px solid black',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'flex-start',
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  avatarPlaceholder: {
    width: '150px',
    height: '150px',
    border: '2px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '16px',
    textAlign: 'center' as 'center',
  },
  infoSection: {
    fontSize: '18px',
    lineHeight: '2.5',
  },
};

export default ProfilePage;
