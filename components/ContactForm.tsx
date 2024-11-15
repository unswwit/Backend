// @ts-nocheck comment
import React from 'react';
import emailjs from '@emailjs/browser';
import styles from '../styles/ContactUs.module.css';
import ReCAPTCHA from 'react-google-recaptcha';

const ContactForm = () => {
  const [email, setEmail] = React.useState('');

  const sendEmail = (e: any) => {
    e.preventDefault();

    // validating that the email is in the correct form
    const validate =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (validate.test(email)) {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID,
          process.env.NEXT_PUBLIC_TEMPLATE,
          e.target,
          process.env.NEXT_PUBLIC_EMAILJS_ID
        )
        .then(
          () => {
            alert(
              'Your inquiry was sent successfully. You can expect to hear a response from us within a week.'
            );
          },
          (error) => {
            alert('Your inquiry failed to send. Please try again');
          }
        );
      setEmail('');
      e.target.reset();
    } else {
      alert('Please input a valid email');
    }
  };

  return (
    <form
      method="post"
      encType="text/plain"
      onSubmit={sendEmail}
    >
      <h2>Contact Us</h2>
      <p>Fill out this form and we will get in touch with you soon</p>
      <br />

      <div className={styles.questions}>
        <p>Name</p>
        <input
          className={styles.formInput}
          type="text"
          name="name"
          placeholder="Jane Doe"
          required
        />
        <p>Email</p>
        <input
          className={styles.formInput}
          type="text"
          name="email"
          placeholder="jane.doe@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Enquiry</p>
        <textarea
          className={styles.formInput}
          name="enquiry"
          placeholder="How can we help you?"
          rows={7}
          required
        />
        <br />
      </div>

      <div className={styles.submitArea}>
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={sendEmail}
        />
        {/* TODO: add functionality to reset recaptcha check after form submission */}
        <br />
      </div>
      <div className={styles.submitArea}>
        <input type="submit" className={styles.submitButton} value="Submit" />
      </div>
    </form>
  );
};

export default ContactForm;
