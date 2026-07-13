import { useEffect, useState } from "react";
import { X } from "lucide-react";

function EditUserModal({ user, onClose, onSave }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  if (!user) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div
      className="
    fixed
    inset-0
    z-50
    flex
    items-center
    justify-center
    overflow-y-auto
    bg-black/50
    p-4
  "
    >
      <div
        className="
      my-8
      w-full
      max-w-xl
      rounded-xl
      bg-white
      p-5
      shadow-xl
      sm:p-6
    "
      >
        {" "}
        {/* Header */}
        <div
          className="
          mb-6
          flex
          items-center
          justify-between
        "
        >
          <h2
            className="
            text-xl
            font-semibold
            text-gray-900
          "
          >
            Edit User
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-lg
              p-2
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-900
            "
          >
            <X size={20} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="max-h-[70vh] space-y-4 overflow-y-auto pr-2"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {" "}
            <Input
              label="First Name"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
            />
            <Input
              label="Last Name"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            />
            <Input
              label="Department"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            <Input
              label="Salary"
              name="salary"
              value={form.salary}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <Input
              label="City"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-200
              "
            >
              <option value={true}>Active</option>

              <option value={false}>Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="
              mt-4
              rounded-lg
              bg-indigo-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-indigo-700
              active:scale-95
            "
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <div>
      <label
        className="
        mb-1
        block
        text-sm
        font-medium
        text-gray-700
      "
      >
        {label}
      </label>

      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          px-3
          py-2
          text-sm
          outline-none
          transition
          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-200
        "
      />
    </div>
  );
}

export default EditUserModal;
