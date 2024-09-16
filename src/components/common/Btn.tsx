/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";

function Btn({ title }: { title: string }) {
  return (
    <Button className="relative px-6 py-0 text-xs sm:px-6 sm:py-0 lg:py-6 md:text-lg font-medium bg-yellow-500 text-white overflow-hidden group">
      <span className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
      <span className="relative z-10">{title}</span>
    </Button>
  );
}

export default Btn;
