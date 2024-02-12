import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Loading from './Loading';
import Drumkit from './Drumkit';
import copyIcon from '../assets/copy.svg';
import downIcon from '../assets/down.svg';
import aos from 'aos';
import 'aos/dist/aos.css';

const Home = ({ restBase, featuredImage }) => {
    const homePath = restBase + 'pages/17?acf_format=standard&_embed';
    const worksPath = restBase + 'pages/21?acf_format=standard&_embed';
    const postsPath = restBase + 'posts?_embed?acf_format=standard&_embed';
    const aboutPath = restBase + 'pages/12?acf_format=standard&_embed';
    const connectPath = restBase + 'pages/15?acf_format=standard&_embed';

    const [homeData, setHomeData] = useState([]);
    const [worksData, setWorksData] = useState([]);
    const [postsData, setPostsData] = useState([])
    const [aboutData, setAboutData] = useState([]);
    const [connectData, setConnectData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response_home = await fetch(homePath);
            const response_works = await fetch(worksPath);
            const response_posts = await fetch(postsPath);
            const response_about = await fetch(aboutPath);
            const response_connect = await fetch(connectPath);
            if (response_home.ok && response_works.ok && response_about.ok && response_connect.ok && response_posts.ok) {
                const homeData = await response_home.json();
                const worksData = await response_works.json();
                const postsData = await response_posts.json();
                const aboutData = await response_about.json();
                const connectData = await response_connect.json();
                setHomeData(homeData);
                setWorksData(worksData);
                setPostsData(postsData)
                setAboutData(aboutData);
                setConnectData(connectData);
                setLoadStatus(true);
            } else {
                setLoadStatus(false)
            }
        };
        fetchData();
        // Sets loading status to true after all data is fetched
    }, [homePath, worksPath, postsPath, aboutPath, connectPath]);

    // Initializes aos dependency 
    useEffect(() => {
        aos.init();
    }, []);
      
    // Function to copy email  
    const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = async () => {
    const emailText = connectData.acf.connect_email;
    try {
        await navigator.clipboard.writeText(emailText);
        setIsCopied(true);
  
        // Reset the copied state after a short delay
        setTimeout(() => {
          setIsCopied(false);
        }, 700);
      } catch (error) {
        console.error('Failed to copy text: ', error);
      }
    };

    const handleScroll = (sectionId, offset) => {
        const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', top: offset || 0, block: 'start',
            inline: 'start'});
          } 
    };
    
    return (
        <>
        {isLoaded ? (
            <div>
                {homeData && (
                    <section id='home'>
                    <h1>Josh Esteban</h1>          
                        <article className="intro-container">
                            <h3 className="typewriter">{homeData.acf.developer}</h3>
                            <h3 className="designer">{homeData.acf.designer}</h3>
                        </article>
                        <button className="down-arrow">
                        <img 
                            src={downIcon} 
                            alt="Skip to content"
                            onClick={() => handleScroll('work', 50)} 
                        />
                        </button>
                </section>
                )}
    
                {worksData && (
                    <section id='work'>
                    <h2 data-aos="fade-up" data-aos-duration="1000" className="my-work" id="my-work">My Work</h2>
                    <div className="entry-content">
                        {postsData.map(post => 
                        <article key={post.id} id={`post-${post.id}`} data-aos="fade-up" data-aos-duration="1000">
                            <h3>{post.title.rendered}</h3>
                            <Link to={`/work/${post.slug}`}>
                            {/* {post.featured_media !== 0 && post._embedded &&
                                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
                            } */}
                            <video className="featured-video" autoPlay playsInline muted loop>
                                <source src={post.acf.project_snippets} type="video/mp4" />
                            Your browser does not support the video tag.
                            </video>
                            </Link>
                            <div dangerouslySetInnerHTML={{__html:post.acf.react_drum_kit_overview}}></div>
                            <div  dangerouslySetInnerHTML={{__html:post.acf.fitness_website_overview}}></div>
                            <div  dangerouslySetInnerHTML={{__html:post.acf.javascript_game_overview}}></div>
                            <div  dangerouslySetInnerHTML={{__html:post.acf.movie_database_overview}}></div>
                            <Link to={`/work/${post.slug}`}><div dangerouslySetInnerHTML={{__html:post.acf.single_page_button}}></div></Link>
                        </article>
                        )}
                    </div>
                </section>
                )}

                {aboutData && (
                <section id='about'>
                    <h2 data-aos="fade-up" data-aos-duration="1000">About Me</h2>
                    {aboutData.featured_media !== 0 && aboutData._embedded &&
                        <figure className="featured-image"
                        dangerouslySetInnerHTML={featuredImage
                        (aboutData._embedded['wp:featuredmedia'][0])}
                        data-aos="fade-up" data-aos-duration="1000">
                        </figure>
                    }
                    <div className="entry-content">
                        <article className="about-article" data-aos="fade-up" data-aos-duration="1000">
                            <div className='about-intro' dangerouslySetInnerHTML={{ __html:aboutData.acf.about_me_intro}}></div>
                        </article>
                        <div data-aos="fade-up" data-aos-duration="1000">
                            <Drumkit />
                        </div>
                        <h2 className="dev-stack-title" data-aos="fade-up" data-aos-duration="1000">Development Stack</h2>
                        <div className="dev-stack" data-aos="fade-up" data-aos-duration="1000">
                            {aboutData.acf.development_stack.map((dev, index) => (
                            <div key={index}>
                                <img src={dev.dev_icons.url} alt={dev.dev_icons.alt}></img>
                                <p>{dev.dev_title}</p>
                            </div>
                            ))}
                        </div>
                        <h2 className="design-stack-title" data-aos="fade-up" data-aos-duration="1000">Design Stack</h2>
                        <div className="design-stack" data-aos="fade-up" data-aos-duration="1000">
                            {aboutData.acf.design_stack.map((design, index) => (
                            <div key={index}>
                                <img src={design.design_icons.url} alt={design.design_icons.alt}></img>
                                <p>{design.design_title}</p>
                            </div>
                            ))}
                        </div>
                        <h2 className="currently-learning-title" data-aos="fade-up" data-aos-duration="1000">Currently Learning</h2>
                        <div className="currently-learning" data-aos="fade-up" data-aos-duration="1000">
                            {aboutData.acf.currently_learning.map((learning, index) => (
                            <div key={index}>
                                <img src={learning.learning_icons.url} alt={learning.learning_icons.alt}></img>
                                <p>{learning.learning_title}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                )}

                {connectData && (
                <section id='connect'>
                    <h2 data-aos="fade-up" data-aos-duration="1000">Like what you see?</h2>
                    <div className="entry-content" data-aos="fade-up" data-aos-duration="1000">
                        <article>
                            <p className="short-text">{connectData.acf.connect_short_text}</p>
                            <h3>{connectData.acf.get_in_touch}</h3>
                            <div className="email-container">
                                <p>{connectData.acf.connect_email}</p>
                                <img 
                                    src={copyIcon} 
                                    alt="Copy"
                                    onClick={handleCopyClick} 
                                />
                                {/* {isCopied && <span>Copied!</span>} */}
                            </div>
                            <div className="social-container">
                                <div className="linked-in" dangerouslySetInnerHTML={{ __html:connectData.acf.linkedin_icon}}></div>
                                <div className="git-hub" dangerouslySetInnerHTML={{ __html:connectData.acf.github_icon}}></div>
                            </div>
                        </article>
                    </div>
                </section>
                )}
                <footer>
                    <p className="copyright">&copy; 2024 Handcrafted by Josh Esteban</p>
                </footer>
            </div>
        ) : (
            <Loading />
        )}
        </>
    );
};

export default Home;
