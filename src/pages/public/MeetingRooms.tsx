/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import RoomCard from "@/components/RoomCard";
import { useGetAllRoomsQuery } from "@/redux/features/admin/roomManagementApi";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MeetingRooms = () => {
  const { data: rooms, isLoading } = useGetAllRoomsQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCapacityFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacityFilter(event.target.value);
  };

  const handlePriceFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(event.target.value);
  };

  const handleSortOrder = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCapacityFilter("");
    setPriceFilter("");
    setSortOrder("");
  };

  const filteredRooms = rooms?.data?.result
    ?.filter((room: any) => room.isDeleted !== true)
    ?.filter((room: any) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.filter((room: any) =>
      capacityFilter ? room.capacity >= parseInt(capacityFilter) : true
    )
    ?.filter((room: any) =>
      priceFilter ? room.pricePerSlot <= parseInt(priceFilter) : true
    )
    ?.sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return a.pricePerSlot - b.pricePerSlot;
      } else if (sortOrder === "desc") {
        return b.pricePerSlot - a.pricePerSlot;
      }
      return 0;
    });

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto p-6 py-16">
        {isLoading && <h1 className="text-center text-red-500">Loading...</h1>}

        <h1 className="text-3xl font-medium text-green-500 pb-8">All Rooms</h1>

        {/* Search and Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:space-x-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-1/3 ">
                <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="p-2 border border-gray-700 rounded-md text-white bg-gray-900 pl-8 w-full"
                />
              </div>
              <Input
                placeholder="Filter by capacity..."
                type="number"
                value={capacityFilter}
                onChange={handleCapacityFilter}
                className="p-2 border border-gray-700 rounded-md text-white bg-gray-900 w-full sm:w-1/3"
              />
              <Input
                placeholder="Filter by price..."
                type="number"
                value={priceFilter}
                onChange={handlePriceFilter}
                className="p-2 border border-gray-700 rounded-md text-white bg-gray-900 w-full sm:w-1/3"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
              <Button
                onClick={() => handleSortOrder("asc")}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-400 w-full sm:w-auto"
              >
                <FaSortAmountUp className="inline mr-2" />
                Low-High price
              </Button>
              <Button
                onClick={() => handleSortOrder("desc")}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-400 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <FaSortAmountDown className="inline mr-2" />
                Hight-Low price
              </Button>
              <Button
                onClick={handleClearFilters}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-400 w-full sm:w-auto mt-2 sm:mt-0"
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Room Cards */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filteredRooms?.length ? (
            filteredRooms.map((room: any) => (
              <RoomCard key={room._id} roomData={room} />
            ))
          ) : (
            <h2 className="text-center text-gray-500">No rooms found</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingRooms;
