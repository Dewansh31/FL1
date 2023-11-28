import React , { useRef } from "react";
import Layout from "./../components/Layout/Layout";
// import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import emailjs from '@emailjs/browser';
import "../styles/Contact.css";
import { toast } from "react-hot-toast";
import { useTranslation } from 'react-i18next';
const Contact = () => {
  const form = useRef();
  const { t } = useTranslation();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rcjdn39', 'template_vpjo9wi', form.current, 'A03lDvvoTStlqxznW')
      .then((result) => {
          console.log(result.text);
          // console.log("message send successfull")
          toast.success('Message sent successfully!');
      }, (error) => {
          console.log(error.text);
      });
  };
  
  return (
    <Layout title={t("Contact us")}>
      <div className="container1">
        <div className="contact-box1">
          {/* <div className="left1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59519.88127291401!2d81.24172080385154!3d21.192453735699925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a29231ae815e213%3A0xbf7f1c7892db4907!2sDurg%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1690995007759!5m2!1sen!2sin"
              width="450"
              height="520"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}
          <div className="right1">
            <h2>{t('Contact Us')}</h2>
            <form ref={form} onSubmit={sendEmail}>
            <input type="text" className="field" placeholder={t("Your Name")} name="user_name"/>
            <input type="text" className="field" placeholder={t("Your Email")} name="user_email"  />
            <input type="text" className="field" placeholder={t("Phone")} name="user_phone" />
            <textarea
              placeholder={t("Message")}
              className="field"
              name="message" 
            />
            <button className="btn1" type="submit" value="Send">{t('Send')}</button>
            </form>
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;