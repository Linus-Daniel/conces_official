"use client";
import React, { useState } from "react";
import {
  Settings,
  Users,
  Mail,
  Shield,
  Building,
  FileText,
  BarChart3,
  Globe,
  Bell,
  Database,
  Save,
  RefreshCw,
  Upload,
  Download,
  Trash2,
  Edit,
  Plus,
  X,
  Check,
  AlertTriangle,
  Info,
} from "lucide-react";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "CONCES",
    siteDescription:
      "Christian Organization of Nigerian Civil, Electrical and Systems Engineers",
    siteUrl: "https://conces.org",
    adminEmail: "admin@conces.org",
    timezone: "Africa/Lagos",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,

    // Email Settings
    emailService: "gmail",
    emailUser: "",
    emailPassword: "",
    emailFrom: "noreply@conces.org",
    emailFromName: "CONCES",

    // Security Settings
    sessionTimeout: 30,
    passwordMinLength: 6,
    requireEmailVerification: true,
    enableTwoFactor: false,
    loginAttempts: 5,
    lockoutDuration: 15,

    // Chapter Settings
    autoApproveChapters: false,
    maxChaptersPerRegion: 10,
    chapterCreationEnabled: true,

    // Content Settings
    autoApproveEvents: false,
    autoApproveResources: false,
    autoApproveProducts: false,
    maxFileSize: 10,
    allowedFileTypes: ["pdf", "doc", "docx", "jpg", "png"],

    // Notification Settings
    emailNotifications: true,
    newUserNotifications: true,
    eventNotifications: true,
    systemAlerts: true,
    weeklyReports: false,
  });

  const tabs = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "email",
      label: "Email Settings",
      icon: <Mail className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    {
      id: "chapters",
      label: "Chapters",
      icon: <Building className="w-4 h-4" />,
    },
    { id: "content", label: "Content", icon: <FileText className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "system", label: "System", icon: <Database className="w-4 h-4" /> },
  ];

  const handleInputChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = async (section?: string) => {
    setIsLoading(true);
    setSaveStatus("saving");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSaveStatus("success");
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(""), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Test email sent successfully!");
    } catch (error) {
      alert("Failed to send test email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      alert("Backup created successfully!");
    } catch (error) {
      alert("Backup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Site Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleInputChange("siteName", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => handleInputChange("adminEmail", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Site URL
            </label>
            <input
              type="url"
              value={settings.siteUrl}
              onChange={(e) => handleInputChange("siteUrl", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) => handleInputChange("timezone", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-royal-700 mb-2">
            Site Description
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) =>
              handleInputChange("siteDescription", e.target.value)
            }
            rows={3}
            className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Site Controls
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">Maintenance Mode</h4>
              <p className="text-sm text-royal-600">
                Put the site in maintenance mode
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  handleInputChange("maintenanceMode", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">User Registration</h4>
              <p className="text-sm text-royal-600">
                Allow new users to register
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.registrationEnabled}
                onChange={(e) =>
                  handleInputChange("registrationEnabled", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          SMTP Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email Service
            </label>
            <select
              value={settings.emailService}
              onChange={(e) =>
                handleInputChange("emailService", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="gmail">Gmail</option>
              <option value="outlook">Outlook</option>
              <option value="custom">Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              From Email
            </label>
            <input
              type="email"
              value={settings.emailFrom}
              onChange={(e) => handleInputChange("emailFrom", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              From Name
            </label>
            <input
              type="text"
              value={settings.emailFromName}
              onChange={(e) =>
                handleInputChange("emailFromName", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email User
            </label>
            <input
              type="email"
              value={settings.emailUser}
              onChange={(e) => handleInputChange("emailUser", e.target.value)}
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Email Password
            </label>
            <input
              type="password"
              value={settings.emailPassword}
              onChange={(e) =>
                handleInputChange("emailPassword", e.target.value)
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
              placeholder="Enter app password"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleTestEmail}
            disabled={isLoading}
            className="bg-conces-blue hover:bg-primary text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Send Test Email
          </button>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Authentication Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Session Timeout (minutes)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) =>
                handleInputChange("sessionTimeout", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Minimum Password Length
            </label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) =>
                handleInputChange("passwordMinLength", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Max Login Attempts
            </label>
            <input
              type="number"
              value={settings.loginAttempts}
              onChange={(e) =>
                handleInputChange("loginAttempts", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-royal-700 mb-2">
              Lockout Duration (minutes)
            </label>
            <input
              type="number"
              value={settings.lockoutDuration}
              onChange={(e) =>
                handleInputChange("lockoutDuration", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-royal-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Security Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">
                Email Verification Required
              </h4>
              <p className="text-sm text-royal-600">
                Require email verification for new accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) =>
                  handleInputChange(
                    "requireEmailVerification",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
            <div>
              <h4 className="font-medium text-royal-900">
                Two-Factor Authentication
              </h4>
              <p className="text-sm text-royal-600">
                Enable 2FA for admin accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableTwoFactor}
                onChange={(e) =>
                  handleInputChange("enableTwoFactor", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Database Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleBackup}
            disabled={isLoading}
            className="flex items-center justify-center p-4 border-2 border-conces-blue text-conces-blue rounded-lg hover:bg-conces-blue hover:text-white transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Download className="w-5 h-5 mr-2" />
            )}
            Create Backup
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors">
            <Upload className="w-5 h-5 mr-2" />
            Restore Backup
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
            <Trash2 className="w-5 h-5 mr-2" />
            Clear Cache
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          System Information
        </h3>
        <div className="bg-royal-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Server Status:</span>
              <span className="text-green-600 font-medium flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Online
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Database Status:</span>
              <span className="text-green-600 font-medium flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Connected
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Total Users:</span>
              <span className="text-royal-900 font-medium">2,847</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Active Sessions:</span>
              <span className="text-royal-900 font-medium">127</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Storage Used:</span>
              <span className="text-royal-900 font-medium">2.3 GB</span>
            </div>
            <div className="flex justify-between py-2 border-b border-royal-200">
              <span className="text-royal-600">Last Backup:</span>
              <span className="text-royal-900 font-medium">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-royal-900 mb-4">
          Danger Zone
        </h3>
        <div className="border border-red-200 rounded-lg p-6 bg-red-50">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-900 mb-2">
                Reset Application
              </h4>
              <p className="text-red-700 text-sm mb-4">
                This will reset all application settings to defaults. This
                action cannot be undone.
              </p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "email":
        return renderEmailSettings();
      case "security":
        return renderSecuritySettings();
      case "system":
        return renderSystemSettings();
      case "users":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-royal-900">
              User Management Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-royal-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-royal-900">
                    Auto-approve Students
                  </h4>
                  <p className="text-sm text-royal-600">
                    Automatically approve student registrations
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gold-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold-600"></div>
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-royal-900">
              Settings for {activeTab}
            </h3>
            <p className="text-royal-600">
              Settings content for {activeTab} will be implemented here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-royal-900">
                Admin Settings
              </h1>
              <p className="text-royal-600 mt-1">
                Manage your CONCES platform configuration
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {saveStatus && (
                <div
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                    saveStatus === "success"
                      ? "bg-green-100 text-green-800"
                      : saveStatus === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {saveStatus === "success" && <Check className="w-4 h-4" />}
                  {saveStatus === "error" && <X className="w-4 h-4" />}
                  {saveStatus === "saving" && (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  )}
                  <span className="text-sm font-medium">
                    {saveStatus === "success" && "Settings saved"}
                    {saveStatus === "error" && "Save failed"}
                    {saveStatus === "saving" && "Saving..."}
                  </span>
                </div>
              )}
              <button
                onClick={() => handleSave()}
                disabled={isLoading}
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-royal-900">Settings</h3>
              </div>
              <nav className="p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-gold-100 text-gold-800 border border-gold-200"
                        : "text-royal-700 hover:bg-royal-50"
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
