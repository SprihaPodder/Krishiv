import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Droplets, Sprout } from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://44.229.227.142:5000/api/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Signup successful! Redirecting to login...");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.error || "Signup failed. Please try again.");
      }
    } catch {
      setMessage("Network error – Is the backend running?");
    }
    setLoading(false);
  };

  // Styling vars
  const bgGradient = darkMode
    ? "linear-gradient(135deg, #04070c, #161b74)"
    : "linear-gradient(135deg, #dbeafe, #fef9c3)";
  const textColor = darkMode ? "#e0e7ff" : "#1e293b";
  const cardBg = darkMode ? "#1e293e" : "#ffffff";

  return (
    <div style={{
      minHeight: "100vh",
      background: bgGradient,
      color: textColor,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Theme toggle top-right */}
      <div style={{ width: "100%", padding: 26, display: "flex", justifyContent: "flex-end" }}>
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
            cursor: "pointer",
            boxShadow: darkMode ? "0 2px 8px #facc1550" : "0 2px 8px #256eb532",
          }}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      {/* Main content */}
      <main style={{
        display: "flex",
        gap: 56,
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Left panel */}
        <section style={{
          width: 320,
          height: 320,
          backgroundColor: cardBg,
          borderRadius: 32,
          boxShadow: darkMode ? "0 0 30px #000a33" : "0 0 30px rgba(60,72,88,0.2)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: 24,
        }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: 900,
            color: darkMode ? "#facc15" : "#256eb5",
            margin: 0,
            letterSpacing: "-0.07em"
          }}>Krishiv</h1>
          <p style={{
            marginTop: 12,
            color: darkMode ? "#bfdbfe" : "#64748b",
            fontWeight: 600,
            fontSize: "1.1rem",
            maxWidth: 280,
          }}>Har Khet Ki Smart Kahani</p>
        </section>

        {/* Signup form */}
        <section style={{
          maxWidth: 480,
          width: "100%",
          backgroundColor: cardBg,
          borderRadius: 18,
          padding: 48,
          boxShadow: darkMode ? "0 0 40px #000a33" : "0 0 40px rgba(60,72,88,0.1)",
          boxSizing: "border-box"
        }}>
          <h2 style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: darkMode ? "#facc15" : "#256eb5",
            textAlign: "center",
            marginBottom: 24
          }}>Create an account</h2>

          {message && (
            <p style={{
              color: message.startsWith("✅") ? "#10b981" : "#ef4444",
              textAlign: "center",
              marginBottom: 16,
              fontWeight: 600,
            }}>{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            {["name", "email", "password", "confirmPassword"].map(field => (
              <label key={field} style={{ display: "block", marginBottom: 14, fontWeight: 600 }}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                <input
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  placeholder={`Enter your ${field}`}
                  autoComplete={field === "confirmPassword" ? "new-password" : "off"}
                  style={{
                    width: "100%",
                    padding: 14,
                    marginTop: 6,
                    borderRadius: 6,
                    border: `1.5px solid ${darkMode ? "#475569" : "#ddd"}`,
                    backgroundColor: darkMode ? "#1e293e" : "#fff",
                    color: darkMode ? "#e0e7ff" : "#111",
                    fontSize: 16,
                    boxSizing: "border-box"
                  }}
                />
              </label>
            ))}

            <button type="submit" disabled={false} style={{
              width: "100%",
              padding: 14,
              marginTop: 8,
              borderRadius: 8,
              fontWeight: "bold",
              fontSize: 18,
              border: "none",
              backgroundColor: darkMode ? "#facc15" : "#256eb5",
              color: darkMode ? "#111" : "#fff",
              cursor: "pointer"
            }}>
              Sign Up
            </button>
          </form>

          <p style={{
            marginTop: 20,
            textAlign: "center",
            color: darkMode ? "#949eac" : "#475569"
          }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: darkMode ? "#facc15" : "#256eb5",
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              Log in
            </span>
          </p>
        </section>

        <footer style={{
          position: "fixed",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          color: darkMode ? "#8892b0" : "#64748b"
        }}>
          <Sprout size={18} color={darkMode ? "#22c55e" : "#16a34a"} style={{ verticalAlign: "middle", marginRight: 6 }} />
          Krishiv &mdash; Har Khet Ki Smart Kahani &copy; 2025
        </footer>
      </main>
    </div>
  );
};

export default SignupPage;






// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Droplets, Sprout } from "lucide-react";

// const SignupPage: React.FC = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
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

//     if (formData.password !== formData.confirmPassword) {
//       setMessage("Passwords do not match!");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://44.229.227.142:5000/api/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Signup successful! Redirecting to login...");
//         setFormData({ name: "", email: "", password: "", confirmPassword: "" });
//         setTimeout(() => {
//           navigate("/login");
//         }, 1500);
//       } else {
//         setMessage(data.error || "Signup failed. Please try again.");
//       }
//     } catch (err) {
//       setMessage("Network error – Is the backend running?");
//     }
//     setLoading(false);
//   };

//   // Styles
//   const bgGrad = darkMode
//     ? "linear-gradient(135deg, #04070cff, #161b74ff)"
//     : "linear-gradient(135deg, #dbeafe, #fef9c3)";
//   const textColor = darkMode ? "#e0e7ff" : "#1e293b";
//   const cardBg = darkMode ? "#1e293e" : "#ffffff";

//   return (
//     <div style={{
//       minHeight: "100vh",
//       background: bgGrad,
//       color: textColor,
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       display: "flex",
//       flexDirection: "column",
//       padding: 0,
//       margin: 0,
//     }}>
//       {/* Top-right theme toggle */}
//       <div style={{ width: "100%", display: "flex", justifyContent: "flex-end", padding: 26 }}>
//         <button
//           aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
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
//             color: darkMode ? "#0f172a" : "#fff",
//             fontSize: 22,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             cursor: "pointer",
//             boxShadow: darkMode ? "0 2px 8px #facc1550" : "0 2px 8px #2563eb25"
//           }}>
//           {darkMode ? "☀️" : "🌙"}
//         </button>
//       </div>

//       {/* Main container */}
//       <main style={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center",
//         flexGrow: 1,
//         gap: 56,
//         padding: 24,
//         maxWidth: 1200,
//         margin: "0 auto",
//         boxSizing: "border-box",
//       }}>
//         {/* Left Side */}
//         <section style={{
//           width: 320,
//           height: 320,
//           backgroundColor: cardBg,
//           borderRadius: 32,
//           boxShadow: darkMode ? "0 0 30px #0a2463" : "0 0 30px rgba(60,72,88,0.2)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 24,
//           textAlign: "center",
//         }}>
//           <h1 style={{
//             fontSize: "3.5rem",
//             fontWeight: 900,
//             color: darkMode ? "#facc15" : "#2563eb",
//             margin: 0,
//             letterSpacing: "-0.07em"
//           }}>Krishiv</h1>
//           <p style={{
//             marginTop: 12,
//             color: darkMode ? "#bfdbfe" : "#64748b",
//             fontWeight: 600,
//             fontSize: "1.1rem",
//             maxWidth: 280
//           }}>Har Khet Ki Smart Kahani</p>
//         </section>

//         {/* Right Side - Signup Form */}
//         <section style={{
//           backgroundColor: cardBg,
//           borderRadius: 18,
//           boxShadow: darkMode ? "0 0 40px #0a246377" : "0 0 40px rgba(60,72,88,0.1)",
//           padding: 48,
//           width: 480,
//           boxSizing: "border-box"
//         }}>
//           <h2 style={{
//             fontSize: "1.5rem",
//             fontWeight: 700,
//             color: darkMode ? "#facc15" : "#2563eb",
//             marginBottom: 24,
//             textAlign: "center"
//           }}>Create an Account</h2>

//           {message && (
//             <p style={{
//               color: message.startsWith("✅") ? "#38d9a9" : "#f87171",
//               marginBottom: 16,
//               fontWeight: 600,
//               textAlign: "center"
//             }}>{message}</p>
//           )}

//           <form onSubmit={handleSubmit} autoComplete="off">
//             {["name", "email", "password", "confirmPassword"].map(field => (
//               <label key={field} style={{ display: "block", marginBottom: 14, fontWeight: 600 }}>
//                 {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
//                 <input
//                   name={field}
//                   type={field.includes("password") ? "password" : "text"}
//                   value={formData[field as keyof typeof formData]}
//                   onChange={handleChange}
//                   placeholder={`Enter your ${field}`}
//                   required
//                   autoComplete={field === "confirmPassword" ? "new-password" : "off"}
//                   style={{
//                     width: "100%",
//                     padding: 14,
//                     marginTop: 7,
//                     borderRadius: 6,
//                     border: `1.6px solid ${darkMode ? "#475569" : "#cbd5e1"}`,
//                     backgroundColor: darkMode ? "#334155" : "#fff",
//                     color: darkMode ? "#e0e7ff" : "#111827",
//                     fontSize: 16,
//                     boxSizing: "border-box"
//                   }}
//                 />
//               </label>
//             ))}

//             <button
//               type="submit"
//               disabled={false}
//               style={{
//                 width: "100%",
//                 padding: 14,
//                 backgroundColor: darkMode ? "#fbbf24" : "#2563eb",
//                 color: darkMode ? "#1e293b" : "#fff",
//                 fontWeight: "bold",
//                 fontSize: "1.1rem",
//                 border: "none",
//                 borderRadius: 8,
//                 cursor: "pointer",
//                 marginTop: 4
//               }}
//             >
//               Sign Up
//             </button>
//           </form>

//           <p style={{
//             marginTop: 20,
//             color: darkMode ? "#94a3b8" : "#475569",
//             fontSize: "0.9rem",
//             textAlign: "center"
//           }}>
//             Already have an account?{" "}
//             <span onClick={() => window.location.href = "/login"} style={{
//               cursor: "pointer",
//               color: darkMode ? "#facc15" : "#2563eb",
//               textDecoration: "underline"
//             }}>
//               Log in
//             </span>
//           </p>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default SignupPage;
