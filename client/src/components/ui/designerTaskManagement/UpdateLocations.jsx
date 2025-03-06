import { format } from "date-fns";
import LocationMap from "../../common/LocationMap";

const UpdateLocations = ({ workUpdates = [] }) => {
  const locations = workUpdates.reduce((acc, cv) => {
    return [
      ...acc,
      { latitude: cv.updateLocation.lat, longitude: cv.updateLocation.lng },
    ];
  }, []);

  return (
    <div className=" flex flex-col md:flex-row justify-between  w-full h-max bg-gradient-to-l from-pink-300 to-violet-300 rounded-lg overflow-hidden shadow-lg">
      <div className="m-4 w-xl">
        <h5 className="font-medium text-xl underline underline-offset-4 p-2">
          Track the Assocaite :
        </h5>
        <p className="italic">
          Tack the progress of the Associate and if any thing worg happens try
          to contact the associate partner. In case any thing tolerance happens
          inform to the admin he will ban/suspend them. They will be removed
          From design space internal team permanently.
        </p>
        <div className="mt-4 ml-1">
          <h5 className="text-md font-mono">Work Updates by Associate: </h5>
          <ol className="pl-2">
            {workUpdates.map((update) => {
              return (
                <li className="flex justify-between gap-5 ">
                  <div className="italic">
                    <span className="pr-2">&#8658;</span>
                    {update.description}
                  </div>
                  <div className="font-mono">
                    {format(new Date(update.timestamp), "PPpp")}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div className="w-xl p-2 border-l-2 bg-pink-300">
        <LocationMap
          locations={locations}
          className="border-4 border-pink-500 rounded-lg"
        />
      </div>
    </div>
  );
};
export default UpdateLocations;
