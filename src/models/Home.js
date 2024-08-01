import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
    heading : string,
    summary : string
},{timestamps : true})

const Home = mongoose.models.Home || mongoose.model('Home', HomeSchema)

export default Home;