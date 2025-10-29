
import React from 'react';
import type { FlightDetails } from '../types';

interface FlightCardProps {
  flight: FlightDetails;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-600 dark:text-blue-400">{flight.airline}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{flight.flightNumber}</span>
        </div>
        <span className="text-lg font-bold text-green-600 dark:text-green-400">${flight.price}</span>
      </div>

      <div className="flex items-center justify-between text-gray-800 dark:text-gray-200">
        <div className="text-center">
          <p className="font-bold text-xl">{flight.departure.airport}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{flight.departure.time}</p>
        </div>

        <div className="flex-1 px-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-full h-px bg-gray-300 dark:bg-gray-500"></div>
            <div className="relative px-2 bg-gray-50 dark:bg-gray-800 text-sm text-gray-500 dark:text-gray-400">
              {flight.duration}
            </div>
          </div>
          <div className="text-center text-xs text-red-500 mt-1">
            {flight.stops > 0 ? `${flight.stops} stop${flight.stops > 1 ? 's' : ''}` : 'Non-stop'}
          </div>
        </div>

        <div className="text-center">
          <p className="font-bold text-xl">{flight.arrival.airport}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{flight.arrival.time}</p>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
