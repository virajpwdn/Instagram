import React from 'react'
import Stories from '../ui/Stories'

const FeedView = () => {
  return (
    <div className='h-screen text-textLight dark:text-textDark'>
        <div className="top h-[1.5em] bg-secondary"></div>
        <div className="middle h-1/6 border-2 border-primary px-10 py-2 flex gap-6 overflow-x-auto scrollbar-hide cursor-pointer">
            <Stories />
        </div>
        <div className="bottom"></div>
    </div>
  )
}

export default FeedView