'use client';

import React from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import { STORE_LOCATIONS, PRIMARY_LOCATION } from '@/lib/constants';

interface AddressListProps {
  singleAddressOnly?: boolean;
}

export const AddressList: React.FC<AddressListProps> = ({
  singleAddressOnly = true,
}) => {
  const locations = singleAddressOnly ? [PRIMARY_LOCATION] : STORE_LOCATIONS;

  return (
    <div className="w-full flex flex-col gap-3 my-3 px-2">
      {locations.map((loc, idx) => (
        <div key={loc.id || idx}>
          <div className="flex items-start gap-3 text-left">
            <div className="mt-0.5 w-6 h-6 rounded-full bg-[#007A33]/10 flex items-center justify-center text-[#007A33] shrink-0">
              <HiLocationMarker className="w-5 h-5 text-[#007A33]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-[#1E293B] text-sm sm:text-base leading-tight">
                {loc.address}
              </span>
              <span className="text-xs sm:text-sm text-gray-600 font-medium">
                {loc.cityStateZip}
              </span>
            </div>
          </div>
          {idx < locations.length - 1 && (
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#007A33]/25 to-transparent my-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default AddressList;
