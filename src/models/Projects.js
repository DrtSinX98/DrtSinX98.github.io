import mongoose from "mongoose";

const ProjectsSchema = new mongoose.Schema({
    heading : string,
    summary : string
},{timestamps : true})

const Projects = mongoose.models.Projects || mongoose.model('Projects', ProjectsSchema)

export default Projects;