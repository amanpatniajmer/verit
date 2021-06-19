import React from "react";
import aman from '../../img/aman.jpg';
import shreyash from '../../img/shreyash.jpg'

const About = () => {
  return (
    <div className = "about text-center">
      <p className = 'about-info'>
        <span style = {{ fontStyle: 'italic'}}>Verit</span> was build to simplify the process of verifying the documents of students for placements and internships. This is an elegant way to keep track of all your achievements be it in extra-curriculars or academics.
      </p>
      <p className = 'credits-info'>Credits</p>
        <div 
            style = {{ display: 'flex', placeItems: "center", margin: "10px 10px 15px 10px"}}
        >
          <div className = "about-main">
              <img src = {aman} alt = "Aman-logo"/>
              <h3>Aman Jain</h3>
              <h4><span style = {{ fontStyle: 'italic'}}>(Backend Developer)</span></h4>
              <h4>Roll No - 17075001</h4>
              <h4>Department - Engineering Physics</h4>
              <h4>ID - aman.jain.phy17@iitbhu.ac.in</h4>
          </div>
          <div className = "about-main">
              <img src = {shreyash} alt = "Shreyash-logo"/>
              <h3>Shreyash Baijal</h3>
              <h4><span style = {{ fontStyle: 'italic'}}>(Frontend Developer)</span></h4>
              <h4>Roll No - 17035047</h4>
              <h4>Department - Ceramic Engineering</h4>
              <h4>ID - shreyash.baijal.cer17@iitbhu.ac.in</h4>
          </div>
      </div>
      <p className = "about-instruction">Any suggestions to improve the site are heartily welcomed.</p>
    </div>
  );
};

export default About;
