import { useState } from "react";
import AddJobModal from "../components/AddJobModal";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  dateSaved: string;
}

const SavedJobs = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      dateSaved: "2025-05-30",
    },
    {
      id: 2,
      title: "Fullstack Engineer",
      company: "InnovateX",
      location: "Stockholm",
      dateSaved: "2025-05-31",
    },
  ]);

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company} ${job.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="flex-1 px-4 py-2 border rounded shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          Add Job
        </button>
      </div>

      <ul className="space-y-4">
        {filteredJobs.length === 0 ? (
          <li className="text-gray-500">No saved jobs match your search.</li>
        ) : (
          filteredJobs.map((job) => (
            <li
              key={job.id}
              className="p-4 bg-white rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-gray-600">
                  {job.company} — {job.location}
                </p>
                <p className="text-xs text-gray-400">
                  Saved on {job.dateSaved}
                </p>
              </div>
              <button
                className="text-red-500 hover:underline text-sm"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>

      {showModal && (
        <AddJobModal
          onClose={() => setShowModal(false)}
          onAdd={(job) => {
            const newJob = {
              id: Date.now(),
              ...job,
              dateSaved: new Date().toISOString().split("T")[0],
            };
            setJobs([newJob, ...jobs]);
          }}
        />
      )}
    </div>
  );
};

export default SavedJobs;
