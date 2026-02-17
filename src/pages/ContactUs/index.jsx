import { smallRightArrow } from "../../constants/assets";
import styles from "./contactus.module.css";
import FadeUpEffect from "../../components/FadeUpEffect";
import Button from "../../components/Button";
import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useLoadingData from "../../hooks/useLoadingData";
import LoadingScreen from "../../components/LoadingScreen";

function ContactUs() {
  const [content, isMediaLoading, setIsMediaLoading] =
    useLoadingData("contact-us");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    schoolOrCompanyName: "",
    contactNumber: "",
    services: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", color: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const response = await fetch(`/api/Forms/send-contact-form`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage({ message: "Email sent successfully!", color: "green" });
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            schoolOrCompanyName: "",
            contactNumber: "",
            services: "",
            message: "",
          });
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData.message);

          setMessage({
            message: "Failed to send message. Please try again later.",
            color: "red",
          });
        }
      } catch (error) {
        setMessage({
          message: "Failed to send message. Please try again later.",
          color: "red",
        });
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Validation failed.", errors);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Invalid Email Address.";
    }
    if (!formData.schoolOrCompanyName.trim())
      newErrors.schoolOrCompanyName = "School or Company Name is required.";
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact Number is required.";
    } else if (!/^\d{7,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid Contact Number.";
    }
    if (!formData.services.trim())
      newErrors.services = "Please select a service.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <section className={styles.firstSection}>
        <video
          key={content?.contactus_section1_video.text}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className={styles.heroBackground}
          onCanPlayThrough={() => setIsMediaLoading(false)}
        >
          <source
            src={content?.contactus_section1_video.text}
            type="video/mp4"
          />
        </video>
        <div className={styles.sectionContent}>
          <div>
            <FadeUpEffect tag="p" className={styles.mainSubTitle}>
              {content?.contactus_section1_title.text}
            </FadeUpEffect>
          </div>
        </div>
      </section>

      <section className={styles.secondSection}>
        <FadeUpEffect tag="h2">
          {content?.contactus_section2_title.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.contactus_section2_subtitle.text}
        </FadeUpEffect>
        {message && <p style={{ color: message.color }}>{message.message}</p>}

        <form>
          <FadeUpEffect tag="div" className={styles.secondSectionInputs}>
            <div>
              <TextField
                required
                type="text"
                name="firstName"
                label="First Name"
                variant="standard"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                required
                type="email"
                name="email"
                label="Email Address"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                required
                type="text"
                name="schoolOrCompanyName"
                label="School / Company Name"
                variant="standard"
                value={formData.schoolOrCompanyName}
                onChange={handleChange}
                error={!!errors.schoolOrCompanyName}
                helperText={errors.schoolOrCompanyName}
              />
            </div>
            <div>
              <TextField
                required
                type="text"
                name="lastName"
                label="Last Name"
                variant="standard"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                required
                type="tel"
                name="contactNumber"
                label="Contact Number"
                variant="standard"
                value={formData.contactNumber}
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
              />
              <TextField
                required
                name="services"
                select
                label="Services"
                variant="standard"
                value={formData.services}
                onChange={handleChange}
                error={!!errors.services}
                helperText={errors.services}
              >
                <MenuItem value="Training & Implementation">
                  Training & Implementation
                </MenuItem>
                <MenuItem value="Data Visualization and Analysis">
                  Data Visualization and Analysis
                </MenuItem>
                <MenuItem value="Operational Support and Helpdesk Agents">
                  Operational Support and Helpdesk Agents
                </MenuItem>
              </TextField>
            </div>
          </FadeUpEffect>
          <FadeUpEffect tag="div">
            <TextField
              required
              name="message"
              type="text"
              label="Message"
              multiline
              rows={6}
              variant="standard"
              fullWidth
              value={formData.message}
              onChange={handleChange}
              error={!!errors.message}
              helperText={errors.message}
            />
          </FadeUpEffect>
          <FadeUpEffect tag="div" className={styles.learnMoreBtn}>
            <Button
              onClick={handleSubmit}
              id={3}
              img={smallRightArrow}
              disabled={loading}
            >
              Send Message
            </Button>
          </FadeUpEffect>
        </form>
      </section>

      <section className={styles.thirdSection}>
        <div className={styles.contactContainer}>
          <div>
            <FadeUpEffect tag="p" className={styles.title}>
              {content?.contactus_section3_title1.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p" className={styles.value}>
              {content?.contactus_section3_subtitle1.text}
            </FadeUpEffect>
          </div>
          <div>
            <FadeUpEffect tag="p" className={styles.title}>
              {content?.contactus_section3_title2.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p" className={styles.value}>
              {content?.contactus_section3_subtitle2.text}
            </FadeUpEffect>
          </div>
          <div>
            <FadeUpEffect tag="p" className={styles.title}>
              {content?.contactus_section3_title3.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p" className={styles.value}>
              {content?.contactus_section3_subtitle3.text}
            </FadeUpEffect>
          </div>
        </div>
        <div className={styles.mapsContainer}>
          <iframe
            src={content?.contactus_section3_map.text}
            width="100%"
            height="100%"
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
