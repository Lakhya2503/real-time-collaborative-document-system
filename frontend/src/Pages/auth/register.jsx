import { useState } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Real-Time Collaboration",
    desc: "Work together with your team instantly",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Secure & Private",
    desc: "JWT authentication & role-based access",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Cloud Based",
    desc: "Access your documents from anywhere",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Version History",
    desc: "Track changes and restore previous versions",
  },
];

const avatars = [
  {
    label: "Editing...",
    color: "#6366F1",
    top: "18%",
    left: "4%",
    avatar: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="20" fill="#fde68a"/>
        <ellipse cx="20" cy="26" rx="10" ry="6" fill="#f59e0b"/>
        <circle cx="20" cy="16" r="7" fill="#fbbf24"/>
        <circle cx="17" cy="15" r="1.5" fill="#1e3a5f"/>
        <circle cx="23" cy="15" r="1.5" fill="#1e3a5f"/>
        <path d="M17 19 Q20 22 23 19" fill="none" stroke="#1e3a5f" strokeWidth="1.2" strokeLinecap="round"/>
        {/* hair */}
        <path d="M13 14 Q14 8 20 9 Q26 8 27 14" fill="#b45309" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Commenting...",
    color: "#22C55E",
    top: "52%",
    left: "62%",
    avatar: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="20" fill="#dbeafe"/>
        <ellipse cx="20" cy="26" rx="10" ry="6" fill="#3b82f6"/>
        <circle cx="20" cy="16" r="7" fill="#93c5fd"/>
        <circle cx="17" cy="15" r="1.5" fill="#1e3a5f"/>
        <circle cx="23" cy="15" r="1.5" fill="#1e3a5f"/>
        <path d="M17 19 Q20 22 23 19" fill="none" stroke="#1e3a5f" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 12 Q15 7 20 8 Q25 7 26 12" fill="#1d4ed8" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Viewing...",
    color: "#8B5CF6",
    top: "76%",
    left: "6%",
    avatar: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <circle cx="20" cy="20" r="20" fill="#ede9fe"/>
        <ellipse cx="20" cy="26" rx="10" ry="6" fill="#7c3aed"/>
        <circle cx="20" cy="16" r="7" fill="#c4b5fd"/>
        <circle cx="17" cy="15" r="1.5" fill="#1e3a5f"/>
        <circle cx="23" cy="15" r="1.5" fill="#1e3a5f"/>
        <path d="M17 19 Q20 22 23 19" fill="none" stroke="#1e3a5f" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function CollabDocsRegister() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "linear-gradient(135deg, #e0f0ff 0%, #c8e4ff 50%, #b8d9ff 100%)" }}
    >
      <div
        className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ minHeight: "640px" }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          className="flex-1 p-8 md:p-12 relative overflow-hidden flex flex-col"
          style={{ background: "linear-gradient(145deg, #daeeff 0%, #bfdfff 100%)" }}
        >
          {/* Dot grid */}
          <div className="absolute top-4 right-8 grid grid-cols-6 gap-2 opacity-20">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-blue-400" />
            ))}
          </div>
          <div className="absolute bottom-4 left-4 grid grid-cols-6 gap-2 opacity-15">
            {Array.from({ length: 36 }).map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-blue-400" />
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md"
              style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="1.5"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="1.5"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="text-2xl font-bold" style={{ color: "#1e3a5f" }}>
              Collab <span style={{ color: "#3B82F6" }}>Docs</span>
            </span>
          </div>

          <div className="w-10 h-0.5 rounded-full mb-5" style={{ background: "#3B82F6" }} />

          <h1 className="text-3xl font-extrabold leading-tight mb-3" style={{ color: "#1e3a5f" }}>
            Real-Time Collaborative<br />Document System
          </h1>
          <p className="text-sm mb-6" style={{ color: "#4a7fa8" }}>
            Create, edit and collaborate on documents<br />in real-time with secure access control.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-3 mb-8">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.7)", color: "#3B82F6" }}
                >
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#1e3a5f" }}>{f.title}</p>
                  <p className="text-xs" style={{ color: "#5a8aad" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          
          <div className="relative mt-auto">
            
            <div
              className="absolute -top-6 right-10"
              style={{ animation: "float 3s ease-in-out infinite" }}
            >
              <svg viewBox="0 0 50 50" className="w-11 h-11" style={{ fill: "#3B82F6" }}>
                <path d="M47 3L2 20l16 7 7 18 7-12 15 15 0-45zM20 27L8 22 40 9 20 27zm5 17l-5-14 12-8-7 22z"/>
              </svg>
            </div>

            
            <div className="absolute bottom-8 left-0 right-0 flex justify-center opacity-30 pointer-events-none">
              <svg viewBox="0 0 300 80" className="w-full">
                <ellipse cx="80" cy="55" rx="70" ry="30" fill="white"/>
                <ellipse cx="220" cy="60" rx="80" ry="28" fill="white"/>
                <circle cx="80" cy="40" r="28" fill="white"/>
                <circle cx="130" cy="35" r="22" fill="white"/>
                <circle cx="220" cy="42" r="26" fill="white"/>
                <circle cx="270" cy="50" r="20" fill="white"/>
              </svg>
            </div>

            <div
              className="rounded-2xl shadow-xl overflow-visible relative"
              style={{ background: "white", maxWidth: "320px", margin: "0 auto" }}
            >
              
              <div
                className="flex items-center gap-2 px-4 py-2 border-b text-xs"
                style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
              >
                <span className="flex items-center gap-1">Normal <svg viewBox="0 0 10 6" className="w-2 h-2 fill-current"><path d="M0 0l5 6 5-6z"/></svg></span>
                <span className="flex items-center gap-1 ml-1">Arial <svg viewBox="0 0 10 6" className="w-2 h-2 fill-current"><path d="M0 0l5 6 5-6z"/></svg></span>
                <span className="flex items-center gap-1 ml-1">12 <svg viewBox="0 0 10 6" className="w-2 h-2 fill-current"><path d="M0 0l5 6 5-6z"/></svg></span>
                <div className="ml-1 flex gap-1.5 font-bold text-gray-700 text-xs">
                  <span>B</span><span className="italic">I</span><span className="underline">U</span>
                </div>
                <div className="ml-auto flex gap-1 text-gray-400">
                  {["≡","≡","≡"].map((s,i)=>(<span key={i}>{s}</span>))}
                </div>
              </div>

              
              <div className="p-5 relative" style={{ minHeight: "160px" }}>
                <div className="text-4xl font-bold mb-3" style={{ color: "#bfdbfe" }}>Aa</div>
                {[85, 100, 75, 90, 60].map((w, i) => (
                  <div key={i} className="rounded-full mb-2" style={{ height: "7px", width: `${w}%`, background: "#dbeafe" }}/>
                ))}
                <div className="rounded-lg mt-3 flex items-center justify-center" style={{ height: "52px", background: "#eff6ff", border: "2px dashed #bfdbfe" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#93c5fd" strokeWidth="1.5" className="w-7 h-7">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                </div>
              </div>

              
              {avatars.map((a) => (
                <div
                  key={a.label}
                  className="absolute flex items-center gap-1"
                  style={{ top: a.top, left: a.left, zIndex: 10 }}
                >
                  <div className="rounded-full shadow-md overflow-hidden border-2 border-white" style={{ width: 40, height: 40 }}>
                    {a.avatar}
                  </div>
                  <div
                    className="text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md whitespace-nowrap"
                    style={{ background: a.color }}
                  >
                    {a.label}
                  </div>
                  <svg
                    viewBox="0 0 12 16"
                    className="w-3 h-4 absolute -bottom-3"
                    style={{ fill: a.color, left: "38px" }}
                  >
                    <path d="M0 0 L8 4 L4 6 L5 12 L2 12 L3 6 L0 10Z"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div
          className="flex-1 flex items-center justify-center p-8 md:p-12"
          style={{ background: "rgba(255,255,255,0.93)" }}
        >
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-extrabold text-center mb-1" style={{ color: "#1e3a5f" }}>
              Create Your Account
            </h2>
            <p className="text-center text-sm mb-7" style={{ color: "#6b7280" }}>
              Join CollabDocs and start collaborating
            </p>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Full Name</label>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:border-blue-400 transition-all" style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={set("name")}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "#374151" }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Email Address</label>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:border-blue-400 transition-all" style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7" strokeLinecap="round"/>
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={form.email}
                  onChange={set("email")}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "#374151" }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-1">
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Password</label>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:border-blue-400 transition-all" style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
                </svg>
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={set("password")}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "#374151" }}
                />
                <button onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {showPass
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>
            <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>At least 8 characters with letter, number &amp; symbol</p>

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1.5" style={{ color: "#374151" }}>Confirm Password</label>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3 border focus-within:border-blue-400 transition-all" style={{ borderColor: "#e5e7eb", background: "#f9fafb" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round"/>
                </svg>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={form.confirm}
                  onChange={set("confirm")}
                  className="flex-1 bg-transparent text-sm outline-none"
                  style={{ color: "#374151" }}
                />
                <button onClick={() => setShowConfirm(!showConfirm)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  {showConfirm
                    ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round"/></svg>
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-3 mb-6">
              <div
                className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 cursor-pointer transition-all border"
                style={{
                  background: agreed ? "#3B82F6" : "white",
                  borderColor: agreed ? "#3B82F6" : "#d1d5db",
                }}
                onClick={() => setAgreed(!agreed)}
              >
                {agreed && (
                  <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                    <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <p className="text-sm" style={{ color: "#6b7280" }}>
                I agree to the{" "}
                <button className="font-semibold hover:opacity-80" style={{ color: "#3B82F6" }}>Terms of Service</button>
                {" "}and{" "}
                <button className="font-semibold hover:opacity-80" style={{ color: "#3B82F6" }}>Privacy Policy</button>
              </p>
            </div>

            {/* Create Account button */}
            <button
              className="w-full py-3.5 rounded-xl text-white font-bold text-base shadow-lg transition-all hover:shadow-xl hover:opacity-95 active:scale-95"
              style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)" }}
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "#9ca3af" }}>or continue with</span>
              <div className="flex-1 h-px" style={{ background: "#e5e7eb" }} />
            </div>

            {/* Google */}
            <button
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border font-semibold text-sm transition-all hover:bg-gray-50 active:scale-95"
              style={{ borderColor: "#e5e7eb", color: "#374151" }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Sign In link */}
            <p className="text-center text-sm mt-5" style={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <button className="font-bold hover:opacity-80 transition-opacity" style={{ color: "#3B82F6" }}>
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}