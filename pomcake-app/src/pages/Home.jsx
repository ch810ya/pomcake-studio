import React from 'react';
import { Link } from 'react-router-dom';
import Marquee from '../components/Marquee';
import './Home.css';

const Home = () => {
    const marqueeText = "DELIVERY AVAILABLE • ".repeat(10);

    const offerings = [
        {
            title: "Ready To Go Cakes",
            subtitle: "Available in store or to order",
            desc: "Don’t feel like leaving home? You can order our Ready To Go cake range in cupcake form, dessert box for yourself, or go for a whole cake in Mini, Medium or Mega size!",
            image: "/cakes/sample.jpg",
            link: "/sales?category=limited-edition"
        },
        {
            title: "Take Home Range",
            subtitle: "Available in store",
            desc: "Browse our take home range instore which include candles, diffusers, mugs and more!",
            image: "/cakes/sample.jpg",
            link: "/sales?category=all-time-favourites"
        },
        {
            title: "Made For You Range",
            subtitle: "Available to order",
            desc: "Explore our Made For You range to create a memory with us through a custom cake or catering experience!",
            image: "/cakes/sample.jpg",
            link: "/sales?type=custom"
        },
        {
            title: "Miilk Drinks",
            subtitle: "Available in store or to order",
            desc: "We offer a variety of coffees, lattes, milkshakes, teas with options such as toppings, miilk altneratives and much more!",
            image: "/cakes/sample.jpg",
            link: "/sales?category=basque-burnt-cheese"
        },
        {
            title: "Cookies",
            subtitle: "Available in store or to order",
            desc: "Variety of cookies from bite sized almond to pineapple tarts are made with our homemade recipes, and can come filled with a chewy mochi centre.",
            image: "/cakes/sample.jpg",
            link: "/sales?category=cookies"
        },
        {
            title: "Soft Serve Collection",
            subtitle: "Available in store",
            desc: "Soft serves are a creamy and cold spin on our signature Miilk teas, topped with the sauces, fruits and cakes of your dreams!",
            image: "/cakes/sample.jpg",
            link: "/sales?category=bento-cakes"
        }
    ];

    return (
        <div className="home-page">
            {/* Header / Nav Placeholder (Assuming AppRouter handles layout, but adding structure here for completeness if needed) */}

            {/* Hero Section */}
            <section className="hero-section">
                <img src="/cakes/sample.jpg" alt="Hero Cake" className="hero-image" />
            </section>

            {/* Marquee */}
            <Marquee text={marqueeText} />

            {/* Offerings Grid */}
            <section className="offerings-section container">
                <h2 className="section-title">Our Offerings</h2>
                <div className="offerings-grid">
                    {offerings.map((item, index) => (
                        <Link to={item.link} key={index} className="offering-card">
                            <div className="offering-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="offering-content">
                                <h3>{item.title}</h3>
                                <span className="subtitle">{item.subtitle}</span>
                                <p>{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Instagram / Social Placeholder */}
            <section className="social-section">
                <h6>@Pomcake_Studio</h6>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="container footer-grid">
                    <div className="footer-col">
                        <h4>General Enquiry</h4>
                        <a href="mailto:info@pomcakestudio.com">info@pomcakestudio.com</a>
                    </div>
                    <div className="footer-col">
                        <h4>Order (Custom & Corporate)</h4>
                        <a href="mailto:order@pomcakestudio.com">order@pomcakestudio.com</a>
                    </div>
                    <div className="footer-col">
                        <h4>Hiring</h4>
                        <a href="mailto:hr@pomcakestudio.com">hr@pomcakestudio.com</a>
                    </div>
                </div>
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} by Pomcake Studio</p>
                    <Link to="/login" className="admin-link-footer">Admin</Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
