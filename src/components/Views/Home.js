//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';
import OptionChoice from '../Components/OptionChoice';

function Home() {
  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar />
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" style={{ paddingBottom: '80px' }}>
        <header className="header text-center">Hello firstName, <br /> What would you like to do?</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0">
        <div className="row justify-content-center align-items-center"> 
        
          <OptionChoice />

          <OptionChoice />

          <OptionChoice />

        </div>
      </div>

    </div>
  );
}

export default Home;