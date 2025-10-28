// // scripts/createAdmin.js
// import mongoose from "mongoose";
// import bcrypt from "bcrypt";
// import dotenv from "dotenv";

// // Load environment variables
// dotenv.config();

// // Import User model (adjust path as needed)
// import User from "../models/userSchema.js"; // Adjust path to your userSchema

// const createAdminUser = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(``)
//     console.log("Connected to MongoDB");

//     // Check if admin already exists
//     const existingAdmin = await User.findOne({
//       email: "bitinyoeuge@gmail.com",
//     });
//     if (existingAdmin) {
//       console.log("Admin user already exists:", existingAdmin.email);
//       await mongoose.disconnect();
//       return;
//     }

//     // Create admin user
//     const hashedPassword = await bcrypt.hash("123", 10); // Change this password!

//     const adminUser = new User({
//       fullname: "Eugen Bitinyo",
//       email: "bitinyoeugen@gmail.com",
//       password: hashedPassword,
//       role: "admin",
//     });

//     await adminUser.save();
//     console.log("✅ Admin user created successfully!");
//     console.log("Email: bitinyoeugen@gmail.com"); // Change this!
//     console.log("Password: 123"); // Change this!
//     console.log("⚠️  IMPORTANT: Change the email and password immediately!");
//   } catch (error) {
//     console.error("❌ Error creating admin user:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("Disconnected from MongoDB");
//   }
// };

// // Run the script
// createAdminUser();



// scirpt to add everything in datbase



// // scripts/seedDishes.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import PopularDishes from "../models/popularDishesSchema.js"; 
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Load environment variables
// dotenv.config();

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Your food list data
// const food_list = [
//   {
//     _id: "1",
//     name: "Greek salad",
//     image: "food_1.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Salad",
//   },
//   {
//     _id: "2",
//     name: "Veg salad",
//     image: "food_2.png",
//     price: 18,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Salad",
//   },
//   {
//     _id: "3",
//     name: "Clover Salad",
//     image: "food_3.png",
//     price: 16,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Salad",
//   },
//   {
//     _id: "4",
//     name: "Chicken Salad",
//     image: "food_4.png",
//     price: 24,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Salad",
//   },
//   {
//     _id: "5",
//     name: "Lasagna Rolls",
//     image: "food_5.png",
//     price: 14,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Rolls",
//   },
//   {
//     _id: "6",
//     name: "Peri Peri Rolls",
//     image: "food_6.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Rolls",
//   },
//   {
//     _id: "7",
//     name: "Chicken Rolls",
//     image: "food_7.png",
//     price: 20,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Rolls",
//   },
//   {
//     _id: "8",
//     name: "Veg Rolls",
//     image: "food_8.png",
//     price: 15,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Rolls",
//   },
//   {
//     _id: "9",
//     name: "Ripple Ice Cream",
//     image: "food_9.png",
//     price: 14,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Deserts",
//   },
//   {
//     _id: "10",
//     name: "Fruit Ice Cream",
//     image: "food_10.png",
//     price: 22,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Deserts",
//   },
//   {
//     _id: "11",
//     name: "Jar Ice Cream",
//     image: "food_11.png",
//     price: 10,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Deserts",
//   },
//   {
//     _id: "12",
//     name: "Vanilla Ice Cream",
//     image: "food_12.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Deserts",
//   },
//   {
//     _id: "13",
//     name: "Chicken Sandwich",
//     image: "food_13.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Sandwich",
//   },
//   {
//     _id: "14",
//     name: "Vegan Sandwich",
//     image: "food_14.png",
//     price: 18,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Sandwich",
//   },
//   {
//     _id: "15",
//     name: "Grilled Sandwich",
//     image: "food_15.png",
//     price: 16,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Sandwich",
//   },
//   {
//     _id: "16",
//     name: "Bread Sandwich",
//     image: "food_16.png",
//     price: 24,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Sandwich",
//   },
//   {
//     _id: "17",
//     name: "Cup Cake",
//     image: "food_17.png",
//     price: 14,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Cake",
//   },
//   {
//     _id: "18",
//     name: "Vegan Cake",
//     image: "food_18.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Cake",
//   },
//   {
//     _id: "19",
//     name: "Butterscotch Cake",
//     image: "food_19.png",
//     price: 20,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Cake",
//   },
//   {
//     _id: "20",
//     name: "Sliced Cake",
//     image: "food_20.png",
//     price: 15,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Cake",
//   },
//   {
//     _id: "21",
//     name: "Garlic Mushroom",
//     image: "food_21.png",
//     price: 14,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pure Veg",
//   },
//   {
//     _id: "22",
//     name: "Fried Cauliflower",
//     image: "food_22.png",
//     price: 22,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pure Veg",
//   },
//   {
//     _id: "23",
//     name: "Mix Veg Pulao",
//     image: "food_23.png",
//     price: 10,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pure Veg",
//   },
//   {
//     _id: "24",
//     name: "Rice Zucchini",
//     image: "food_24.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pure Veg",
//   },
//   {
//     _id: "25",
//     name: "Cheese Pasta",
//     image: "food_25.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pasta",
//   },
//   {
//     _id: "26",
//     name: "Tomato Pasta",
//     image: "food_26.png",
//     price: 18,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pasta",
//   },
//   {
//     _id: "27",
//     name: "Creamy Pasta",
//     image: "food_27.png",
//     price: 16,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pasta",
//   },
//   {
//     _id: "28",
//     name: "Chicken Pasta",
//     image: "food_28.png",
//     price: 24,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Pasta",
//   },
//   {
//     _id: "29",
//     name: "Buttter Noodles",
//     image: "food_29.png",
//     price: 14,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Noodles",
//   },
//   {
//     _id: "30",
//     name: "Veg Noodles",
//     image: "food_30.png",
//     price: 12,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Noodles",
//   },
//   {
//     _id: "31",
//     name: "Somen Noodles",
//     image: "food_31.png",
//     price: 20,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Noodles",
//   },
//   {
//     _id: "32",
//     name: "Cooked Noodles",
//     image: "food_32.png",
//     price: 15,
//     description: "Food provides essential nutrients for overall health and well-being",
//     category: "Noodles",
//   },
// ];

