// "use client"
// import React, { useState, useEffect } from "react";
// import {
//   QrCode,
//   Shield,
//   Download,
//   Trash2,
//   Monitor,
//   AlertTriangle,
//   Eye,
//   EyeOff,
//   Copy,
//   Check,
// } from "lucide-react";

// // Enhanced Settings Page with Advanced Features
// const EnhancedSettingsPage = () => {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [notificationPrefs, setNotificationPrefs] = useState({});
//   const [privacySettings, setPrivacySettings] = useState({});
//   const [activeSessions, setActiveSessions] = useState([]);
//   const [securityEvents, setSecurityEvents] = useState([]);
//   const [twoFactorSetup, setTwoFactorSetup] = useState({
//     enabled: false,
//     qrCode: "",
//     secret: "",
//     backupCodes: [],
//   });
//   const [showBackupCodes, setShowBackupCodes] = useState(false);
//   const [copied, setCopied] = useState("");

//   // Load enhanced settings data
//   useEffect(() => {
//     if (activeTab === "notifications") {
//       fetchNotificationPreferences();
//     } else if (activeTab === "privacy") {
//       fetchPrivacySettings();
//     } else if (activeTab === "security") {
//       fetchSecurityData();
//     }
//   }, [activeTab]);

//   const fetchNotificationPreferences = async () => {
//     try {
//       const response = await fetch("/api/settings/notifications");
//       if (response.ok) {
//         const data = await response.json();
//         setNotificationPrefs(data.preferences);
//       }
//     } catch (error) {
//       console.error("Failed to fetch notification preferences:", error);
//     }
//   };

//   const fetchPrivacySettings = async () => {
//     try {
//       const response = await fetch("/api/settings/privacy");
//       if (response.ok) {
//         const data = await response.json();
//         setPrivacySettings(data.settings);
//       }
//     } catch (error) {
//       console.error("Failed to fetch privacy settings:", error);
//     }
//   };

//   const fetchSecurityData = async () => {
//     try {
//       const [sessionsResponse, eventsResponse] = await Promise.all([
//         fetch("/api/settings/sessions"),
//         fetch("/api/settings/security-log"),
//       ]);

//       if (sessionsResponse.ok) {
//         const sessionsData = await sessionsResponse.json();
//         setActiveSessions(sessionsData.sessions);
//       }

//       if (eventsResponse.ok) {
//         const eventsData = await eventsResponse.json();
//         setSecurityEvents(eventsData.events);
//       }
//     } catch (error) {
//       console.error("Failed to fetch security data:", error);
//     }
//   };

//   const updateNotificationPreferences = async (newPrefs) => {
//     try {
//       const response = await fetch("/api/settings/notifications", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newPrefs),
//       });

//       if (response.ok) {
//         setNotificationPrefs(newPrefs);
//         // Show success message
//       }
//     } catch (error) {
//       console.error("Failed to update notification preferences:", error);
//     }
//   };

//   const updatePrivacySettings = async (newSettings) => {
//     try {
//       const response = await fetch("/api/settings/privacy", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSettings),
//       });

//       if (response.ok) {
//         setPrivacySettings(newSettings);
//         // Show success message
//       }
//     } catch (error) {
//       console.error("Failed to update privacy settings:", error);
//     }
//   };

//   const setup2FA = async () => {
//     try {
//       const response = await fetch("/api/settings/two-factor", {
//         method: "POST",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setTwoFactorSetup({
//           enabled: false,
//           qrCode: data.qrCode,
//           secret: data.secret,
//           backupCodes: data.backupCodes,
//         });
//       }
//     } catch (error) {
//       console.error("Failed to setup 2FA:", error);
//     }
//   };

//   const exportUserData = async () => {
//     try {
//       const response = await fetch("/api/settings/data-export", {
//         method: "POST",
//       });

//       if (response.ok) {
//         const data = await response.json();
//         const blob = new Blob([JSON.stringify(data.data, null, 2)], {
//           type: "application/json",
//         });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = data.filename;
//         a.click();
//         URL.revokeObjectURL(url);
//       }
//     } catch (error) {
//       console.error("Failed to export data:", error);
//     }
//   };

