import React from "react";

export default function PlayerProfileSection({ player }) {
  return (
    <div className="flex items-center gap-12 mb-8 ml-8 text-gray-700">
      <div>
        <img
          src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`}
          alt={player.fullName}
          className="w-[200px] rounded-md object-cover"
        />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">{player.fullName}</h1>
        <p className="text-sm text-gray-500">
          {player.teamName} • #{player.jersey} • {player.position}
        </p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mt-2">
          <div>
            <strong className="inline-block w-20">Height</strong>
            {player.height}
          </div>
          <div>
            <strong className="inline-block w-20">Country</strong>
            {player.country}
          </div>
          <div>
            <strong className="inline-block w-20">Weight</strong>
            {player.weight}
          </div>
          <div>
            <strong className="inline-block w-20">Draft</strong>
            {player.draft}
          </div>
          <div>
            <strong className="inline-block w-20">Age</strong>
            {player.age}
          </div>
          <div>
            <strong className="inline-block w-20">Attended</strong>
            {player.school}
          </div>
        </div>
      </div>
    </div>
  );
}
