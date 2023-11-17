import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import copyIcon from '../assets/copy.svg';

const Post = ( {restBase, featuredImage} ) => {
    const { slug } = useParams();
    const restPath = restBase + `posts/?slug=${slug}&_embed`
    const connectPath = restBase + 'pages/15';

    const [restData, setData] = useState([])
    const [connectData, setConnectData] = useState([]);
    const [isLoaded, setLoadStatus] = useState(false)

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
        
    return (
        <>
        { isLoaded ? (
            <>
            <article className="single-post" id={`post-${restData.id}`}>
                <h2>{restData.title.rendered}</h2>
                <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                <div className="entry-content" dangerouslySetInnerHTML={{__html:restData.content.rendered}}></div>
                <div className="single-button-container">
                    <div className="live-site" dangerouslySetInnerHTML={{__html:restData.acf.live_site_button}}></div>
                    <div className="github-repo" dangerouslySetInnerHTML={{__html:restData.acf.github_repo_button}}></div>
                </div>
                <h3>More Projects</h3>
                <nav className="posts-navigation">
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
                    <h2>Like what you see?</h2>
                    <div className="entry-content" data-aos="fade-left">
                        <article>
                            <p>{connectData.acf.connect_short_text}</p>
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
                                <div dangerouslySetInnerHTML={{ __html:connectData.acf.linkedin_icon}}></div>
                                <div dangerouslySetInnerHTML={{ __html:connectData.acf.github_icon}}></div>
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