//   const copyToClipboard = async (text, type) => {
//     await navigator.clipboard.writeText(text);
//     setCopied(type);
//     setTimeout(() => setCopied(""), 2000);
//   };

//   const tabs = [
//     { id: "profile", label: "Profile", icon: "User" },
//     { id: "security", label: "Security", icon: "Shield" },
//     { id: "notifications", label: "Notifications", icon: "Bell" },
//     { id: "privacy", label: "Privacy", icon: "Eye" },
//     { id: "sessions", label: "Sessions", icon: "Monitor" },
//     { id: "data", label: "Data & Privacy", icon: "Download" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="bg-white shadow-sm rounded-lg">
//           {/* Header */}
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
//           </div>

//           <div className="flex">
//             {/* Sidebar */}
//             <div className="w-64 bg-gray-50 border-r border-gray-200">
//               <nav className="py-4">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center px-6 py-3 text-left text-sm font-medium transition-colors ${
//                       activeTab === tab.id
//                         ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
//                         : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             {/* Content */}
//             <div className="flex-1 p-6">
//               {/* Enhanced Notifications Tab */}
//               {activeTab === "notifications" && (
//                 <div className="space-y-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Notification Preferences
//                   </h2>

//                   <div className="space-y-6">
//                     {/* Email Notifications */}
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <h3 className="text-md font-medium text-gray-900 mb-4">
//                         Email Notifications
//                       </h3>
//                       <div className="space-y-4">
//                         {[
//                           {
//                             key: "emailNotifications",
//                             label: "General Email Notifications",
//                             desc: "Receive important updates via email",
//                           },
//                           {
//                             key: "chapterUpdates",
//                             label: "Chapter Updates",
//                             desc: "News and updates from your chapter",
//                           },
//                           {
//                             key: "eventReminders",
//                             label: "Event Reminders",
//                             desc: "Reminders for upcoming events",
//                           },
//                           {
//                             key: "securityAlerts",
//                             label: "Security Alerts",
//                             desc: "Important security notifications",
//                           },
//                           {
//                             key: "mentionNotifications",
//                             label: "Mentions & Replies",
//                             desc: "When someone mentions or replies to you",
//                           },
//                           {
//                             key: "newsletterSubscription",
//                             label: "Newsletter",
//                             desc: "Monthly newsletter and announcements",
//                           },
//                         ].map((setting) => (
//                           <div
//                             key={setting.key}
//                             className="flex items-center justify-between"
//                           >
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-900">
//                                 {setting.label}
//                               </h4>
//                               <p className="text-sm text-gray-500">
//                                 {setting.desc}
//                               </p>
//                             </div>
//                             <label className="relative inline-flex items-center cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 className="sr-only peer"
//                                 checked={
//                                   notificationPrefs[setting.key] || false
//                                 }
//                                 onChange={(e) => {
//                                   const newPrefs = {
//                                     ...notificationPrefs,
//                                     [setting.key]: e.target.checked,
//                                   };
//                                   updateNotificationPreferences(newPrefs);
//                                 }}
//                               />
//                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Digest Frequency */}
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <h3 className="text-md font-medium text-gray-900 mb-4">
//                         Email Digest Frequency
//                       </h3>
//                       <select
//                         value={notificationPrefs.digestFrequency || "weekly"}
//                         onChange={(e) => {
//                           const newPrefs = {
//                             ...notificationPrefs,
//                             digestFrequency: e.target.value,
//                           };
//                           updateNotificationPreferences(newPrefs);
//                         }}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                       >
//                         <option value="daily">Daily</option>
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                         <option value="never">Never</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Enhanced Privacy Tab */}
//               {activeTab === "privacy" && (
//                 <div className="space-y-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Privacy Settings
//                   </h2>

