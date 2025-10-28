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




// scripts/updateCategoryImages.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import Category from "../models/categorySchema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

// Configure Cloudinary with hardcoded values

console.log("✅ Cloudinary configured");

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your menu list data with category names and images
const menu_list = [
  {
    menu_name: "Salad",
    menu_image: "menu_1.png", // Adjust extension if needed
  },
  {
    menu_name: "Rolls",
    menu_image: "menu_2.png",
  },
  {
    menu_name: "Deserts",
    menu_image: "menu_3.png",
  },
  {
    menu_name: "Sandwich",
    menu_image: "menu_4.png",
  },
  {
    menu_name: "Cake",
    menu_image: "menu_5.png",
  },
  {
    menu_name: "Pure Veg",
    menu_image: "menu_6.png",
  },
  {
    menu_name: "Pasta",
    menu_image: "menu_7.png",
  },
  {
    menu_name: "Noodles",
    menu_image: "menu_8.png",
  },
];

const updateCategoryImages = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(``, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    let updatedCount = 0;
    let skippedCount = 0;

    // Process each menu item
    for (const menuItem of menu_list) {
      try {
        // Find the category by name
        const category = await Category.findOne({ 
          name: menuItem.menu_name 
        });

        if (!category) {
          console.log(`❌ Category not found: "${menuItem.menu_name}"`);
          skippedCount++;
          continue;
        }

        // Check if category already has an image
        if (category.image && category.image !== "") {
          console.log(`⏭️  Skipping "${menuItem.menu_name}" - already has image`);
          skippedCount++;
          continue;
        }

        // Path to menu images in frontend assets
        const imagePath = path.join(__dirname, '../../client/src/assets', menuItem.menu_image);
        
        if (!fs.existsSync(imagePath)) {
          console.log(`❌ Image not found: ${imagePath}`);
          console.log(`   Looking for: ${menuItem.menu_image}`);
          skippedCount++;
          continue;
        }

        console.log(`📤 Uploading image for: ${menuItem.menu_name}`);
        
        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(imagePath, {
          folder: "categories",
        });

        // Update category with image URL
        category.image = uploadResult.secure_url;
        await category.save();

        console.log(`✅ Updated: ${menuItem.menu_name}`);
        updatedCount++;

        // Small delay to avoid overwhelming Cloudinary
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Error processing "${menuItem.menu_name}":`, error.message);
      }
    }

    console.log("\n📊 Update Summary:");
    console.log(`✅ Updated: ${updatedCount} categories with images`);
    console.log(`⏭️  Skipped: ${skippedCount} categories`);
    console.log(`📝 Total processed: ${updatedCount + skippedCount}/${menu_list.length}`);

  } catch (error) {
    console.error("❌ Error in update process:", error.message);
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log("🔌 Disconnected from MongoDB");
    }
  }
};

// Run the script
updateCategoryImages();