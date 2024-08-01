import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
    heading : String,
    summary : String,
},
{timestamps : true}
);

const About = mongoose.models.About || mongoose.model('About', AboutSchema)

export default About;