//                   <div className="space-y-6">
//                     {/* Profile Visibility */}
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <h3 className="text-md font-medium text-gray-900 mb-4">
//                         Profile Visibility
//                       </h3>
//                       <div className="space-y-3">
//                         {[
//                           {
//                             value: "public",
//                             label: "Public",
//                             desc: "Anyone can see your profile",
//                           },
//                           {
//                             value: "members",
//                             label: "Members Only",
//                             desc: "Only registered members can see your profile",
//                           },
//                           {
//                             value: "chapter",
//                             label: "Chapter Only",
//                             desc: "Only members of your chapter can see your profile",
//                           },
//                           {
//                             value: "private",
//                             label: "Private",
//                             desc: "Only you can see your profile",
//                           },
//                         ].map((option) => (
//                           <label
//                             key={option.value}
//                             className="flex items-center space-x-3 cursor-pointer"
//                           >
//                             <input
//                               type="radio"
//                               name="profileVisibility"
//                               value={option.value}
//                               checked={
//                                 privacySettings.profileVisibility ===
//                                 option.value
//                               }
//                               onChange={(e) => {
//                                 const newSettings = {
//                                   ...privacySettings,
//                                   profileVisibility: e.target.value,
//                                 };
//                                 updatePrivacySettings(newSettings);
//                               }}
//                               className="text-blue-600 focus:ring-blue-500"
//                             />
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {option.label}
//                               </p>
//                               <p className="text-sm text-gray-500">
//                                 {option.desc}
//                               </p>
//                             </div>
//                           </label>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Privacy Controls */}
//                     <div className="bg-gray-50 rounded-lg p-6">
//                       <h3 className="text-md font-medium text-gray-900 mb-4">
//                         Privacy Controls
//                       </h3>
//                       <div className="space-y-4">
//                         {[
//                           {
//                             key: "showContactInfo",
//                             label: "Show Contact Information",
//                             desc: "Allow others to see your email and phone",
//                           },
//                           {
//                             key: "showActivityStatus",
//                             label: "Show Activity Status",
//                             desc: "Show when you were last active",
//                           },
//                           {
//                             key: "allowDirectMessages",
//                             label: "Allow Direct Messages",
//                             desc: "Let other members send you direct messages",
//                           },
//                           {
//                             key: "showOnlineStatus",
//                             label: "Show Online Status",
//                             desc: "Show when you are currently online",
//                           },
//                           {
//                             key: "indexInSearchEngines",
//                             label: "Search Engine Indexing",
//                             desc: "Allow search engines to index your profile",
//                           },
//                         ].map((setting) => (
//                           <div
//                             key={setting.key}
//                             className="flex items-center justify-between"
//                           >
//                             <div>
//                               <h4 className="text-sm font-medium text-gray-900">
//                                 {setting.label}
//                               </h4>
//                               <p className="text-sm text-gray-500">
//                                 {setting.desc}
//                               </p>
//                             </div>
//                             <label className="relative inline-flex items-center cursor-pointer">
//                               <input
//                                 type="checkbox"
//                                 className="sr-only peer"
//                                 checked={privacySettings[setting.key] || false}
//                                 onChange={(e) => {
//                                   const newSettings = {
//                                     ...privacySettings,
//                                     [setting.key]: e.target.checked,
//                                   };
//                                   updatePrivacySettings(newSettings);
//                                 }}
//                               />
//                               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Data Consent */}
//                     <div className="bg-blue-50 rounded-lg p-6">
//                       <h3 className="text-md font-medium text-gray-900 mb-4">
//                         Data Processing Consent
//                       </h3>
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <h4 className="text-sm font-medium text-gray-900">
//                               Data Processing
//                             </h4>
//                             <p className="text-sm text-gray-500">
//                               Consent to process your data for platform
//                               functionality
//                             </p>
//                           </div>
//                           <span className="text-sm font-medium text-green-600">
//                             Required
//                           </span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <div>
//                             <h4 className="text-sm font-medium text-gray-900">
//                               Marketing Communications
//                             </h4>
//                             <p className="text-sm text-gray-500">
//                               Receive marketing emails and promotional content
//                             </p>
//                           </div>
//                           <label className="relative inline-flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               className="sr-only peer"
//                               checked={
//                                 privacySettings.marketingConsent || false
//                               }
//                               onChange={(e) => {
//                                 const newSettings = {
//                                   ...privacySettings,
//                                   marketingConsent: e.target.checked,
//                                 };
//                                 updatePrivacySettings(newSettings);
//                               }}
//                             />
//                             <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Enhanced Security Tab */}
//               {activeTab === "security" && (
//                 <div className="space-y-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Security Settings
//                   </h2>

