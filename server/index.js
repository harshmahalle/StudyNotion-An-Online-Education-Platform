const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
	"hhttp://localhost:4000", // Local development
	"https://study-notion-an-online-education-platform-7lnoxqen2.vercel.app/", // Production frontend
  ];
  

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
	  origin: function (origin, callback) {
		// Allow requests with no origin (like mobile apps, Postman)
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
		  callback(null, true); // Allow the request
		} else {
		  callback(new Error("Not allowed by CORS")); // Reject the request
		}
	  },
	  credentials: true, // Allow cookies and headers like Authorization
	})
  );
  

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

