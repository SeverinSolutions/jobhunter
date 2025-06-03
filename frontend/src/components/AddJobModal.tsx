import { useState } from "react";


interface AddJobModalProps {
  onClose: () => void;
  onAdd: (job: {
    title: string;
    company: string;
    location: string;
    url: string;
  }) => void;
}

const AddJobModal = ({ onClose, onAdd }: AddJobModalProps) => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!title || !company) return;
    onAdd({ title, company, location, url });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Job</h2>

        <div className="space-y-3">
          <input
            className="addjobmodal-input"
            placeholder="Job Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            className="addjobmodal-input"
            placeholder="Company"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
          <input
            className="addjobmodal-input"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <input
            className="addjobmodal-input"
            placeholder="Job URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-300"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJobModal;
