import React from "react";

export default function PlayerStatsTable({ stats }) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Season Stats</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-center">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-3 py-2">Season</th>
              <th className="px-3 py-2">Team</th>
              <th className="px-3 py-2">GP</th>
              <th className="px-3 py-2">MIN</th>
              <th className="px-3 py-2">PTS</th>
              <th className="px-3 py-2">REB</th>
              <th className="px-3 py-2">AST</th>
              <th className="px-3 py-2">STL</th>
              <th className="px-3 py-2">BLK</th>
              <th className="px-3 py-2">TOV</th>
              <th className="px-3 py-2">FG%</th>
              <th className="px-3 py-2">3P%</th>
              <th className="px-3 py-2">FT%</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="px-3 py-2">{stat.season}</td>
                <td className="px-3 py-2">{stat.teamAbb}</td>
                <td className="px-3 py-2">{stat.gp}</td>
                <td className="px-3 py-2">{stat.min.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.pts.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.reb.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.ast.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.stl.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.blk.toFixed(2)}</td>
                <td className="px-3 py-2">{stat.tov.toFixed(2)}</td>
                <td className="px-3 py-2">{(stat.fgP * 100).toFixed(1)}%</td>
                <td className="px-3 py-2">{(stat.fg3P * 100).toFixed(1)}%</td>
                <td className="px-3 py-2">{(stat.ftP * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
