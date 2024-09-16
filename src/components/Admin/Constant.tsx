/* eslint-disable @typescript-eslint/no-explicit-any */
export const formFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Room Name",
    validation: { required: "Room name is required" },
  },
  {
    name: "roomNo",
    label: "Room Number",
    type: "number",
    placeholder: "Enter Room Number",
    validation: { required: "Room number is required" },
  },
  {
    name: "floorNo",
    label: "Floor Number",
    type: "number",
    placeholder: "Enter Floor Number",
    validation: { required: "Floor number is required" },
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
    placeholder: "Enter Room Capacity",
    validation: { required: "Capacity is required" },
  },
  {
    name: "pricePerSlot",
    label: "Price Per Slot",
    type: "number",
    placeholder: "Enter Price Per Slot",
    validation: { required: "Price per slot is required" },
  },
  {
    name: "amenities",
    label: "Amenities",
    type: "multiselect",
    validation: { required: "Please select at least one amenity" },
    options: [
      { label: "WiFi", value: "wifi" },
      { label: "Projector", value: "projector" },
      { label: "Whiteboard", value: "whiteboard" },
      { label: "Air Conditioning", value: "air_conditioning" },
      { label: "TV", value: "tv" },
    ],
  },
  {
    name: "image1",
    label: "Image 1",
    type: "text",
    placeholder: "Upload Image 1",
  },
  {
    name: "image2",
    label: "Image 2",
    type: "text",
    placeholder: "Upload Image 2",
  },
  {
    name: "image3",
    label: "Image 3",
    type: "text",
    placeholder: "Upload Image 3",
  },
];
export const updateFormFields = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter Room Name",
  },
  {
    name: "roomNo",
    label: "Room Number",
    type: "number",
    placeholder: "Enter Room Number",
  },
  {
    name: "floorNo",
    label: "Floor Number",
    type: "number",
    placeholder: "Enter Floor Number",
  },
  {
    name: "capacity",
    label: "Capacity",
    type: "number",
    placeholder: "Enter Room Capacity",
  },
  {
    name: "pricePerSlot",
    label: "Price Per Slot",
    type: "number",
    placeholder: "Enter Price Per Slot",
  },
  {
    name: "amenities",
    label: "Amenities",
    type: "multiselect",
    options: [
      { label: "WiFi", value: "wifi" },
      { label: "Projector", value: "projector" },
      { label: "Whiteboard", value: "whiteboard" },
      { label: "Air Conditioning", value: "air_conditioning" },
      { label: "TV", value: "tv" },
    ],
  },
  {
    name: "image1",
    label: "Image 1",
    type: "text",
    placeholder: "Upload Image 1",
  },
  {
    name: "image2",
    label: "Image 2",
    type: "text",
    placeholder: "Upload Image 2",
  },
  {
    name: "image3",
    label: "Image 3",
    type: "text",
    placeholder: "Upload Image 3",
  },
];

type RoomData = {
  name?: string;
  roomNo?: number;
  floorNo?: number;
  capacity?: number;
  pricePerSlot?: number;
  amenities?: string[];
  image1?: string;
  image2?: string;
  image3?: string;
};

export const roomData = (data: any) => {
  const roomData: RoomData = {};

  if (data.name) {
    roomData.name = data.name;
  }
  if (data.roomNo) {
    roomData.roomNo = Number(data.roomNo);
  }
  if (data.floorNo) {
    roomData.floorNo = Number(data.floorNo);
  }
  if (data.capacity) {
    roomData.capacity = Number(data.capacity);
  }
  if (data.pricePerSlot) {
    roomData.pricePerSlot = Number(data.pricePerSlot);
  }
  if (data.amenities) {
    roomData.amenities = data.amenities;
  }
  if (data.image1) {
    roomData.image1 = data.image1;
  }
  if (data.image2) {
    roomData.image2 = data.image2;
  }
  if (data.image3) {
    roomData.image3 = data.image3;
  }

  return roomData;
};
