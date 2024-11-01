import { type TServer } from "../../../types";

interface IServerRowProps {
  server: TServer;
}

export const ServerRow = ({ server }: IServerRowProps) => (
  <div
    aria-label="server"
    className="server bg-gray-100 rounded-md p-2 flex items-center hover:bg-gray-200 transition-colors"
  >
    <div className="server-info flex items-center justify-between w-full">
      <h3 className="text-md  mr-2">{server.name}</h3>
      <span className="text-gray-500 text-sm">{server.distance} km</span>
    </div>
  </div>
);
