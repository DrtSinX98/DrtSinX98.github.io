import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    heading : String,
    summary : String,
},
{timestamps : true}
);

const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema)

export default Contact;