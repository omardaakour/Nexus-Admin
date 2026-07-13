function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1
          className="
          text-2xl
          font-bold
          text-gray-900
          dark:text-white
        "
        >
          Profile
        </h1>

        <p
          className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
        >
          Manage your personal information.
        </p>
      </div>

      <div
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
        <div className="flex items-center gap-5">
          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-indigo-100
              dark:bg-indigo-950
              text-2xl
              font-bold
              text-indigo-600
              dark:text-indigo-400
            "
          >
            O
          </div>

          <div>
            <h2
              className="
              text-xl
              font-semibold
              text-gray-900
              dark:text-white
            "
            >
              Omar Daakour
            </h2>

            <p
              className="
              text-gray-500
              dark:text-gray-400
            "
            >
              Administrator
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p
              className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
            >
              Email
            </p>

            <p
              className="
              font-medium
              text-gray-900
              dark:text-white
            "
            >
              admin@nexus.com
            </p>
          </div>

          <div>
            <p
              className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
            >
              Department
            </p>

            <p
              className="
              font-medium
              text-gray-900
              dark:text-white
            "
            >
              Engineering
            </p>
          </div>

          <div>
            <p
              className="
              text-sm
              text-gray-500
              dark:text-gray-400
            "
            >
              Role
            </p>

            <p
              className="
              font-medium
              text-gray-900
              dark:text-white
            "
            >
              Admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
