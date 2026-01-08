import mongoose from "mongoose";
import { Song } from "../models/songModel.js";
import { Album } from "../models/albumModel.js";
import { config } from "dotenv";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({ path: path.resolve(__dirname, "../../.env") });

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artists: ["Urban Echo"],
				songImgURL: "/cover-images/7.jpg",
				audioURL: "/songs/7.mp3",
				genre: ["Hip-Hop"],
				likes: 0,
				duration: 39, // 0:39
			},
			{
				title: "Neon Lights",
				artists: ["Night Runners"],
				songImgURL: "/cover-images/5.jpg",
				audioURL: "/songs/5.mp3",
				genre: ["Electronic"],
				likes: 0,
				duration: 36, // 0:36
			},
			{
				title: "Urban Jungle",
				artists: ["City Lights"],
				songImgURL: "/cover-images/15.jpg",
				audioURL: "/songs/15.mp3",
				genre: ["Hip-Hop"],
				likes: 0,
				duration: 36, // 0:36
			},
			{
				title: "Neon Dreams",
				artists: ["Cyber Pulse"],
				songImgURL: "/cover-images/13.jpg",
				audioURL: "/songs/13.mp3",
				genre: ["Electronic"],
				likes: 0,
				duration: 39, // 0:39
			},
			{
				title: "Summer Daze",
				artists: ["Coastal Kids"],
				songImgURL: "/cover-images/4.jpg",
				audioURL: "/songs/4.mp3",
				genre: ["Indie"],
				likes: 0,
				duration: 24, // 0:24
			},
			{
				title: "Ocean Waves",
				artists: ["Coastal Drift"],
				songImgURL: "/cover-images/9.jpg",
				audioURL: "/songs/9.mp3",
				genre: ["Ambient"],
				likes: 0,
				duration: 28, // 0:28
			},
			{
				title: "Crystal Rain",
				artists: ["Echo Valley"],
				songImgURL: "/cover-images/16.jpg",
				audioURL: "/songs/16.mp3",
				genre: ["Ambient"],
				likes: 0,
				duration: 39, // 0:39
			},
			{
				title: "Starlight",
				artists: ["Luna Bay"],
				songImgURL: "/cover-images/10.jpg",
				audioURL: "/songs/10.mp3",
				genre: ["Pop"],
				likes: 0,
				duration: 30, // 0:30
			},
			{
				title: "Stay With Me",
				artists: ["Sarah Mitchell"],
				songImgURL: "/cover-images/1.jpg",
				audioURL: "/songs/1.mp3",
				genre: ["Pop"],
				likes: 0,
				duration: 46, // 0:46
			},
			{
				title: "Midnight Drive",
				artists: ["The Wanderers"],
				songImgURL: "/cover-images/2.jpg",
				audioURL: "/songs/2.mp3",
				genre: ["Electronic"],
				likes: 0,
				duration: 41, // 0:41
			},
			{
				title: "Moonlight Dance",
				artists: ["Silver Shadows"],
				songImgURL: "/cover-images/14.jpg",
				audioURL: "/songs/14.mp3",
				genre: ["Pop"],
				likes: 0,
				duration: 27, // 0:27
			},
			{
				title: "Lost in Tokyo",
				artists: ["Electric Dreams"],
				songImgURL: "/cover-images/3.jpg",
				audioURL: "/songs/3.mp3",
				genre: ["Synthwave"],
				likes: 0,
				duration: 24, // 0:24
			},
			{
				title: "Neon Tokyo",
				artists: ["Future Pulse"],
				songImgURL: "/cover-images/17.jpg",
				audioURL: "/songs/17.mp3",
				genre: ["Synthwave"],
				likes: 0,
				duration: 39, // 0:39
			},
			{
				title: "Purple Sunset",
				artists: ["Dream Valley"],
				songImgURL: "/cover-images/12.jpg",
				audioURL: "/songs/12.mp3",
				genre: ["Indie"],
				likes: 0,
				duration: 17, // 0:17
			},
		]);

		// Create albums with references to song IDs
		const albums = [
			{
				albumName: "Urban Nights",
				artists: ["Various Artists"],
				imageURL: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				albumName: "Coastal Dreaming",
				artists: ["Various Artists"],
				imageURL: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				albumName: "Midnight Sessions",
				artists: ["Various Artists"],
				imageURL: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				albumName: "Eastern Dreams",
				artists: ["Various Artists"],
				imageURL: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();