//                   {/* Two-Factor Authentication */}
//                   <div className="bg-green-50 rounded-lg p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <h3 className="text-md font-medium text-gray-900">
//                           Two-Factor Authentication
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           Add an extra layer of security to your account
//                         </p>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           twoFactorSetup.enabled
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {twoFactorSetup.enabled ? "Enabled" : "Disabled"}
//                       </span>
//                     </div>

//                     {!twoFactorSetup.enabled && !twoFactorSetup.qrCode && (
//                       <button
//                         onClick={setup2FA}
//                         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
//                       >
//                         <Shield className="w-4 h-4 mr-2" />
//                         Enable 2FA
//                       </button>
//                     )}

//                     {twoFactorSetup.qrCode && !twoFactorSetup.enabled && (
//                       <div className="space-y-4">
//                         <div className="text-center">
//                           <h4 className="text-sm font-medium text-gray-900 mb-2">
//                             Scan QR Code
//                           </h4>
//                           <img
//                             src={twoFactorSetup.qrCode}
//                             alt="2FA QR Code"
//                             className="mx-auto w-48 h-48 border rounded-lg"
//                           />
//                           <p className="text-xs text-gray-500 mt-2">
//                             Scan with Google Authenticator or similar app
//                           </p>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Manual Entry Key
//                           </label>
//                           <div className="flex items-center space-x-2">
//                             <input
//                               type="text"
//                               value={twoFactorSetup.secret}
//                               readOnly
//                               className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm font-mono"
//                             />
//                             <button
//                               onClick={() =>
//                                 copyToClipboard(twoFactorSetup.secret, "secret")
//                               }
//                               className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                             >
//                               {copied === "secret" ? (
//                                 <Check className="w-4 h-4" />
//                               ) : (
//                                 <Copy className="w-4 h-4" />
//                               )}
//                             </button>
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Verification Code
//                           </label>
//                           <input
//                             type="text"
//                             placeholder="Enter 6-digit code"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                           />
//                         </div>

//                         <button className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
//                           Verify and Enable 2FA
//                         </button>
//                       </div>
//                     )}

//                     {twoFactorSetup.enabled && (
//                       <div className="space-y-4">
//                         <div className="flex items-center justify-between">
//                           <span className="text-sm font-medium text-gray-900">
//                             2FA is enabled for your account
//                           </span>
//                           <button className="text-sm text-red-600 hover:text-red-500">
//                             Disable 2FA
//                           </button>
//                         </div>

//                         <button
//                           onClick={() => setShowBackupCodes(!showBackupCodes)}
//                           className="text-sm text-blue-600 hover:text-blue-500"
//                         >
//                           {showBackupCodes ? "Hide" : "Show"} Backup Codes
//                         </button>

//                         {showBackupCodes && (
//                           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                             <h4 className="text-sm font-medium text-gray-900 mb-2">
//                               Backup Codes
//                             </h4>
//                             <p className="text-xs text-gray-600 mb-3">
//                               Store these codes safely. You can use them to
//                               access your account if you lose your authenticator
//                               device.
//                             </p>
//                             <div className="grid grid-cols-2 gap-2">
//                               {twoFactorSetup.backupCodes.map((code, index) => (
//                                 <div
//                                   key={index}
//                                   className="flex items-center justify-between bg-white px-3 py-2 rounded border text-sm font-mono"
//                                 >
//                                   <span>{code}</span>
//                                   <button
//                                     onClick={() =>
//                                       copyToClipboard(code, `code-${index}`)
//                                     }
//                                     className="text-gray-400 hover:text-gray-600"
//                                   >
//                                     {copied === `code-${index}` ? (
//                                       <Check className="w-3 h-3" />
//                                     ) : (
//                                       <Copy className="w-3 h-3" />
//                                     )}
//                                   </button>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>

