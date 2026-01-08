import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "../../.env") });

const songs = [
	{
		title: "Stay With Me",
		artists: ["Sarah Mitchell"],
		songImgURL: "/cover-images/1.jpg",
		audioURL: "/songs/1.mp3",
		duration: 46,
		genre: ["Pop"],
		likes: 0,
	},
	{
		title: "Midnight Drive",
		artists: ["The Wanderers"],
		songImgURL: "/cover-images/2.jpg",
		audioURL: "/songs/2.mp3",
		duration: 41,
		genre: ["Electronic"],
		likes: 0,
	},
	{
		title: "Lost in Tokyo",
		artists: ["Electric Dreams"],
		songImgURL: "/cover-images/3.jpg",
		audioURL: "/songs/3.mp3",
		duration: 24,
		genre: ["Synthwave"],
		likes: 0,
	},
	{
		title: "Summer Daze",
		artists: ["Coastal Kids"],
		songImgURL: "/cover-images/4.jpg",
		audioURL: "/songs/4.mp3",
		duration: 24,
		genre: ["Indie"],
		likes: 0,
	},
	{
		title: "Neon Lights",
		artists: ["Night Runners"],
		songImgURL: "/cover-images/5.jpg",
		audioURL: "/songs/5.mp3",
		duration: 36,
		genre: ["Electronic"],
		likes: 0,
	},
	{
		title: "Mountain High",
		artists: ["The Wild Ones"],
		songImgURL: "/cover-images/6.jpg",
		audioURL: "/songs/6.mp3",
		duration: 40,
		genre: ["Rock"],
		likes: 0,
	},
	{
		title: "City Rain",
		artists: ["Urban Echo"],
		songImgURL: "/cover-images/7.jpg",
		audioURL: "/songs/7.mp3",
		duration: 39,
		genre: ["Hip-Hop"],
		likes: 0,
	},
	{
		title: "Desert Wind",
		artists: ["Sahara Sons"],
		songImgURL: "/cover-images/8.jpg",
		audioURL: "/songs/8.mp3",
		duration: 28,
		genre: ["World"],
		likes: 0,
	},
	{
		title: "Ocean Waves",
		artists: ["Coastal Drift"],
		songImgURL: "/cover-images/9.jpg",
		audioURL: "/songs/9.mp3",
		duration: 28,
		genre: ["Ambient"],
		likes: 0,
	},
	{
		title: "Starlight",
		artists: ["Luna Bay"],
		songImgURL: "/cover-images/10.jpg",
		audioURL: "/songs/10.mp3",
		duration: 30,
		genre: ["Pop"],
		likes: 0,
	},
	{
		title: "Winter Dreams",
		artists: ["Arctic Pulse"],
		songImgURL: "/cover-images/11.jpg",
		audioURL: "/songs/11.mp3",
		duration: 29,
		genre: ["Electronic"],
		likes: 0,
	},
	{
		title: "Purple Sunset",
		artists: ["Dream Valley"],
		songImgURL: "/cover-images/12.jpg",
		audioURL: "/songs/12.mp3",
		duration: 17,
		genre: ["Indie"],
		likes: 0,
	},
	{
		title: "Neon Dreams",
		artists: ["Cyber Pulse"],
		songImgURL: "/cover-images/13.jpg",
		audioURL: "/songs/13.mp3",
		duration: 39,
		genre: ["Electronic"],
		likes: 0,
	},
	{
		title: "Moonlight Dance",
		artists: ["Silver Shadows"],
		songImgURL: "/cover-images/14.jpg",
		audioURL: "/songs/14.mp3",
		duration: 27,
		genre: ["Pop"],
		likes: 0,
	},
	{
		title: "Urban Jungle",
		artists: ["City Lights"],
		songImgURL: "/cover-images/15.jpg",
		audioURL: "/songs/15.mp3",
		duration: 36,
		genre: ["Hip-Hop"],
		likes: 0,
	},
	{
		title: "Crystal Rain",
		artists: ["Echo Valley"],
		songImgURL: "/cover-images/16.jpg",
		audioURL: "/songs/16.mp3",
		duration: 39,
		genre: ["Ambient"],
		likes: 0,
	},
	{
		title: "Neon Tokyo",
		artists: ["Future Pulse"],
		songImgURL: "/cover-images/17.jpg",
		audioURL: "/songs/17.mp3",
		duration: 39,
		genre: ["Synthwave"],
		likes: 0,
	},
	{
		title: "Midnight Blues",
		artists: ["Jazz Cats"],
		songImgURL: "/cover-images/18.jpg",
		audioURL: "/songs/18.mp3",
		duration: 29,
		genre: ["Jazz"],
		likes: 0,
	},
];

const seedSongs = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing songs
		await Song.deleteMany({});

		// Insert new songs
		await Song.insertMany(songs);

		console.log("Songs seeded successfully!");
	} catch (error) {
		console.error("Error seeding songs:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedSongs();