import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
function Settings() {
  const [notifications, setNotifications] = useState(true);

  function handleSave() {
    alert("Settings saved successfully!");
  }
  const { darkMode, setDarkMode } = useTheme();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {" "}
          Manage your account and application preferences.
        </p>
      </div>

      {/* Account */}

      <section
        className="
    rounded-xl
    border
    bg-white
    dark:bg-gray-900
    dark:border-gray-800
    p-6
    shadow-sm
  "
      >
        {" "}
        <h2
          className="
  mb-5
  text-lg
  font-semibold
  text-gray-900
  dark:text-white
"
        >
          Account Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>

            <input
              value="Omar"
              readOnly
              className="
  mt-1
  w-full
  rounded-lg
  border
  bg-white
  px-3
  py-2
  text-gray-900
  dark:border-gray-700
  dark:bg-gray-800
  dark:text-white
"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>

            <input
              value="admin@nexus.com"
              readOnly
              className="
  mt-1
  w-full
  rounded-lg
  border
  bg-white
  px-3
  py-2
  text-gray-900
  dark:border-gray-700
  dark:bg-gray-800
  dark:text-white
"
            />
          </div>
        </div>
      </section>

      {/* Preferences */}

      <section
        className="
    rounded-xl
    border
    bg-white
    dark:bg-gray-900
    dark:border-gray-800
    p-6
    shadow-sm
  "
      >
        {" "}
        <h2
          className="
  mb-5
  text-lg
  font-semibold
  text-gray-900
  dark:text-white
"
        >
          Preferences
        </h2>
        <div className="space-y-4">
          {/* Notifications */}

          <div
            className="
           flex
items-center
justify-between
rounded-lg
border
p-4
dark:border-gray-800
          "
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Email Notifications
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {" "}
                Receive updates and alerts.
              </p>
            </div>

            <button
              onClick={() => setNotifications(!notifications)}
              className={`
                relative
                h-6
                w-11
                rounded-full
                transition
                ${notifications ? "bg-indigo-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  h-4
                  w-4
                  rounded-full
                  bg-white
                  transition
                  ${notifications ? "left-6" : "left-1"}
                `}
              />
            </button>
          </div>

          {/* Dark Mode */}

          <div
            className="
            flex
items-center
justify-between
rounded-lg
border
p-4
dark:border-gray-800
          "
          >
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Dark Mode
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                {" "}
                Change application appearance.
              </p>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`
    relative
    h-6
    w-11
    rounded-full
    transition

    ${darkMode ? "bg-indigo-600" : "bg-gray-300"}
  `}
            >
              <span
                className={`
                  absolute
                  top-1
                  h-4
                  w-4
                  rounded-full
                  bg-white
                  transition
                  ${darkMode ? "left-6" : "left-1"}
                `}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Save */}

      <button
        onClick={handleSave}
        className="
          rounded-lg
          bg-indigo-600
          px-5
          py-2.5
          text-sm
          font-medium
          text-white
          transition
          hover:bg-indigo-700
        "
      >
        Save Changes
      </button>
    </div>
  );
}

export default Settings;
