import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlogs, addBlog, updateBlog, deleteBlog } from '../../services/db';
import { auth } from '../../services/firebase';
import './BlogManager.css';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        slug: ''
    });

    const fetchBlogs = async () => {
        const data = await getBlogs();
        setBlogs(data);
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleEdit = (blog) => {
        setCurrentBlog(blog);
        setFormData({
            title: blog.title,
            content: blog.content,
            slug: blog.slug
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentBlog(null);
        setFormData({ title: '', content: '', slug: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this post?')) {
            await deleteBlog(id);
            fetchBlogs();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = {
            ...formData,
            authorEmail: auth.currentUser?.email
        };

        if (currentBlog) {
            await updateBlog(currentBlog.id, blogData);
        } else {
            await addBlog(blogData);
        }

        handleCancel();
        fetchBlogs();
    };

    return (
        <div className="blog-manager">
            <h1>Blog Manager</h1>

            {!isEditing ? (
                <div className="blog-list-view">
                    <button onClick={() => setIsEditing(true)} className="btn-primary mb-4">
                        ✍️ Write New Post
                    </button>

                    <div className="blog-list">
                        {blogs.map(blog => (
                            <div key={blog.id} className="blog-item glass-card">
                                <h3>{blog.title}</h3>
                                <div className="blog-meta">
                                    <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                                    <span>By {blog.authorEmail}</span>
                                </div>
                                <div className="blog-actions">
                                    <button onClick={() => handleEdit(blog)} className="btn-small">Edit</button>
                                    <button onClick={() => handleDelete(blog.id)} className="btn-small btn-danger">Delete</button>
                                </div>
                            </div>
                        ))}
                        {blogs.length === 0 && <p>No blog posts yet.</p>}
                    </div>
                </div>
            ) : (
                <div className="blog-editor glass-card">
                    <h2>{currentBlog ? 'Edit Post' : 'New Post'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug (URL)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="my-new-post"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={(content) => setFormData({ ...formData, content })}
                            />
                        </div>
                        <div className="form-actions">
                            <button type="button" onClick={handleCancel} className="btn-secondary">Cancel</button>
                            <button type="submit" className="btn-primary">Save Post</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default BlogManager;
