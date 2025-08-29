import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Sprout } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://44.229.227.142:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Welcome ${data.name}! Redirecting...`);
        setTimeout(() => navigate("/upload"), 1200);
      } else {
        setMessage(data.error || "Login failed. Please try again.");
      }
    } catch {
      setMessage("Network error – Is the backend running?");
    }
    setLoading(false);
  };

  const bgGradient = darkMode
    ? "linear-gradient(135deg, #04070c, #161b74)"
    : "linear-gradient(135deg, #dbeafe, #fef9c3)";
  const textColor = darkMode ? "#e0e7ff" : "#1e293b";
  const cardBg = darkMode ? "#1e293e" : "#fff";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: bgGradient,
        color: textColor,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Theme toggle button */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          padding: 26
        }}
      >
        <button
          aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          title={darkMode ? "Light Mode" : "Dark Mode"}
          onClick={() => {
            if (darkMode) {
              document.documentElement.classList.remove("dark");
              setDarkMode(false);
            } else {
              document.documentElement.classList.add("dark");
              setDarkMode(true);
            }
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "none",
            background: darkMode ? "#4c4c48" : "#0f172a",
            color: darkMode ? "#f9fafb" : "white",
            fontSize: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: darkMode ? "0 2px 8px #facc1550" : "0 2px 8px #256eb532"
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Main content */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          gap: 56,
          maxWidth: 1200,
          margin: "auto"
        }}
      >
        {/* Left logo / branding */}
        <section
          style={{
            width: 320,
            height: 320,
            backgroundColor: cardBg,
            borderRadius: 32,
            boxShadow: darkMode
              ? "0 0 30px #000a33"
              : "0 0 30px rgba(60,72,88,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 24
          }}
        >
          <Droplets size={36} color={darkMode ? "#60a5fa" : "#3b82f6"} />
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 900,
              color: darkMode ? "#facc15" : "#2563eb",
              margin: "12px 0 0",
              letterSpacing: "-0.07em"
            }}
          >
            Krishiv
          </h1>
          <p
            style={{
              marginTop: 12,
              color: darkMode ? "#bfdbfe" : "#64748b",
              fontWeight: 600,
              maxWidth: 280
            }}
          >
            Har Khet Ki Smart Kahani
          </p>
        </section>

        {/* Right side login form */}
        <section
          style={{
            width: 480,
            backgroundColor: cardBg,
            borderRadius: 18,
            padding: 48,
            boxShadow: darkMode
              ? "0 0 40px #000a33"
              : "0 0 40px rgba(60,72,88,0.1)",
            boxSizing: "border-box"
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: darkMode ? "#facc15" : "#2563eb",
              marginBottom: 24,
              textAlign: "center"
            }}
          >
            Welcome Back
          </h2>

          {message && (
            <p
              style={{
                color: message.startsWith("✅") ? "#10b981" : "#ef4444",
                textAlign: "center",
                marginBottom: 16,
                fontWeight: 600
              }}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {["email", "password"].map((field) => (
              <label
                key={field}
                style={{ display: "block", marginBottom: 14, fontWeight: 600 }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
                <input
                  type={field}
                  name={field}
                  value={formData[field as "email" | "password"]}
                  onChange={handleChange}
                  required
                  autoComplete={field === "password" ? "current-password" : "off"}
                  style={{
                    width: "100%",
                    padding: 14,
                    marginTop: 6,
                    borderRadius: 6,
                    border: `1px solid ${
                      darkMode ? "#475569" : "#e5e7eb"
                    }`,
                    backgroundColor: darkMode ? "#1e293e" : "#fff",
                    color: darkMode ? "#e0e7ff" : "#111827",
                    boxSizing: "border-box",
                    fontSize: 16
                  }}
                />
              </label>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: 14,
                marginTop: 8,
                borderRadius: 8,
                fontWeight: 700,
                fontSize: "1.1rem",
                border: "none",
                backgroundColor: loading
                  ? (darkMode ? "#92400e" : "#3b82f6")
                  : (darkMode ? "#facc15" : "#2563eb"),
                color: loading ? (darkMode ? "#fde68a" : "#dbeafe") : "#fff",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            style={{
              marginTop: 20,
              textAlign: "center",
              color: darkMode ? "#94aabb" : "#475569",
              fontSize: "0.9rem"
            }}
          >
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{
                color: darkMode ? "#facc15" : "#2563eb",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              Sign up
            </span>
          </p>
        </section>

        <footer
          style={{
            position: "fixed",
            bottom: 20,
            width: "100%",
            textAlign: "center",
            color: darkMode ? "#8899bb" : "#64748b"
          }}
        >
          <Sprout
            size={20}
            color={darkMode ? "#22c55e" : "#16a34a"}
            style={{ verticalAlign: "middle", marginRight: 8 }}
          />
          Krishiv — Har Khet Ki Smart Kahani © 2025
        </footer>
      </main>
    </div>
  );
};

export default LoginPage;






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Droplets, Sprout } from "lucide-react";

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [darkMode, setDarkMode] = useState(() => {
//     if (typeof window !== "undefined") {
//       return document.documentElement.classList.contains("dark");
//     }
//     return false;
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://44.229.227.142:5000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(`✅ Welcome ${data.name}! Redirecting...`);
//         setTimeout(() => {
//           navigate("/upload");
//         }, 1200);
//       } else {
//         setMessage(data.error || "Login failed. Please try again.");
//       }
//     } catch {
//       setMessage("Network error – Is the backend running?");
//     }
//     setLoading(false);
//   };

//   const bgGradient = darkMode 
//     ? "linear-gradient(135deg, #04070c, #161b74)" 
//     : "linear-gradient(135deg, #dbeafe, #fef9c3)";
//   const textColor = darkMode ? "#e0e7ff" : "#1e293b";
//   const cardBg = darkMode ? "#1e293e" : "#fff";

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: bgGradient,
//       color: textColor,
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       display: "flex",
//       flexDirection: "column"
//     }}>
//       {/* Top-right theme toggle */}
//       <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: "26px 44px 0 0" }}>
//         <button
//           aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
//           title={darkMode ? "Light Mode" : "Dark Mode"}
//           onClick={() => {
//             if (darkMode) {
//               document.documentElement.classList.remove("dark");
//               setDarkMode(false);
//             } else {
//               document.documentElement.classList.add("dark");
//               setDarkMode(true);
//             }
//           }}
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: "50%",
//             border: "none",
//             background: darkMode ? "#4c4c48" : "#0f172a",
//             color: darkMode ? "#f9fafb" : "white",
//             fontSize: 22,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             boxShadow: darkMode ? "0 2px 8px #facc1550" : "0 2px 8px #2563eb25"
//           }}
//         >
//           {darkMode ? "☀️" : "🌙"}
//         </button>
//       </div>

//       {/* Center content */}
//       <main style={{
//         flexGrow: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20
//       }}>
//         <section style={{
//           backgroundColor: cardBg,
//           padding: 48,
//           borderRadius: 18,
//           boxShadow: darkMode ? "0 0 40px #000a33" : "0 0 40px rgba(0, 0, 0, 0.1)",
//           width: 420,
//           boxSizing: "border-box"
//         }}>
//           <header style={{ textAlign: "center", marginBottom: 36 }}>
//             <Droplets size={36} color={darkMode ? "#7dd3fc" : "#2563eb"} />
//             <h1 style={{
//               fontSize: "2rem",
//               fontWeight: 700,
//               color: darkMode ? "#facc15" : "#2563eb",
//               marginTop: 12,
//               marginBottom: 8
//             }}>
//               Welcome Back
//             </h1>
//             <p style={{
//               color: darkMode ? "#cbd5e1" : "#475569",
//               fontSize: "1rem"
//             }}>
//               {`Sign in to continue to Krishiv`}
//             </p>
//           </header>

//           {message && (
//             <p style={{
//               color: message.startsWith("✅") ? "#10b981" : "#ef4444",
//               textAlign: "center",
//               marginBottom: 16,
//               fontWeight: 600
//             }}>
//               {message}
//             </p>
//           )}

//           <form onSubmit={handleSubmit} autoComplete="off">
//             {["email", "password"].map((field) => (
//               <label key={field} style={{ display: "block", marginBottom: 14, fontWeight: 600 }}>
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//                 <input
//                   type={field}
//                   name={field}
//                   value={formData[field as "email" | "password"]}
//                   onChange={handleChange}
//                   required
//                   autoComplete={field === "password" ? "current-password" : "off"}
//                   style={{
//                     width: "100%",
//                     padding: 14,
//                     marginTop: 6,
//                     borderRadius: 6,
//                     border: `1.5px solid ${darkMode ? "#475569" : "#cbd5e1"}`,
//                     backgroundColor: darkMode ? "#1e293b" : "#fff",
//                     color: darkMode ? "#e0e7ff" : "#111827",
//                     boxSizing: "border-box",
//                     fontSize: 16
//                   }}
//                 />
//               </label>
//             ))}

//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 width: "100%",
//                 padding: 14,
//                 backgroundColor: loading ? (darkMode ? "#92400e" : "#3b82f6") : (darkMode ? "#facc15" : "#2563eb"),
//                 color: loading ? (darkMode ? "#fde68a" : "#dbeafe") : (darkMode ? "#1e293b" : "#fff"),
//                 fontWeight: 700,
//                 borderRadius: 8,
//                 border: "none",
//                 cursor: loading ? "not-allowed" : "pointer",
//                 marginTop: 8,
//                 fontSize: "1.1rem"
//               }}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>

//           </form>

//           <p style={{ marginTop: 20, textAlign: "center", color: darkMode ? "#94a3b8" : "#475569" }}>
//             Don't have an account?{" "}
//             <span
//               onClick={() => navigate("/signup")}
//               style={{ color: darkMode ? "#facc15" : "#2563eb", cursor: "pointer", textDecoration: "underline" }}
//             >
//               Sign up
//             </span>
//           </p>
//         </section>
//       </main>

//       <footer style={{ marginBottom: 20, textAlign: "center", color: darkMode ? "#64748b" : "#94a3b8" }}>
//         <Sprout size={16} color={darkMode ? "#22c55e" : "#16a34a"} style={{ verticalAlign: "middle", marginRight: 6 }} />
//         Krishiv &mdash; Har Khet Ki Smart Kahani &copy; 2025
//       </footer>
//     </div>
//   );
// };

// export default LoginPage;
