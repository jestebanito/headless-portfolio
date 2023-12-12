import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import copyIcon from '../assets/copy.svg';
import aos from 'aos';
import 'aos/dist/aos.css';

const Post = ( {restBase, featuredImage} ) => {
    const { slug } = useParams();
    const restPath = restBase + `posts/?slug=${slug}&acf_format=standard&_embed`;
    const connectPath = restBase + 'pages/15';

    const [restData, setData] = useState([])
    const [connectData, setConnectData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false)
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            const response_connect = await fetch(connectPath);
            if ( response.ok && response_connect.ok ) {
                const data = await response.json()
                const connectData = await response_connect.json();
                setData(data[0])
                setConnectData(connectData);
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
            if (videoRef.current) {
                // Reset the video when restData changes (e.g., navigating to a new post)
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                videoRef.current.load(); // Load the new video
                videoRef.current.play(); // Start playing the new video
            }
        }
        fetchData()
    }, [restPath, connectPath])

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };

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

    // Initializes aos dependency 
    useEffect(() => {
        aos.init();
    }, []);
        
    return (
        <>
        { isLoaded ? (
            <>
            <article className="single-post" id={`post-${restData.id}`} data-aos="fade-up" data-aos-duration="1000">
                <h2>{restData.title.rendered}</h2>
                {/* <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure> */}
                <video className="featured-video" ref={videoRef} autoPlay loop>
                <source src={restData.acf.project_snippets} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}} data-aos="fade-up" data-aos-duration="1000"></div>
                <div className="single-button-container" data-aos="fade-up" data-aos-duration="1000">
                    <button className="live-site">
                        <a href={restData.acf.live_site_button.url} target="_blank" rel="noopener noreferrer">
                            {restData.acf.live_site_button.title}
                        </a>
                    </button>
                    <button className="github-repo">
                        <a href={restData.acf.github_repo_button.url} target="_blank" rel="noopener noreferrer">
                            {restData.acf.github_repo_button.title}
                        </a>
                    </button>
                </div>
                <h2 className="tool-stack-title" data-aos="fade-up" data-aos-duration="1000">Tools Used</h2>
                    <div className="tool-stack" data-aos="fade-up" data-aos-duration="1000">
                        {restData.acf.tools.map((tool, index) =>
                        <div key={index}>
                            <img src={tool.tool_icons.url} alt={tool.tool_icons.alt}></img>
                            <p>{tool.tool_title}</p>
                        </div>
                        )}
                    </div>
                <h3 data-aos="fade-up" data-aos-duration="1000">More Projects:</h3>
                <nav className="posts-navigation" data-aos="fade-up" data-aos-duration="1000">
                    {restData.previous_post['id'] &&
                        <Link to={`/work/${restData.previous_post['slug']}`} onClick={scrollToTop} className="prev-post">{restData.previous_post['title']}</Link>
                    }
                    {restData.next_post['id'] &&
                        <Link to={`/work/${restData.next_post['slug']}`} onClick={scrollToTop} className="next-post">{restData.next_post['title']}</Link>
                    }    
                </nav>
            </article>

            {connectData && (
                <section id='connect-post'>
                    <h2 data-aos="fade-up" data-aos-duration="1000">Like what you see?</h2>
                    <div className="entry-content" data-aos="fade-up" data-aos-duration="1000">
                        <article>
                            <p>{connectData.acf.connect_short_text}</p>
                            <h3>{connectData.acf.get_in_touch}</h3>
                            <div className="email-container">
                                <p>{connectData.acf.connect_email}</p>
                                <img 
                                    src={copyIcon} 
                                    alt="Copy Icon"
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
            </>
        ) : (
            <Loading />
        )}
        </>   
    )
}

export default Post
