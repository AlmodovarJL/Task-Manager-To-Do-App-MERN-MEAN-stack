import React from "react";
import md5 from "md5";

function Profile({ user }) {
  if (!user) return null;

  const hash = md5(user.email.trim().toLowerCase());
  const avatarUrl = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  return (
    <div className="d-flex align-items-center mb-3">
      <img
        src={avatarUrl}
        alt="avatar"
        className="rounded-circle me-2"
        width="50"
        height="50"
      />
      <div>
        <h5 className="mb-0">Welcome, {user.name || "User"} 👋</h5>
        <small>{user.email}</small>
      </div>
    </div>
  );
}

export default Profile;
