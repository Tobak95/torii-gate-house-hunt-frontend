import React from 'react'
import screw from "../assets/screw.png"

const EmptyTenant = () => {
  return (
    <div className="h-[600px] flex items-center justify-center ">
      <div className="text-center max-w-[356px] p-1.5">
        <img src={screw} alt="empty" />
        <h1 className="font-medium text-xl my-2 5">No match found</h1>
        <p className="text-[#666] font-medium text-[16px] mb-6">
          We couldn’t find any house that matches your search request.
        </p>
      </div>
    </div>
  );
}

export default EmptyTenant