// const seedDishes = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect("");
//     console.log("✅ Connected to MongoDB");

//     let addedCount = 0;
//     let skippedCount = 0;

//     // Process each dish
//     for (const foodItem of food_list) {
//       try {
//         // Check if dish already exists
//         const existingDish = await PopularDishes.findOne({ 
//           name: foodItem.name 
//         });

//         if (existingDish) {
//           console.log(`⏭️  Skipping "${foodItem.name}" - already exists`);
//           skippedCount++;
//           continue;
//         }

//         // Upload image to Cloudinary
//         const imagePath = path.join(__dirname, '../../client/src/assets', foodItem.image);
        
//         if (!fs.existsSync(imagePath)) {
//           console.log(`❌ Image not found: ${imagePath}`);
//           continue
//         }

//         console.log(`📤 Uploading image for: ${foodItem.name}`);
//         const uploadResult = await cloudinary.uploader.upload(imagePath, {
//           folder: "dishes",
//         });

//         // Create new dish
//         const newDish = new PopularDishes({
//           name: foodItem.name,
//           price: foodItem.price,
//           category: foodItem.category,
//           description: foodItem.description,
//           image: uploadResult.secure_url,
//           isAvailable: true,
//         });

//         await newDish.save();
//         console.log(`✅ Added: ${foodItem.name}`);
//         addedCount++;

//         // Small delay to avoid overwhelming Cloudinary
//         await new Promise(resolve => setTimeout(resolve, 500));

//       } catch (error) {
//         console.error(`❌ Error processing "${foodItem.name}":`, error.message);
//       }
//     }

