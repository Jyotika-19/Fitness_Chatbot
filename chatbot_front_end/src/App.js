import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ChatContainer from './components/ChatContainer';

const App = () => {
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center p-0">
      <div className="row w-100 h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white welcome-section p-5 text-center">
          <h1 className="mb-3">Welcome to Your Fitness Journey</h1>
          <img
            src="/main_picture.png"
            alt="Fitness Journey"
            className="img-fluid my-3 welcome-image"
            style={{ maxWidth: "250px" }}
          />
          <p className="mt-3">
            Let's crush your goals together! I'm your virtual trainer.
          </p>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center px-2">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
