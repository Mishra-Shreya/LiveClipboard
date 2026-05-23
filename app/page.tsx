"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { socket } from "@/lib/socket";

export default function HomePage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createRoom = () => {
    if (!socket.connected) socket.connect();

    socket.emit("create-room");

    socket.once("room-created", ({ roomId }) => {
      router.push(`/room/${roomId}`);
    });
  };

  const joinRoom = () => {
    const cleaned = roomId.trim().toUpperCase();
    if (cleaned) {
      router.push(`/room/${cleaned}`);
    }
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto flex min-h-screen max-w-6xl items-start">
        <div className=" grid w-full gap-8">
          <section className="flex flex-col justify-center">
            {/* <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              <span>📋</span>
              <span>Live Clipboard</span>
            </div> */}

            <h1 className="max-w-xl text-5xl font-black tracking-tight text-slate-900 md:text-6xl">
              Share text, emojis, and ideas in real time ✨
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Create a room, invite others with a link, and sync clipboard content instantly across every screen.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="grid rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <label className="block text-sm font-medium text-slate-700">
                  Create Room
                </label>
                <button
                  onClick={createRoom}
                  className="mt-3 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  🚀 Create Session
                </button>
              </div>

              <div className="flex grid rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <label className="block text-sm font-medium text-slate-700">
                  Join Room
                </label>

                <div className="mt-3 flex gap-3">
                  <input
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="Enter room code"
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none transition focus:border-emerald-500"
                  />
                  <button
                    onClick={joinRoom}
                    className="rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">✅ No login</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">⚡ Realtime sync</span>
              <span className="rounded-full bg-white px-4 py-2 shadow-sm">🔒 Invite-only rooms</span>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}