"use client";

import { LiveKitRoom } from "@livekit/components-react";

import { cn } from "@/lib/utils";
import { useViewerToken } from "@/hooks/use-viewer-token";

import InfoCard from "./info-card";
import AboutCard from "./about-card";
import Chat, { ChatSkeleton } from "./chat";
import Video, { VideoSkeleton } from "./video";
import Header, { HeaderSkeleton } from "./header";
import { JsonValue } from "@prisma/client/runtime/library";
import { useChatSidebar } from "@/store/use-chat-sidebar";

type CustomStream = {
  id: string;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  isLive: boolean;
  thumbnailUrl: string | null;
  name: string;
};
type CustomProfile = {
  bio: string | null;
  age: number;
  location: string;
  preference: string | null;
  gender: string;
  socials: JsonValue;
  photos: JsonValue | null;
  videos: JsonValue | null;
};

type CustomUser = {
  id: string;
  username: string;
  profile: CustomProfile | null;
  stream: CustomStream | null;
  imageUrl: string;
  _count: { followedBy: number };
};

interface StreamPlayerProps {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  
  const isHost = identity.startsWith("host");
  const hostIdentity = `host-${user.id}`;

  return (
    <>
      <LiveKitRoom
        token={token}
        video={isHost}
        audio={isHost}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "pl-4 grid grid-cols-4 lg:gap-y-0 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-3 lg:col-span-3 xl:col-span-3 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-4 border-l  border-b ">
          <Video hostName={user.username} hostIdentity={hostIdentity} />
          <Header
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl}
            isFollowing={isFollowing}
            name={stream.name}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username}
            hostIdentity={hostIdentity}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
        <div className="col-span-full">
          <InfoCard
            hostIdentity={hostIdentity}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostIdentity={hostIdentity}
            viewerIdentity={identity}
            hostProfile={user.profile}
            followedByCount={user._count.followedBy}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export default StreamPlayer;

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full pb-10 border-l">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
