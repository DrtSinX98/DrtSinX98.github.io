import React from "react";

function Bio() {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "G'morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "G'afternoon";
  } else if (hours >= 17 && hours < 21) {
    timeOfDay = "G'evening";
  } else {
    timeOfDay = "G'night";
  }
  return (
    <div>
      <div className="greet">
        <h1>
          <span className="pink">{timeOfDay},</span> I'm Pritish Joshi
        </h1>
      </div>
      <p className="lead">A Tech enthusiast, Researcher, Educator and Coder</p>
      <p className="lead">
        Even though I enjoy coding and techie stuff, I'm currently a researcher in 
        Computational Materials Design at <span className="pink">TCG CREST</span>. 
        I've done my postgraduation in Chemistry, specializing 
        in Computational Chemistry and molecular dynamics 
        from <span className="pink">IIT Dhanbad</span>.
      </p>
      <style>
        {`
          h1 {
            font-size: 50px;
            font-weight: bold;
          }

          .lead {
            font-size: 24px;
            line-height: 1.5;
          }

          .pink {
            color: var(--secondary-color);
          }

          @media (max-width: 767px) {
            .greet {
              text-align: center;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Bio;
