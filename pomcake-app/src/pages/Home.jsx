import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../services/db';
import './Home.css';

const Home = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getBlogs();
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

    return (
        <div className="home-page">
            <header className="home-header">
                <div className="container">
                    <h1>Pomcake Studio</h1>
                    <p>Handcrafted Cakes & Sweets</p>
                </div>
            </header>

            <main className="container home-content">
                <section className="hero-section glass-card">
                    <h2>🍰 Flavour of the Month</h2>
                    <div className="flavour-highlight">
                        <h3>Pistachio Pomisu</h3>
                        <p>Our signature tiramisu with a nutty pistachio twist. Creamy, dreamy, and delicious.</p>
                    </div>
                </section>

                <section className="blog-section">
                    <h2>Latest News</h2>
                    <div className="blog-grid">
                        {blogs.length > 0 ? (
                            blogs.map(blog => (
                                <article key={blog.id} className="blog-card glass-card">
                                    <h3>{blog.title}</h3>
                                    <div className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</div>
                                    <div className="blog-excerpt" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 150) + '...' }} />
                                </article>
                            ))
                        ) : (
                            <p>No updates yet. Stay tuned!</p>
                        )}
                    </div>
                </section>
            </main>

            <footer className="home-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Pomcake Studio</p>
                    <Link to="/login" className="admin-link">Admin Login</Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
