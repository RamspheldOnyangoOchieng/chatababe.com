import { WifiOff } from "lucide-react";

interface OfflineVideoProps {
  username: string;
}

const OfflineVideo = ({ username }: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-n-3" />
      <p className="text-n-3">{username} is offline</p>
    </div>
  );
};

export default OfflineVideo;
