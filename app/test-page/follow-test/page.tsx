'use client';

import React, { useState } from 'react';
import { useFollowUser, useUnFollowUser } from '@/hooks/follow';
import { useGetUserFollowees, useGetUserFollowers } from '@/hooks/user';

const FollowTestPage: React.FC = () => {
  const [userId, setUserId] = useState<number>(1);
  const followUser = useFollowUser();
  const unfollowUser = useUnFollowUser();
  const {
    data: followees,
    isLoading: followeesLoading,
    error: followeesError,
  } = useGetUserFollowees(userId);
  const {
    data: followers,
    isLoading: followersLoading,
    error: followersError,
  } = useGetUserFollowers(userId);

  const handleFollow = () => {
    followUser({ userId });
  };

  const handleUnfollow = () => {
    unfollowUser({ userId });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Follow Test Page</h1>
      <div className="mb-4">
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleFollow}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Follow
        </button>
        <button
          onClick={handleUnfollow}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Unfollow
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Followees</h2>
        <ul>
          {followees?.list.map((followee) => (
            <li key={followee.id}>{followee.followee?.nickname}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Followers</h2>
        <ul>
          {followers?.list.map((follower) => (
            <li key={follower.id}>{follower.followee?.nickname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowTestPage;
