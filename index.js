const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
uuidv4();
const methodOverride = require("method-override");

// path server make

const port = 8080;
// folders ko direct use krne ke liye path require karna padtha hai
const path = require("path");

// midleware (json jaisi files ko padhne ke liye)

app.use(express.urlencoded({ extended: true }));
// override use
app.use(methodOverride("_method"));

// for images

app.use(express.static(path.join(__dirname, "images")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// pubick folder  require ke liye (css ke liye)

app.use(express.static(path.join(__dirname, "public")));

// POST ko store krane ke liye hum ek array bbnate hai
// arr=[]; in js and arr={} in c++/c/java

// create id for every single post
let posts = [
  {
    username: "Travel Vlog",
    hobby:"Embarking on an exhilarating journey, our travel vlog captures the essence of adventure and discovery. From bustling cityscapes to serene natural landscapes, every frame paints a vivid picture of exploration. Our wanderlust takes us through vibrant markets teeming with life, where the aroma of local delicacies mingles with the vibrant colors of exotic fruits and spices.The journey unfolds as we traverse historical landmarks, each narrating a tale of its own. Ancient architecture whispers stories of the past, while modern marvels stand tall, symbolizing progress and innovation. The local culture embraces us with open arms, and we immerse ourselves in traditional dances, festivals, and rituals, experiencing the heartbeat of each destination.As we venture into the great outdoors, breathtaking vistas unfold. Majestic mountains, cascading waterfalls, and pristine beaches become the backdrop for unforgettable moments. Nature becomes our playground, offering thrilling activities and a chance to connect with the environment on a profound level",
    id: uuidv4(),
  },
  {
    username: "Cricket vlog",
    hobby: "Dive into the world of cricket with our thrilling vlog that captures the heart and soul of the sport. From the crack of the bat to the roar of the crowd, each frame unfolds the excitement, strategy, and camaraderie that define the game.The vlog kicks off with the anticipation in the air as players step onto the field, showcasing their skills and passion for the game. Breathtaking shots and strategic bowling maneuvers create a symphony of athleticism, drawing viewers into the intensity of each match.Behind-the-scenes glimpses take the audience into the locker rooms, where pre-match rituals and pep talks reveal the human side of the players. Interviews with cricketing legends and rising stars provide insights into the dedication and sacrifices required to excel in this highly competitive arena.Stadium atmospheres come alive as fans don their team colors, chanting and cheering with unwavering enthusiasm. The vlog captures not only the game itself but also the electric energy that courses through the stands, uniting spectators in a shared love for the sport",
    id: uuidv4(),
  },
  {
    username: "Student Life",
    hobby: "Step into the vibrant world of student life through our engaging vlog, where each frame tells a unique story of academic pursuits friendships, and personal growth. The journey begins with the morning hustle, as students navigate bustling campuses, backpacks laden with textbooks and laptops, eager to seize the day's opportunities.Classroom scenes capture the <hr/>intellectual energy, with students passionately engaging in discussions, fueled by curiosity and a thirst for knowledge. The library transforms into a haven of concentration, where the pursuit of academic excellence takes center stage. Late-night study sessions and collaborative projects showcase the dedication and teamwork that define the student experience.Beyond academics, the vlog unfolds the tapestry of social life, where friendships are forged in lecture halls, student clubs, and dormitories. Laughter resonates in shared moments of joy, whether during spontaneous outings or planned events. The diverse tapestry of cultures and backgrounds contributes to a rich, multicultural environment, fostering understanding and lifelong connections.",
    id: uuidv4(),
  },
];

// making route

app.get("/", (req, res) => {
  res.send("hello server work perfectly");
});

// making a post
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts }); // index.jsx m post ko bhejna
});

// making a new post

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// console new.ejs se jo request jati h usko

app.post("/posts", (req, res) => {
  let { username, hobby } = req.body;
  let id = uuidv4();
  posts.unshift({ username, hobby, id });
  res.redirect("/posts");
});

// new path create for id

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;

  // post se related id find karna then ussse print karana

  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

// update id

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.hobby;
  let post = posts.find((p) => id === p.id);
  post.hobby = newContent;
  res.redirect("/posts");
});

// edit post

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

// delete rout

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});
// unnesecary search / condition

app.get("*", (req, res) => {
  res.send("your request is not right!! please cheak your path");
});

app.listen(port, () => {
  console.log("server start");
});
