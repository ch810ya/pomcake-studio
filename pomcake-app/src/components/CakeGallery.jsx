import React from 'react';
import './CakeGallery.css';

// Static placeholder data – you can replace image URLs later
const cakeCategories = [
    {
        title: 'Limited Edition',
        description: 'Classic Pomisu, Pistachio Pomisu, Ubi Cilembu',
        image: '/cakes/sample.jpg',
    },
    {
        title: 'All Time Favourites',
        description: 'Four Choco, Cookies n Cream, Matcha Strawberry, Passionfruit',
        image: '/cakes/sample.jpg',
    },
    {
        title: 'Basque Burnt Cheese',
        description: 'Original, Strawberry, Passionfruit',
        image: '/cakes/sample.jpg',
    },
    {
        title: 'Bento Cake',
        description: 'Choco, Strawberry, Passionfruit, Oreo',
        image: '/cakes/sample.jpg',
    },
];

const CakeGallery = () => (
    <section className="cake-gallery glass-card">
        <h2 className="section-title">Our Custom Cakes</h2>
        <div className="gallery-grid">
            {cakeCategories.map((cat, idx) => (
                <div key={idx} className="gallery-item">
                    <img src={cat.image} alt={cat.title} className="gallery-img" />
                    <div className="overlay">
                        <h3>{cat.title}</h3>
                        <p>{cat.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default CakeGallery;
