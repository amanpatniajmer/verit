import React, { useEffect } from "react";
import aman from '../../img/aman.jpg';
import shreyash from '../../img/shreyash.jpg'

const About = ({setActive}) => {

  useEffect(() => {
    setActive("About");
    //eslint-disable-next-line
  }, []);

  return (
    <div className = "about text-center">
      <p className = 'about-info'>
        <span>Verit</span> was build to simplify the process of verifying the documents of students for placements and internships. This is an elegant way to keep track of all your achievements be it in extra-curriculars or academics.
      </p>
      <h1>Credits</h1>
        <div className = "credits">
          <div className = "credit-main">
              <img src = {aman} alt = "Aman-logo"/>
              <h3>Aman Jain</h3>
              <h4><span>(Fullstack Developer)</span></h4>
              <h4>17173004</h4>
              <h4>Engineering Physics</h4>
              <h4>aman.jain.phy17@itbhu.ac.in</h4>
          </div>
          <div className = "credit-main">
              <img src = {shreyash} alt = "Shreyash-logo"/>
              <h3>Shreyash Baijal</h3>
              <h4><span>(Frontend Developer)</span></h4>
              <h4>17035047</h4>
              <h4>Ceramic Engineering</h4>
              <h4>shreyash.baijal.cer17@iitbhu.ac.in</h4>
          </div>
      </div>
      <p className = "about-instruction">Any suggestions to improve the site are heartily welcomed.</p>
    </div>
  );
};

export default About;