//     console.log("\n📊 Seeding Summary:");
//     console.log(`✅ Added: ${addedCount} dishes`);
//     console.log(`⏭️  Skipped: ${skippedCount} dishes (already exist)`);
//     console.log(`📝 Total processed: ${addedCount + skippedCount}/${food_list.length}`);

//   } catch (error) {
//     console.error("❌ Error in seeding process:", error);
//   } finally {
//     await mongoose.disconnect();
//     console.log("🔌 Disconnected from MongoDB");
//   }
// };

// // Run the script
// seedDishes();




// // scripts/updateCategoryImages.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { v2 as cloudinary } from "cloudinary";
// import Category from "../models/categorySchema.js";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Load environment variables
// dotenv.config();

// // Configure Cloudinary with hardcoded values


// console.log("✅ Cloudinary configured");

// // Get __dirname equivalent in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Your menu list data with category names and images
// const menu_list = [
//   {
//     menu_name: "Salad",
//     menu_image: "menu_1.png", // Adjust extension if needed
//   },
//   {
//     menu_name: "Rolls",
//     menu_image: "menu_2.png",
//   },
//   {
//     menu_name: "Deserts",
//     menu_image: "menu_3.png",
//   },
//   {
//     menu_name: "Sandwich",
//     menu_image: "menu_4.png",
//   },
//   {
//     menu_name: "Cake",
//     menu_image: "menu_5.png",
//   },
//   {
//     menu_name: "Pure Veg",
//     menu_image: "menu_6.png",
//   },
//   {
//     menu_name: "Pasta",
//     menu_image: "menu_7.png",
//   },
//   {
//     menu_name: "Noodles",
//     menu_image: "menu_8.png",
//   },
// ];

// const updateCategoryImages = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(``, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("✅ Connected to MongoDB");

//     let updatedCount = 0;
//     let skippedCount = 0;

//     // Process each menu item
//     for (const menuItem of menu_list) {
//       try {
//         // Find the category by name
//         const category = await Category.findOne({ 
//           name: menuItem.menu_name 
//         });

//         if (!category) {
//           console.log(`❌ Category not found: "${menuItem.menu_name}"`);
//           skippedCount++;
//           continue;
//         }

//         // Check if category already has an image
//         if (category.image && category.image !== "") {
//           console.log(`⏭️  Skipping "${menuItem.menu_name}" - already has image`);
//           skippedCount++;
//           continue;
//         }

//         // Path to menu images in frontend assets
//         const imagePath = path.join(__dirname, '../../client/src/assets', menuItem.menu_image);
        
//         if (!fs.existsSync(imagePath)) {
//           console.log(`❌ Image not found: ${imagePath}`);
//           console.log(`   Looking for: ${menuItem.menu_image}`);
//           skippedCount++;
//           continue;
//         }

//         console.log(`📤 Uploading image for: ${menuItem.menu_name}`);
        
//         // Upload to Cloudinary
//         const uploadResult = await cloudinary.uploader.upload(imagePath, {
//           folder: "categories",
//         });

//         // Update category with image URL
//         category.image = uploadResult.secure_url;
//         await category.save();

//         console.log(`✅ Updated: ${menuItem.menu_name}`);
//         updatedCount++;

//         // Small delay to avoid overwhelming Cloudinary
//         await new Promise(resolve => setTimeout(resolve, 500));

//       } catch (error) {
//         console.error(`❌ Error processing "${menuItem.menu_name}":`, error.message);
//       }
//     }

//     console.log("\n📊 Update Summary:");
//     console.log(`✅ Updated: ${updatedCount} categories with images`);
//     console.log(`⏭️  Skipped: ${skippedCount} categories`);
//     console.log(`📝 Total processed: ${updatedCount + skippedCount}/${menu_list.length}`);

