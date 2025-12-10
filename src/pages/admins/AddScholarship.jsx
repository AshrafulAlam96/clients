const AddScholarship = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Scholarship</h1>

      <form className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow border">

        <input type="text" placeholder="Scholarship Name" className="input input-bordered w-full" />
        <input type="text" placeholder="University" className="input input-bordered w-full" />
        <input type="text" placeholder="Country" className="input input-bordered w-full" />

        <select className="select select-bordered w-full">
          <option>Category</option>
          <option>Merit-Based</option>
          <option>Government</option>
        </select>

        <select className="select select-bordered w-full">
          <option>Degree</option>
          <option>Bachelor</option>
          <option>Masters</option>
          <option>PhD</option>
        </select>

        <input type="number" placeholder="Fees" className="input input-bordered w-full" />
        <input type="date" placeholder="Deadline" className="input input-bordered w-full" />

        <textarea placeholder="Description" className="textarea textarea-bordered md:col-span-2"></textarea>

        <button className="btn btn-primary md:col-span-2">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
