// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const VoteContext = createContext();
// const API_URL = "https://crudcrud.com/api/YOUR_CRUDCRUD_ID/votes";

// export const VoteProvider = ({ children }) => {
//   const [monitors, setMonitors] = useState([
//     { name: "Suresh", votes: 0, voters: [] },
//     { name: "Deepank", votes: 0, voters: [] },
//     { name: "Abhik", votes: 0, voters: [] },
//   ]);

//   useEffect(() => {
//     axios.get(API_URL)
//       .then(response => setMonitors(response.data))
//       .catch(error => console.error("Error fetching votes:", error));
//   }, []);

//   const addVote = (monitorName, voterName) => {
//     setMonitors((prev) =>
//       prev.map((m) =>
//         m.name === monitorName ? { ...m, votes: m.votes + 1, voters: [...m.voters, voterName] } : m
//       )
//     );

//     axios.post(API_URL, { monitorName, voterName })
//       .catch(error => console.error("Error saving vote:", error));
//   };

//   const removeVote = (monitorName, voterName) => {
//     setMonitors((prev) =>
//       prev.map((m) =>
//         m.name === monitorName ? { ...m, votes: m.votes - 1, voters: m.voters.filter(v => v !== voterName) } : m
//       )
//     );

//     axios.get(API_URL).then((response) => {
//       const entry = response.data.find(v => v.monitorName === monitorName && v.voterName === voterName);
//       if (entry) axios.delete(`${API_URL}/${entry._id}`);
//     }).catch(error => console.error("Error deleting vote:", error));
//   };

//   return (
//     <VoteContext.Provider value={{ monitors, addVote, removeVote }}>
//       {children}
//     </VoteContext.Provider>
//   );
// };

// export const useVoteContext = () => useContext(VoteContext);




import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const VoteContext = createContext();
const API_URL = "https://crudcrud.com/api/b914dfa32df847d6ae7114deae3a96d2/votes";

export const VoteProvider = ({ children }) => {
  const [monitors, setMonitors] = useState([
    { name: "Suresh", votes: 0, voters: [] },
    { name: "Deepank", votes: 0, voters: [] },
    { name: "Abhik", votes: 0, voters: [] },
  ]);

  // Fetch votes from API and update state
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        const voteData = response.data;
        const updatedMonitors = monitors.map((monitor) => {
          const monitorVotes = voteData.filter(vote => vote.monitorName === monitor.name);
          return { ...monitor, votes: monitorVotes.length, voters: monitorVotes.map(v => v.voterName) };
        });
        setMonitors(updatedMonitors);
      })
      .catch(error => console.error("Error fetching votes:", error));
  }, []);

  // Add a vote
  const addVote = (monitorName, voterName) => {
    axios.post(API_URL, { monitorName, voterName })
      .then(() => {
        setMonitors((prev) =>
          prev.map((m) =>
            m.name === monitorName
              ? { ...m, votes: m.votes + 1, voters: [...m.voters, voterName] }
              : m
          )
        );
      })
      .catch(error => console.error("Error saving vote:", error));
  };

  // Remove a vote
  const removeVote = (monitorName, voterName) => {
    axios.get(API_URL)
      .then((response) => {
        const entry = response.data.find(v => v.monitorName === monitorName && v.voterName === voterName);
        if (entry) {
          axios.delete(`${API_URL}/${entry._id}`)
            .then(() => {
              setMonitors((prev) =>
                prev.map((m) =>
                  m.name === monitorName
                    ? { ...m, votes: m.votes - 1, voters: m.voters.filter(v => v !== voterName) }
                    : m
                )
              );
            })
            .catch(error => console.error("Error deleting vote:", error));
        }
      })
      .catch(error => console.error("Error fetching votes for deletion:", error));
  };

  return (
    <VoteContext.Provider value={{ monitors, addVote, removeVote }}>
      {children}
    </VoteContext.Provider>
  );
};

export const useVoteContext = () => useContext(VoteContext);
