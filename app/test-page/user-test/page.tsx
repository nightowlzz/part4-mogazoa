'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetMyInfo, useUpdateMyInfo, useGetUserRanking } from '@/hooks/user';
import { UpdateUserRequest } from '@/types/data';
import { FormField } from '../TestForm';

const UserTestPage: React.FC = () => {
  const { data: myInfo, isLoading: myInfoLoading, error: myInfoError } = useGetMyInfo();
  const updateMyInfo = useUpdateMyInfo();
  const { data: userRanking, isLoading: rankingLoading, error: rankingError } = useGetUserRanking();

  const { control, handleSubmit } = useForm<UpdateUserRequest>();

  const onSubmit: SubmitHandler<UpdateUserRequest> = (data) => {
    updateMyInfo(data);
  };

  if (myInfoLoading || rankingLoading) return <div>Loading...</div>;
  if (myInfoError) return <div>Error loading user info: {myInfoError.message}</div>;
  if (rankingError) return <div>Error loading user ranking: {rankingError.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Test Page</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">My Info</h2>
        <pre>{JSON.stringify(myInfo, null, 2)}</pre>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FormField name="nickname" control={control} label="Nickname" />
          <FormField name="description" control={control} label="Description" />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update My Info
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold">User Ranking</h2>
        <ul>
          {userRanking?.map((user) => (
            <li key={user.id}>
              {user.nickname} - Reviews: {user.reviewCount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserTestPage;
