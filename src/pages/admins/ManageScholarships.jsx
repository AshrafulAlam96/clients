import { scholarshipsData } from "../../data/scholarshipsData";

const ManageScholarships = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Manage Scholarships</h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Scholarship</th>
              <th>University</th>
              <th>Category</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {scholarshipsData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.university}</td>
                <td>{item.category}</td>
                <td>{item.country}</td>

                <td className="flex gap-2">
                  <button className="btn btn-sm btn-warning">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
