"use client";

import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import CommunityItem from "./community-item";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

const ChatCommunity = ({
  hostName,
  viewerName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue<string>(value, 500);

  const participants = useParticipants();

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue[0].toLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-n-2/60">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search community"
        className="border bg-n-4/20 ring-offset-n-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="text-center text-sm text-n-1 hidden last:block p-2">
          No results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
