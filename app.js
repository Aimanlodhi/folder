const postForm = document.getElementById("postForm");
const postContent = document.getElementById("postContent");
const postsContainer = document.getElementById("postsContainer");

// Submit Post
postForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const content = postContent.value;
    if (content.trim() === "") return;

    try {
        await db.collection("posts").add({
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        postContent.value = ""; // Clear textarea
        alert("Post added successfully!");
    } catch (error) {
        console.error("Error adding post:", error);
    }
});

// Fetch Posts
async function fetchPosts() {
    postsContainer.innerHTML = ""; // Clear previous posts

    try {
        const snapshot = await db.collection("posts").orderBy("timestamp", "desc").get();
        snapshot.forEach((doc) => {
            const post = doc.data();
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <p>${post.content}</p>
                <small>${post.timestamp ? post.timestamp.toDate().toLocaleString() : "Just now"}</small>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

// Real-time Updates (Optional)
db.collection("posts").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
    fetchPosts();
});

// Initial Fetch
fetchPosts();


const firebaseConfig = {
    apiKey: "AIzaSyBivt4KtexB5Aftnr1AbfouG1oXychoCs0",
    authDomain: "first-assigment-c352a.firebaseapp.com",
    projectId: "first-assigment-c352a",
    storageBucket: "first-assigment-c352a.firebasestorage.app",
    messagingSenderId: "810247920184",
    appId: "1:810247920184:web:cb8f40cf76456832eea4cd",
    measurementId: "G-1ZN51JJ1CN"
  };