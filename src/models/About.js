import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
    heading : string,
    summary : string
},{timestamps : true})

const About = mongoose.models.About || mongoose.model('About', AboutSchema)

export default About;