"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Lock, Mail, Terminal, Loader } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center bg-[#05060A] overflow-hidden p-6">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[130px] pointer-events-none" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md glass-panel p-8 md:p-10 relative z-10 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-cyan-400 mb-4 select-none">
            <Lock className="w-5 h-5 text-cyan-400" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white tracking-wide">
            Systems Management
          </h1>
          <p className="font-sans text-xs text-gray-500 uppercase tracking-widest mt-2 flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Secure Admin Control</span>
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/15 border border-red-500/25 text-red-300 text-sm p-4 rounded-xl mb-6 font-sans">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aetheric.ai"
              className="input-field"
              required
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 font-sans flex items-center space-x-2">
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Security Credentials</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glow-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-sans font-medium py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-55 hover:scale-[1.01]"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                <span>Authorizing...</span>
              </>
            ) : (
              <span>Authorize Login</span>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