//   } catch (error) {
//     console.error("❌ Error in update process:", error.message);
//   } finally {
//     if (mongoose.connection.readyState !== 0) {
//       await mongoose.disconnect();
//       console.log("🔌 Disconnected from MongoDB");
//     }
//   }
// };

// // Run the script
// updateCategoryImages();



// scripts/seedHotels.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Hotel from "../models/hotelSchema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Configure Cloudinary with hardcoded values
cloudinary.config({
  cloud_name: "dmxvsiwev",
  api_key: "414399732439977",
  api_secret: "Wc22ADTWYrw2NkSiU3-48MDrrvI",
});

console.log("✅ Cloudinary configured");

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your hotel data
const hotels = [
  {
    name: "Sunrise Hotel",
    image: "hotel1.png", // Adjust extension if needed
    address: "Nairobi Central",
    county: "Nairobi",
    pricePerNight: 120,
    amenities: ["Free WiFi", "Breakfast Included", "Swimming Pool"],
    images: ["roomImg1.png", "roomImg2.png", "roomImg3.png", "roomImg4.png"],
    isAvailable: true,
    contactEmail: "info@sunrisehotel.com",
    contactPhone: "+254712345678",
    roomsAvailable: 10,
    description: "Luxury hotel in the heart of Nairobi with premium amenities and excellent service."
  },
  {
    name: "Oceanview Resort",
    image: "hotel2.png",
    address: "Beach Road, Nyali",
    county: "Mombasa",
    pricePerNight: 150,
    amenities: ["Beach Access", "Spa Services", "Free Parking"],
    images: ["roomImg2.png", "roomImg3.png", "roomImg4.png", "roomImg1.png"],
    isAvailable: false,
    contactEmail: "reservations@oceanviewresort.com",
    contactPhone: "+254723456789",
    roomsAvailable: 15,
    description: "Beautiful beachfront resort with stunning ocean views and world-class amenities."
  },
  {
    name: "Mountainview Inn",
    image: "hotel3.png",
    address: "Kisumu Hills",
    county: "Kisumu",
    pricePerNight: 100,
    amenities: ["Hiking Trails", "Pet Friendly", "Free Breakfast"],
    images: ["roomImg3.png", "roomImg4.png", "roomImg1.png", "roomImg2.png"],
    isAvailable: true,
    contactEmail: "stay@mountainviewinn.com",
    contactPhone: "+254734567890",
    roomsAvailable: 8,
    description: "Cozy inn with breathtaking mountain views and nature trails."
  },
  {
    name: "City Center Lodge",
    image: "hotel4.png",
    address: "Nakuru Town",
    county: "Nakuru",
    pricePerNight: 130,
    amenities: ["Central Location", "Free WiFi", "24/7 Front Desk"],
    images: ["roomImg4.png", "roomImg1.png", "roomImg2.png", "roomImg3.png"],
    isAvailable: true,
    contactEmail: "bookings@citycenterlodge.com",
    contactPhone: "+254745678901",
    roomsAvailable: 12,
    description: "Modern lodge in the city center with easy access to all attractions."
  },
  {
    name: "Lakeside Hotel",
    image: "hotel5.png",
    address: "Eldoret Lake Road",
    county: "Eldoret",
    pricePerNight: 110,
    amenities: ["Lake View", "Free Breakfast", "Swimming Pool"],
    images: ["roomImg1.png", "roomImg2.png", "roomImg3.png"],
    isAvailable: false,
    contactEmail: "hello@lakesidehotel.com",
    contactPhone: "+254756789012",
    roomsAvailable: 6,
    description: "Serene hotel by the lake offering peaceful stays and beautiful scenery."
  },
  {
    name: "Gardenview Suites",
    image: "hotel6.png",
    address: "Thika Greens",
    county: "Thika",
    pricePerNight: 140,
    amenities: ["Garden Access", "Free WiFi", "Breakfast Included"],
    images: ["roomImg1.png", "roomImg2.png", "roomImg3.png", "roomImg4.png"],
    isAvailable: true,
    contactEmail: "info@gardenviewsuites.com",
    contactPhone: "+254767890123",
    roomsAvailable: 20,
    description: "Luxury suites surrounded by beautiful gardens and premium amenities."
  },
  {
    name: "Sunset Resort",
    image: "hotel7.png",
    address: "Malindi Beach",
    county: "Malindi",
    pricePerNight: 160,
    amenities: ["Beach Access", "Spa Services", "Free Parking"],
    images: ["roomImg2.png", "roomImg3.png", "roomImg4.png", "roomImg1.png"],
    isAvailable: true,
    contactEmail: "reservations@sunsetresort.com",
    contactPhone: "+254778901234",
    roomsAvailable: 25,
    description: "Premium beach resort with spectacular sunset views and luxury services."
  }
];

