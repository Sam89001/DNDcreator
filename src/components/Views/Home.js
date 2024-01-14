//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';
import OptionChoice from '../Components/OptionChoice';

//images
import CreateCharacterImage from '../../images/dungeons-and-dragons.jpg'
import PlaySessionImage from '../../images/play-a-session.jpg'
import HostSessionImage from '../../images/host-a-session.jpg'

function Home() {
  return (
    <div>
      <nav className='navigation-bar'>
        <Navbar navigationTitle="Account Settings" secondNavigationTitle="Logout"/>
      </nav>

      <div className="col-12 d-flex align-items-center justify-content-center page-styling" style={{ paddingBottom: '80px' }}>
        <header className="header text-center">Hello firstName, <br /> What would you like to do?</header>
      </div>

      <div className="col-12 text-center justify-content-center align-items-center mb-0">
        <div className="row justify-content-center align-items-center"> 

          <OptionChoice title="Create a Character" imageUrl={CreateCharacterImage}/>

          <OptionChoice title="Play a Session" imageUrl={PlaySessionImage}/>

          <OptionChoice title="Host a Session" imageUrl={HostSessionImage}/>

        </div>
      </div>

    </div>
  );
}

export default Home;