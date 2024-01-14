//css
import '../../css/Site.css';
import '../../css/Animations.css';

//components
import Navbar from '../Layouts/Navbar';

function Home() {
  return(   
    <nav className='navigation-bar'>
			<Navbar />
		</nav>  
  );
};

export default Home;