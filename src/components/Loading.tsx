'use client';

export default function Loading() {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col gap-12 items-center text-white">
        <h3 className="text-5xl mb-4">Productivity Record</h3>
        <p className="text-5xl mb-4">Loading…</p>
        <div className="w-16 h-16 border-4 scale-200 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
