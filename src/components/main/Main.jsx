import EmailRegistration from './emailRegistration/EmailRegistration';
import Forecast from './forecast/Forecast';

function Main() {
  return (
    <main className="bg-light min-vh-100 pb-5 d-flex flex-column justify-content-center align-items-center gap-3">
      <Forecast />
      <EmailRegistration />
    </main>
  );
}

export default Main;
