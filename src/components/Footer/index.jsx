import { useState } from "react";
import { footerLogo } from "../../constants/assets";

import styles from "./footer.module.css";
import Button from "../Button";
import useLoadingData from "../../hooks/useLoadingData";

function Footer() {
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData("footer");

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });

  const socialLinks = [
    {
      name: "linkedin",
      src: "/assets/socialIcons/linkedin.svg",
      href: content?.footer_section1_linkedin?.text,
    },
    {
      name: "facebook",
      src: "/assets/socialIcons/facebook.svg",
      href: content?.footer_section1_facebook?.text,
    },
    {
      name: "instagram",
      src: "/assets/socialIcons/instagram.svg",
      href: content?.footer_section1_instagram?.text,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData)) {
      setMessage({
        message: "Invalid email.",
        color: "red",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/Forms/subscribe-newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData,
        }),
      });

      if (response.ok) {
        setMessage({ message: "Subscribed to news letter!", color: "green" });
        setFormData(null);
      } else {
        setMessage({
          message:
            "Failed to subscribe to news letter. Please try again later.",
          color: "red",
        });
      }
    } catch (error) {
      setMessage({
        message: "Failed to subscribe to news letter. Please try again later.",
        color: "red",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer>
      <div className={styles.logoBox}>
        <img src={footerLogo} alt="cts-logo" width={200} height="auto" />
      </div>
      <div className={styles.upperSection}>
        <div className={styles.footerTxt}>
          <h1>{content?.footer_section1_title.text}</h1>
          <p>{content?.footer_section1_subtitle.text}</p>
          <div className={styles.socialLinks}>
            {socialLinks.map((elem, i) => (
              <a key={i} href={elem.href}>
                <img src={elem.src} alt={elem.name + "-icon"} />
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.newsletter}>
          <div>
            <input
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
            />
            {message && (
              <p style={{ color: message.color }}>{message.message}</p>
            )}
          </div>
          <Button
            onClick={handleSubmit}
            id={3}
            disabled={loading}
            defaultMargin={false}
          >
            Subscribe
          </Button>
        </form>
      </div>
      <div className={styles.separator}></div>
      <div className={styles.lowerSection}>
        <ul className={styles.sitemapLinks}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About us</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/media">Media</a>
          </li>
          <li>
            <a href="/contact">Contact us</a>
          </li>
        </ul>
        <div className={styles.copyright}>
          Copyright &copy; {new Date().getFullYear()} Creative Technoogy
          Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
