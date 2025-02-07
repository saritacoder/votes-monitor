import { useState } from "react";
import { useVoteContext } from "../context/VoteContext";

const VoteForm = ({ closeModal }) => {
  const { addVote } = useVoteContext();
  const [name, setName] = useState("");
  const [monitor, setMonitor] = useState("Suresh");

  const handleSubmit = (e) => {
    e.preventDefault();
    addVote(monitor, name);
    setName("");
    closeModal();
  };

  return (
    <div className="vote-form">
      <h2>Add Vote</h2>
      <label>Student Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      
      <label>Class Monitor:</label>
      <select value={monitor} onChange={(e) => setMonitor(e.target.value)}>
        <option>Suresh</option>
        <option>Deepank</option>
        <option>Abhik</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={closeModal}>X</button>
    </div>
  );
};

export default VoteForm;
