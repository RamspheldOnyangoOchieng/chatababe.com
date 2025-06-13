"use client";

import React from "react";
import { MessageCircle, Bell, UserCircle } from "lucide-react";
import {SignOutButton } from "@clerk/nextjs";
import TokenModal from "../tokens-modal";

interface UserProps {
  username: string;
  currentTokens: number;
}

const Modal = ({ username, currentTokens }: UserProps) => {
  return (
    <div className=" relative min-w-[16rem] max-lg:hidden">
      <div className="">
        <div className="bg-primary-2 flex items-center p-2 rounded-t-lg ">
          <button>
            <UserCircle size={18} color="#FFFFFF" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <button>
              <MessageCircle size={16} color="#FFFFFF" />
            </button>
            <button>
              <Bell size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
        <div className="z-1 px-2 py-4 bg-primary-1">
          <div className="flex items-center w-full mb-2">
            <p className="text-xs text-n-2 font-semibold">
              Status:{" "}
              <span className="text-sm text-n-2 font-bold">{username}</span>
            </p>
            {username !== "Anonymous" && (
              <SignOutButton>
                <p className="text-xs text-s-3 ml-auto font-medium cursor-pointer">
                  {"(log out)"}
                </p>
              </SignOutButton>
            )}
          </div>
          <div className="flex items-center w-full">
            <p className="text-xs text-n-2 font-semibold">
              You have:{" "}
              <span className="text-sm text-n-2 font-bold">
                {currentTokens} tokens
              </span>
            </p>
            <TokenModal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
