import { Routes, Route, Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';
import { useEffect } from 'react'
import Home from './Home'
import Post from './Post'

import logo from "../assets/logo.svg";
import homeIcon from "../assets/navicons/home.svg";
import workIcon from "../assets/navicons/work.svg";
import aboutIcon from "../assets/navicons/about.svg";
import connectIcon from "../assets/navicons/connect.svg";

function App() {
  const restBase = 'https://je-codes.com/portfolio/wp-json/wp/v2/'

  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.width || '';
    let imgHeight = featuredImageObject.media_details.height || '';
    let imgURL = featuredImageObject.source_url;
    let srcset = `${imgURL} ${imgWidth}w`;

    if (featuredImageObject.media_details.sizes.large){
      srcset += `, ${featuredImageObject.media_details.sizes.large.source_url} 1024w`;
    }
    if (featuredImageObject.media_details.sizes.medium_large){
      srcset += `, ${featuredImageObject.media_details.sizes.medium_large.source_url} 768w`;
    }
    if (featuredImageObject.media_details.sizes.medium){
      srcset += `, ${featuredImageObject.media_details.sizes.medium.source_url} 300w`;
    }

    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${srcset}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }
  
    const scrollToTop = () => {
      window.scrollTo({top: 0, behavior: "smooth"});
    };

    const handleScroll = (sectionId, alternateSectionId) => {
      const section = document.getElementById(sectionId);
      const alternateSection = document.getElementById(alternateSectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else if (alternateSection) {
          alternateSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        document.getElementById(hash);
      } 
    }, []);

  return (
    <div>
      <a class="screen-reader-text" href="#work">Skip to Content</a>
      <header id="masthead" className="site-header">
        <nav id="site-navigation" className="site-navigation">
          <div className="logo-container">
            <Link to='/' onClick={scrollToTop}><img src={logo} alt="Portfolio logo" /></Link>
          </div>
          <div className='links-container'>
            <ul>
              <li><HashLink to='/' className='home-a' onClick={scrollToTop}><img className="home-icon" src={homeIcon} alt="Home Section Icon" />home</HashLink></li>
              <li><HashLink smooth to='/#work'><img className="work-icon" src={workIcon} alt="Work Section Icon" />work</HashLink></li>
              <li><HashLink smooth to='/#about'><img className="about-icon" src={aboutIcon} alt="About Section Icon" />about</HashLink></li>
              <li><Link onClick={() => handleScroll('connect', 'connect-post')}><img className="connect-icon" src={connectIcon} alt="Connect Section Icon" />connect</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <main id="main">
        <Routes>
          <Route path='/' element={<Home restBase={restBase} featuredImage={featuredImage} />} />
          <Route path='/work/:slug' element={<Post restBase={restBase} featuredImage={featuredImage} />} />
        </Routes>
      </main>
      <footer>
        <p className="copyright">&copy; 2023 Josh Esteban</p>
      </footer>
    </div>
  );
}

export default App