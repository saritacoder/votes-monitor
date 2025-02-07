import { useState } from "react";
import MonitorList from "./components/MonitorList";
import VoteForm from "./components/VoteForm";
import Modal from "./components/Modal";
import { VoteProvider } from "./context/VoteContext";

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <VoteProvider>
      <div className="App">
        <MonitorList openModal={() => setModalOpen(true)} />
        {isModalOpen && (
          <Modal closeModal={() => setModalOpen(false)}>
            <VoteForm closeModal={() => setModalOpen(false)} />
          </Modal>
        )}
      </div>
    </VoteProvider>
  );
};

export default App;
