import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryGrid.css';

const categories = [
    {
        id: 'limited-edition',
        title: 'Limited Edition',
        image: '/cakes/sample.jpg',
        link: '/sales?category=limited-edition',
        tag: 'Pre-order'
    },
    {
        id: 'all-time-favourites',
        title: 'All Time Favourites',
        image: '/cakes/sample.jpg',
        link: '/sales?category=all-time-favourites',
        tag: 'Available'
    },
    {
        id: 'basque-burnt-cheese',
        title: 'Basque Burnt Cheese',
        image: '/cakes/sample.jpg',
        link: '/sales?category=basque-burnt-cheese',
        tag: 'Pre-order'
    },
    {
        id: 'bento-cakes',
        title: 'Bento Cakes',
        image: '/cakes/sample.jpg',
        link: '/sales?category=bento-cakes',
        tag: 'Available'
    },
    {
        id: 'cookies',
        title: 'Cookies & Sweets',
        image: '/cakes/sample.jpg',
        link: '/sales?category=cookies',
        tag: 'Coming Soon'
    },
    {
        id: 'custom',
        title: 'Custom Orders',
        image: '/cakes/sample.jpg',
        link: '/sales?type=custom',
        tag: 'Enquire Now'
    }
];

const CategoryGrid = () => {
    return (
        <section className="category-section">
            <div className="container">
                <h2 className="section-title">Our Offerings</h2>
                <div className="category-grid">
                    {categories.map((cat) => (
                        <Link to={cat.link} key={cat.id} className="category-card">
                            <div className="image-wrapper">
                                <img src={cat.image} alt={cat.title} />
                                {cat.tag && <span className="category-tag">{cat.tag}</span>}
                            </div>
                            <h3 className="category-title">{cat.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
