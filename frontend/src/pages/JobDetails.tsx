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
  skills: string[];
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
    skills: [],
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
    skills: [],
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

  const [skills, setSkills] = useState<string[]>(job?.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedNote, setEditedNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const timestamp = new Date().toLocaleString("sv-SE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setNotes((prev) => [...prev, `${timestamp} - ${newNote}`]);
    setNewNote("");
  };

  const addSkill = () => {
    if (!newSkill.trim()) return;
    setSkills((prev) => [...prev, newSkill.trim()]);
    setNewSkill("");
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

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const updateNote = () => {
    if (editIndex === null || !editedNote.trim()) return;

    console.log("A:", editedNote);
    const updated = [...notes];
    console.log("B1:", updated)
    const [timestamp] = updated[editIndex].split(" - ", 2);
    console.log("B:", updated[editIndex].split(" - ", 2));

    updated[editIndex] = `${timestamp.trim()} - ${editedNote.trim()}`;
    console.log("C:", updated[editIndex]);
    setNotes(updated);
    setEditIndex(null);
    setEditedNote("");
  };

  const removeNote = (index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

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

      <div>
        <h2 className="font-semibold mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="flex items-center bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(i)}
                className="ml-2 text-gray-500 hover:text-red-500 focus:outline-none"
                aria-label={`Remove ${skill}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/** Skill Section */}
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Add a skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <button
            onClick={addSkill}
            className="px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </div>

      {/** Recruiter Section */}
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

      {/** Note Section */}
      <div>
        <h2 className="font-semibold mb-2">Notes</h2>
        <ul className="mb-2 space-y-1 text-sm">
          {notes.map((note, i) => (
            <li
              key={i}
              className="flex items-center justify-between text-gray-700 bg-gray-100 p-2 rounded"
            >
              {editIndex === i ? (
                <input
                  className="flex-1 border p-1 rounded mr-2"
                  value={editedNote}
                  onChange={(e) => setEditedNote(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") updateNote();
                  }}
                />
              ) : (
                <span
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    setEditIndex(i);
                    setEditedNote(note.split("-")[1]?.trim() || "");
                  }}
                >
                  {note}
                </span>
              )}

              <div className="flex gap-1 items-center ml-2">
                {editIndex === i && (
                  <button
                    onClick={updateNote}
                    className="text-green-600 hover:text-green-800 px-2"
                  >
                    ✔
                  </button>
                )}
                <button
                  onClick={() => removeNote(i)}
                  className="text-red-600 hover:text-red-800 px-2"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2"
            placeholder="Add a note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addNote();
              }
            }}
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
