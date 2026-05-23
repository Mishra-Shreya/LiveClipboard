"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { socket } from "@/lib/socket";
import { FaCopy } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { MdRefresh } from "react-icons/md";
import { LuCopy } from "react-icons/lu";





export default function RoomPage() {
  const params = useParams();
  const roomId = String(params.id);

  const [text, setText] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [isRemoteUpdate, setIsRemoteUpdate] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [copyRoomLabel, setCopyRoomLabel] = useState("Room Link");
  const [copyTextLabel, setCopyTextLabel] = useState("Copy Clipboard");

  const roomLink = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/room/${roomId}`;
  }, [roomId]);

  useEffect(() => {
    if (!socket.connected) socket.connect();
    
    setIsConnected(socket.connected);

    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);

    const handleRoomState = (data: { text?: string; users?: string[] }) => {
      setText(data.text || "");
      setUsers(data.users || []);
    };

    const handleUsersUpdated = (data: { users?: string[] }) => {
      setUsers(data.users || []);
    };

    const handleClipboardUpdate = ({ text }: { text: string }) => {
      setIsRemoteUpdate(true);
      setText(text);
      setTimeout(() => setIsRemoteUpdate(false), 0);
    };

    const handleRoomError = ({ message }: { message: string }) => {
      alert(message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("room-state", handleRoomState);
    socket.on("users-updated", handleUsersUpdated);
    socket.on("clipboard-update", handleClipboardUpdate);
    socket.on("room-error", handleRoomError);

    socket.emit("join-room", { roomId });

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("room-state", handleRoomState);
      socket.off("users-updated", handleUsersUpdated);
      socket.off("clipboard-update", handleClipboardUpdate);
      socket.off("room-error", handleRoomError);
    };
  }, [roomId]);

  const handleChange = (value: string) => {
    setText(value);

    if (!isRemoteUpdate) {
      socket.emit("clipboard-update", {
        roomId,
        text: value,
      });
    }
  };

  const handleCopyRoomLink = async () => {
    try {
      await navigator.clipboard.writeText(roomLink);
      setCopyRoomLabel("Copied!");
      setTimeout(() => setCopyRoomLabel("Copy Room Link"), 1500);
    } catch {
      alert("Could not copy the room link.");
    }
  };

  const handleCopyClipboardContent = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyTextLabel("Copied!");
      setTimeout(() => setCopyTextLabel("Copy Clipboard Content"), 1500);
    } catch {
      alert("Could not copy the clipboard content.");
    }
  };

  const handleClear = () => {
    setText("");
    socket.emit("clear-clipboard", { roomId });
  };

  if (!roomId || roomId === "undefined") {
    return (
      <main className="min-h-screen flex items-center justify-center  p-6 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold">Invalid room</h1>
          <p className="mt-2 text-slate-600">
            Go back and create or join a valid session.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Room</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {roomId}
              </h1>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isConnected ? "bg-emerald-500" : "bg-rose-500"
                  }`}
                />
                <span className="text-sm text-slate-600">
                  {isConnected ? "You are connected" : "Connecting..."}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Connected users: {users.length}
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                onClick={handleCopyRoomLink}
                className="mt-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                <IoMdShare />
              </button>

              <button
                onClick={handleCopyClipboardContent}
                className="mt-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                <LuCopy />
              </button>

              <button
                onClick={handleClear}
                className="mt-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
              >
                <MdRefresh />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Shared Clipboard
          </label>

          <textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Paste or type text here..."
            className="h-[420px] w-full rounded-2xl border border-slate-200 bg-slate-100 p-4 text-base text-slate-900 outline-none transition focus:border-emerald-400 focus:bg-white"
          />

          <p className="mt-3 text-sm text-slate-500">
            Anything typed here updates everyone in the room instantly.
          </p>
        </div>
      </div>
    </main>
  );
}