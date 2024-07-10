'use client';

import { useState } from 'react';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';

interface ThumbsProps {
  isLiked: boolean;
  likeCount: number;
}

const Thumbs = (props: ThumbsProps) => {
  const { isLiked = false, likeCount = 0 } = props;
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);

  const handleClick = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center px-[10px] md:px-3 py-[6px] w-fit bg-black-450 border-gray-650 border rounded-full"
    >
      {liked ? (
        <RiThumbUpFill className="text-blue mr-[5px] " />
      ) : (
        <RiThumbUpLine className="text-gray-500 mr-[5px]" />
      )}
      {liked ? (
        <span className="text-indigo text-sm md:text-lg font-mono">{likes}</span>
      ) : (
        <span className="text-gray-500 text-sm md:text-lg font-mono">{likes}</span>
      )}
    </button>
  );
};

export default Thumbs;
