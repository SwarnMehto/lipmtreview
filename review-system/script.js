const googleReviewLink =
"https://maps.app.goo.gl/efkSvmwZUHpjZ6jQ7";

async function showReviews(star){

const reviewContainer =
document.getElementById("reviews");

reviewContainer.innerHTML =
"<h3>Generating AI Reviews...</h3>";

try{

const response =
await fetch(

"http://localhost:5000/generate-reviews",

{

method:"POST",

headers:{
"Content-Type":"application/json"
}

}

);

const data =
await response.json();

const reviews =
data.reviews
.split("\n")
.filter(r=>r.trim());

reviewContainer.innerHTML = "";

reviews.forEach((review)=>{

const div =
document.createElement("div");

div.classList.add("review-box");

div.innerHTML = `

<p>${review}</p>

<button class="copy-btn"
onclick="copyReview('${review}')">

Copy Review

</button>

<a href="${googleReviewLink}"
target="_blank">

<button class="google-btn">

Go To Google Review

</button>

</a>

`;

reviewContainer.appendChild(div);

});

}catch(error){

reviewContainer.innerHTML =

"<p>AI generation failed ❌</p>";

console.log(error);

}

}

function copyReview(text){

navigator.clipboard.writeText(text);

alert("Review copied ✅");

}

function lowRating(){

document.getElementById("reviews")
.innerHTML = "";

document.getElementById("feedback")
.innerHTML = `

<h3>
We value your feedback 🙏
</h3>

<textarea
placeholder="Please tell us how we can improve">
</textarea>

`;

}