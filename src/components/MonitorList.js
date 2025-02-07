import { useVoteContext } from "../context/VoteContext";

const MonitorList = ({ openModal }) => {
  const { monitors, removeVote } = useVoteContext();

  return (
    <div className="monitor-list">
      <h1>Class Monitor Votes</h1>
      <h2>Total Votes: {monitors.reduce((acc, m) => acc + m.votes, 0)}</h2>
      <h2>fghjkkkkkkkkkkk</h2>
      <button onClick={openModal}>Add New Vote</button>
      
      {monitors.map((monitor) => (
        <div key={monitor.name} className="monitor">
          <h3>{monitor.name}</h3>
          <p>Total: {monitor.votes}</p>
          {monitor.voters.map((voter, index) => (
            <p key={index}>
              {index + 1}. {voter}
              <button onClick={() => removeVote(monitor.name, voter)}>Delete</button>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonitorList;
