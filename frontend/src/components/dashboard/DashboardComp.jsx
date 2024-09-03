/* eslint-disable react/prop-types */

const DashboardComp = ({ users }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* ROW */}
            <tr>
              {/* Email */}
              <td className="w-1/3 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{users.email}</div>
                  </div>
                </div>
              </td>
              {/* Role */}
              <td className="w-1/6 ">
                <span className="badge badge-ghost badge-sm">{users.role}</span>
              </td>
              {/* Edit */}
              <td className="w-1/6 ">
                <button className="border px-4 py-1 rounded-lg hover:bg-blue-300">
                  Edit
                </button>
              </td>
              <td>
                <button className="border px-2 py-1 rounded-lg hover:bg-red-400">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardComp;
