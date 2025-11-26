import mongoose from "mongoose";

const url = 

"mongodb+srv://ruasilvabg018:08092007@acad.2umekh7.mongodb.net/?appName=Acad"

const conexao = await mongoose.connect(url);

export default conexao; 