//                   {/* Security Events */}
//                   <div className="bg-gray-50 rounded-lg p-6">
//                     <h3 className="text-md font-medium text-gray-900 mb-4">
//                       Recent Security Events
//                     </h3>
//                     <div className="space-y-3">
//                       {securityEvents.map((event) => (
//                         <div
//                           key={event.id}
//                           className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div
//                               className={`w-2 h-2 rounded-full ${
//                                 event.success ? "bg-green-500" : "bg-red-500"
//                               }`}
//                             ></div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">
//                                 {event.description}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {event.location} • {event.ipAddress} •{" "}
//                                 {new Date(event.timestamp).toLocaleString()}
//                               </p>
//                             </div>
//                           </div>
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               event.success
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {event.success ? "Success" : "Failed"}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Sessions Tab */}
//               {activeTab === "sessions" && (
//                 <div className="space-y-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Active Sessions
//                   </h2>

//                   <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                     <div className="flex items-center">
//                       <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
//                       <p className="text-sm text-yellow-800">
//                         If you see any unfamiliar sessions, revoke them
//                         immediately and change your password.
//                       </p>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     {activeSessions.map((session) => (
//                       <div
//                         key={session.id}
//                         className="bg-white border border-gray-200 rounded-lg p-6"
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-4">
//                             <div className="flex-shrink-0">
//                               <Monitor className="w-8 h-8 text-gray-400" />
//                             </div>
//                             <div>
//                               <h3 className="text-sm font-medium text-gray-900 flex items-center">
//                                 {session.device}
//                                 {session.current && (
//                                   <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
//                                     Current Session
//                                   </span>
//                                 )}
//                               </h3>
//                               <p className="text-sm text-gray-600">
//                                 {session.location}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 Last active:{" "}
//                                 {new Date(session.lastActive).toLocaleString()}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 IP: {session.ipAddress}
//                               </p>
//                             </div>
//                           </div>

//                           {!session.current && (
//                             <button className="px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
//                               Revoke
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <button className="w-full py-2 px-4 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
//                     Revoke All Other Sessions
//                   </button>
//                 </div>
//               )}

//               {/* Data & Privacy Tab */}
//               {activeTab === "data" && (
//                 <div className="space-y-6">
//                   <h2 className="text-lg font-medium text-gray-900">
//                     Data & Privacy
//                   </h2>

//                   {/* Data Export */}
//                   <div className="bg-blue-50 rounded-lg p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <h3 className="text-md font-medium text-gray-900">
//                           Export Your Data
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           Download a copy of all your data
//                         </p>
//                       </div>
//                       <Download className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">
//                       This will include your profile information, chapter
//                       membership, activity history, and settings.
//                     </p>
//                     <button
//                       onClick={exportUserData}
//                       className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Export Data
//                     </button>
//                   </div>

//                   {/* Account Deletion */}
//                   <div className="bg-red-50 border border-red-200 rounded-lg p-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <h3 className="text-md font-medium text-gray-900">
//                           Delete Account
//                         </h3>
//                         <p className="text-sm text-gray-600">
//                           Permanently delete your account and all data
//                         </p>
//                       </div>
//                       <Trash2 className="w-6 h-6 text-red-600" />
//                     </div>
//                     <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-4">
//                       <div className="flex items-start">
//                         <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
//                         <div>
//                           <h4 className="text-sm font-medium text-red-800">
//                             This action cannot be undone
//                           </h4>
//                           <p className="text-sm text-red-700 mt-1">
//                             Deleting your account will:
//                           </p>
//                           <ul className="text-sm text-red-700 mt-2 list-disc list-inside">
//                             <li>Remove all your personal data</li>
//                             <li>Cancel any active memberships</li>
//                             <li>Delete your activity history</li>
//                             <li>Remove you from all chapters</li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                     <button className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
//                       <Trash2 className="w-4 h-4 mr-2" />
//                       Delete Account
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedSettingsPage;
import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page