// Function to find image with different extensions
const findImageWithExtensions = (baseName) => {
  const extensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
  for (const ext of extensions) {
    const imagePath = path.join(__dirname, '../../frontend/assets', baseName + ext);
    if (fs.existsSync(imagePath)) {
      return imagePath;
    }
  }
  return null;
};

const seedHotels = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${process.env.MONGODB_URI}/bite-restaurant`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    let addedCount = 0;
    let skippedCount = 0;

    // Process each hotel
    for (const hotelData of hotels) {
      try {
        // Check if hotel already exists
        const existingHotel = await Hotel.findOne({ 
          name: hotelData.name 
        });

        if (existingHotel) {
          console.log(`⏭️  Skipping "${hotelData.name}" - already exists`);
          skippedCount++;
          continue;
        }

        // Upload main image to Cloudinary
        console.log(`📤 Uploading main image for: ${hotelData.name}`);
        const mainImagePath = findImageWithExtensions(hotelData.image.replace('.png', ''));
        
        if (!mainImagePath) {
          console.log(`❌ Main image not found: ${hotelData.image}`);
          skippedCount++;
          continue;
        }

        const mainImageResult = await cloudinary.uploader.upload(mainImagePath, {
          folder: "hotels"
        });

        // Upload additional images
        let additionalImages = [];
        console.log(`📤 Uploading additional images for: ${hotelData.name}`);
        
        for (const imageName of hotelData.images) {
          const additionalImagePath = findImageWithExtensions(imageName.replace('.png', ''));
          
          if (additionalImagePath) {
            const result = await cloudinary.uploader.upload(additionalImagePath, {
              folder: "hotels/rooms"
            });
            additionalImages.push(result.secure_url);
            console.log(`   ✅ Uploaded: ${imageName}`);
          } else {
            console.log(`   ❌ Additional image not found: ${imageName}`);
          }
          
          // Small delay to avoid overwhelming Cloudinary
          await new Promise(resolve => setTimeout(resolve, 300));
        }

        // Create new hotel
        const newHotel = new Hotel({
          name: hotelData.name,
          description: hotelData.description,
          address: hotelData.address,
          county: hotelData.county,
          pricePerNight: hotelData.pricePerNight,
          amenities: hotelData.amenities,
          image: mainImageResult.secure_url,
          images: additionalImages,
          contactEmail: hotelData.contactEmail,
          contactPhone: hotelData.contactPhone,
          roomsAvailable: hotelData.roomsAvailable,
          isAvailable: hotelData.isAvailable
        });

        await newHotel.save();
        console.log(`✅ Added: ${hotelData.name}`);
        addedCount++;

        // Small delay between hotels
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Error processing "${hotelData.name}":`, error.message);
      }
    }

    console.log("\n📊 Seeding Summary:");
    console.log(`✅ Added: ${addedCount} hotels`);
    console.log(`⏭️  Skipped: ${skippedCount} hotels (already exist or images missing)`);
    console.log(`📝 Total processed: ${addedCount + skippedCount}/${hotels.length}`);

  } catch (error) {
    console.error("❌ Error in seeding process:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
};

// Run the script
seedHotels();