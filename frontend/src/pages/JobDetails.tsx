import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  recruiter: {
    name: string;
    email: string;
    phone: string;
  };
  status: string;
  notes: string[];
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    url: "https://example.com/job/1",
    description: "",
    recruiter: { name: "", email: "", phone: "" },
    status: "Saved",
    notes: [],
  },
  {
    id: 2,
    title: "Fullstack Engineer",
    company: "InnovateX",
    location: "Stockholm",
    url: "https://example.com/job/2",
    description: "",
    recruiter: { name: "", email: "", phone: "" },
    status: "Saved",
    notes: [],
  },
];

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const jobId = Number(id);
  const job = mockJobs.find((j) => j.id === jobId);

  const [description, setDescription] = useState(job?.description || "");
  const [status, setStatus] = useState(job?.status || "Saved");
  const [recruiter, setRecruiter] = useState(
    job?.recruiter || { name: "", email: "", phone: "" }
  );
  const [notes, setNotes] = useState<string[]>(job?.notes || []);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes((prev) => [...prev, `${new Date().toLocaleString()}: ${newNote}`]);
    setNewNote("");
  };

  if (!job) {
    return (
      <div className="p-6">
        <p className="text-red-500">Job not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline mt-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">{job.title}</h1>
      <p className="text-gray-600">
        {job.company} — {job.location}
      </p>
      <a href={job.url} target="_blank" className="text-blue-600 underline">
        View original job posting
      </a>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <select
          className="w-full border rounded p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Saved</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Job Description</label>
        <textarea
          rows={6}
          className="w-full border rounded p-2"
          placeholder="Paste job description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Recruiter Name</label>
          <input
            className="w-full border p-2 rounded"
            value={recruiter.name}
            onChange={(e) =>
              setRecruiter({ ...recruiter, name: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            className="w-full border p-2 rounded"
            value={recruiter.email}
            onChange={(e) =>
              setRecruiter({ ...recruiter, email: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            className="w-full border p-2 rounded"
            value={recruiter.phone}
            onChange={(e) =>
              setRecruiter({ ...recruiter, phone: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-2">Notes</h2>
        <ul className="mb-2 space-y-1 text-sm">
          {notes.map((note, i) => (
            <li key={i} className="text-gray-700">
              • {note}
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <button
            onClick={addNote}
            className="px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
