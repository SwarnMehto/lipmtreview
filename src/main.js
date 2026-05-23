import "./style.css";

document.querySelector("#app").innerHTML = `

<div class="page-logo">

<img src="/logo.png">

</div>

<div class="side-ads left-ads">

<a href="https://www.lipmt.in/" target="_blank">

<img src="/post1.png">

</a>

<a href="https://www.lipmt.in/" target="_blank">

<img src="/post2.png">

</a>

</div>

<div class="container">

<div class="center-logo">

<img src="/logo.png">

</div>

<h1>

⭐ <span class="lal-red">LAL</span>

<span class="blue-text">
INSTITUTE OF PARA MEDICAL TECHNOLOGY 
</span>
<span class="yellow-text">Review</span>


</h1>

<p class="thank-text">

Thank you for choosing us.
We value your feedback and would love to hear
about your experience at
LAL Institute of Para Medical Technology.

Please take a moment to share your thoughts
and help us continue to provide excellent
education and training in the field of
paramedical sciences.

</p>

<div class="buttons">

<button id="five">
⭐⭐⭐⭐⭐
</button>

<button id="four">
⭐⭐⭐⭐
</button>

</div>

<div id="reviews"></div>

</div>

<div class="side-ads right-ads">

<a href="https://www.lipmt.in/" target="_blank">

<img src="/post3.png">

</a>

<a href="https://www.lipmt.in/" target="_blank">

<img src="/post4.png">

</a>

</div>

`;

const reviewsDiv =
document.getElementById("reviews");

async function generateReviews(star){

reviewsDiv.innerHTML =
"<div class='loading'>✨ AI is generating reviews...</div>";

try{

const response =
await fetch(

"http://localhost:5000/generate-review",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({star})

}

);

const data =
await response.json();


reviewsDiv.innerHTML = "";

reviews.forEach((review)=>{

reviewsDiv.innerHTML = `

<div class="review-box">

<p>${data.review}</p>

<button onclick="copyReview(\`${data.review}\`)">

Copy Review

</button>

<a
href="https://maps.app.goo.gl/efkSvmwZUHpjZ6jQ7"
target="_blank">

<button class="google-btn">

Post Review ⭐

</button>

</a>

</div>

`;

});

}catch(error){

console.log(error);

reviewsDiv.innerHTML =
"<p style='color:white'>❌ AI generation failed</p>";

}

}

document.getElementById("five")
.onclick = generateReviews;
window.copyReview = function(text){

navigator.clipboard.writeText(text);

alert("Copied ✅");

}