const express = require("express");

const cors = require("cors");

require("dotenv").config();

const OpenAI = require("openai");

const app = express();

app.use(cors());

app.use(express.json());

const openai = new OpenAI({

apiKey: process.env.AIzaSyAFuXILzBWEZVz5UO1NLzsbNSw5NCwOnVg

});

app.post("/generate-reviews",
async(req,res)=>{

try{

const completion =
await openai.chat.completions.create({

model:"gpt-4o-mini",

messages:[

{

role:"system",

content:
"You generate SEO friendly human-like Google reviews."

},

{

role:"user",

content:

`Generate 5 unique SEO-friendly Google reviews for a paramedical institute.

Use keywords:
DMLT,
BMLT,
best paramedical institute in Delhi,
practical training,
experienced teachers.

Keep reviews natural and human-like.`

}

],

temperature:0.9

});

const reviews =
completion.choices[0]
.message.content;

res.json({

success:true,
reviews

});

}catch(error){

console.log(error);

res.status(500).json({

success:false,
message:"AI generation failed"

});

}

});

app.listen(5000,()=>{

console.log(
"Server running on port 5000"
);

});