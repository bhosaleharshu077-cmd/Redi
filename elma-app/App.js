import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList, 
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";

import Svg, { Circle } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/* ───────── CIRCLE CONSTANTS ───────── */
const SIZE = 220;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/* ───────── ELMA ───────── */
const ELMA_HAPPY = require("./assets/elma-happy.png");
const ELMA_SAD = require("./assets/elma-sad.png");

/* ───────── FOOD DATABASE ───────── */
const FOOD_DB = [
  { "name": "Chicken Biryani", calories: 650, protein: 28, carbs: 65, fat: 26 },
  { "name": "Paneer Butter Masala", calories: 420, protein: 14, carbs: 18, fat: 34 },
  { "name": "Masala Dosa", calories: 320, protein: 8, carbs: 45, fat: 12 },
  { "name": "Samosa", calories: 180, protein: 4, carbs: 22, fat: 9 },
  { "name": "Plain Rice", calories: 180, protein: 4, carbs: 38, fat: 1 },
  { "name": "Pav Bhaji", calories: 400, protein: 10, carbs: 48, fat: 18 },
{ "name": "Paneer Butter Masala", "calories": 420, "protein": 18, "carbs": 22, "fats": 30 },
{ "name": "Kadai Paneer", "calories": 390, "protein": 17, "carbs": 20, "fats": 28 },
{ "name": "Shahi Paneer", "calories": 450, "protein": 16, "carbs": 24, "fats": 34 },
{ "name": "Palak Paneer", "calories": 340, "protein": 18, "carbs": 16, "fats": 24 },
{ "name": "Matar Paneer", "calories": 360, "protein": 17, "carbs": 20, "fats": 26 },
{ "name": "Paneer Tikka", "calories": 280, "protein": 22, "carbs": 10, "fats": 18 },
{ "name": "Paneer Tikka Masala", "calories": 420, "protein": 20, "carbs": 24, "fats": 30 },
{ "name": "Paneer Bhurji", "calories": 330, "protein": 20, "carbs": 14, "fats": 22 },
{ "name": "Paneer Frankie", "calories": 380, "protein": 16, "carbs": 40, "fats": 18 },
{ "name": "Paneer Roll", "calories": 360, "protein": 15, "carbs": 38, "fats": 16 },
{ "name": "Paneer Burger", "calories": 460, "protein": 18, "carbs": 42, "fats": 24 },
{ "name": "Chilli Paneer Dry", "calories": 390, "protein": 20, "carbs": 26, "fats": 24 },
{ "name": "Paneer Manchurian", "calories": 410, "protein": 19, "carbs": 28, "fats": 26 },
{ "name": "Paneer Fried Rice", "calories": 480, "protein": 14, "carbs": 60, "fats": 18 },
{ "name": "Paneer Biryani", "calories": 520, "protein": 18, "carbs": 65, "fats": 20 },

{ "name": "Butter Chicken", "calories": 480, "protein": 26, "carbs": 12, "fats": 36 },
{ "name": "Chicken Tikka", "calories": 260, "protein": 32, "carbs": 6, "fats": 12 },
{ "name": "Chicken Tikka Masala", "calories": 430, "protein": 28, "carbs": 16, "fats": 30 },
{ "name": "Tandoori Chicken", "calories": 300, "protein": 35, "carbs": 4, "fats": 14 },
{ "name": "Chicken Biryani", "calories": 550, "protein": 28, "carbs": 65, "fats": 22 },
{ "name": "Chicken Curry", "calories": 360, "protein": 26, "carbs": 10, "fats": 24 },
{ "name": "Kadai Chicken", "calories": 400, "protein": 28, "carbs": 12, "fats": 28 },
{ "name": "Chicken Handi", "calories": 420, "protein": 27, "carbs": 14, "fats": 30 },
{ "name": "Chicken 65", "calories": 380, "protein": 24, "carbs": 20, "fats": 24 },
{ "name": "Chicken Lollipop", "calories": 420, "protein": 22, "carbs": 18, "fats": 28 },
{ "name": "Chicken Shawarma", "calories": 450, "protein": 30, "carbs": 35, "fats": 20 },
{ "name": "Chicken Burger", "calories": 480, "protein": 25, "carbs": 45, "fats": 22 },
{ "name": "Fried Chicken", "calories": 520, "protein": 28, "carbs": 18, "fats": 36 },
{ "name": "Grilled Chicken", "calories": 260, "protein": 40, "carbs": 0, "fats": 8 },
{ "name": "Peri Peri Chicken", "calories": 300, "protein": 38, "carbs": 4, "fats": 10 },{ "name": "Khakhra", "calories": 120, "protein": 3, "carbs": 18, "fats": 4 },
{ "name": "Masala Khakhra", "calories": 140, "protein": 3, "carbs": 20, "fats": 5 },
{ "name": "Methi Thepla", "calories": 180, "protein": 5, "carbs": 28, "fats": 6 },
{ "name": "Plain Thepla", "calories": 160, "protein": 4, "carbs": 26, "fats": 5 },
{ "name": "Ragi Roti", "calories": 140, "protein": 3, "carbs": 30, "fats": 1 },
{ "name": "Nachni Bhakri", "calories": 190, "protein": 4, "carbs": 36, "fats": 2 },
{ "name": "Rice Bhakri", "calories": 210, "protein": 3, "carbs": 44, "fats": 1 },
{ "name": "Thalipeeth", "calories": 220, "protein": 6, "carbs": 34, "fats": 6 },
{ "name": "Sabudana Thalipeeth", "calories": 260, "protein": 4, "carbs": 42, "fats": 8 },
{ "name": "Methi Paratha", "calories": 240, "protein": 6, "carbs": 34, "fats": 8 },
{ "name": "Aloo Paratha", "calories": 290, "protein": 6, "carbs": 42, "fats": 10 },
{ "name": "Gobi Paratha", "calories": 270, "protein": 7, "carbs": 38, "fats": 9 },
{ "name": "Paneer Paratha", "calories": 320, "protein": 12, "carbs": 36, "fats": 14 },
{ "name": "Onion Paratha", "calories": 260, "protein": 5, "carbs": 38, "fats": 8 },
{ "name": "Lachha Paratha", "calories": 300, "protein": 6, "carbs": 36, "fats": 14 },
{ "name": "Mughlai Paratha", "calories": 420, "protein": 18, "carbs": 38, "fats": 22 },
{ "name": "Egg Paratha", "calories": 330, "protein": 14, "carbs": 36, "fats": 14 },
{ "name": "Chicken Paratha", "calories": 390, "protein": 22, "carbs": 34, "fats": 16 },
{ "name": "Rumali Roti", "calories": 110, "protein": 3, "carbs": 22, "fats": 1 },
{ "name": "Neer Dosa", "calories": 120, "protein": 2, "carbs": 26, "fats": 1 },
{ "name": "Set Dosa", "calories": 180, "protein": 5, "carbs": 32, "fats": 4 },
{ "name": "Rava Dosa", "calories": 220, "protein": 6, "carbs": 34, "fats": 6 },
{ "name": "Onion Rava Dosa", "calories": 240, "protein": 6, "carbs": 36, "fats": 7 },
{ "name": "Paper Dosa", "calories": 190, "protein": 5, "carbs": 38, "fats": 3 },
{ "name": "Thatte Idli", "calories": 140, "protein": 4, "carbs": 28, "fats": 1 },
{ "name": "Mini Idli", "calories": 110, "protein": 3, "carbs": 22, "fats": 1 },
{ "name": "Rava Idli", "calories": 160, "protein": 5, "carbs": 28, "fats": 3 },
{ "name": "Ghee Podi Idli", "calories": 210, "protein": 5, "carbs": 26, "fats": 8 },
{ "name": "Moong Dal Chilla", "calories": 190, "protein": 10, "carbs": 22, "fats": 5 },
{ "name": "Besan Chilla", "calories": 200, "protein": 8, "carbs": 24, "fats": 6 },
{ "name": "Paneer Chilla", "calories": 260, "protein": 14, "carbs": 22, "fats": 10 },
{ "name": "Oats Chilla", "calories": 180, "protein": 6, "carbs": 26, "fats": 4 },
{ "name": "Pesarattu", "calories": 210, "protein": 10, "carbs": 28, "fats": 5 },
{ "name": "Upma", "calories": 230, "protein": 6, "carbs": 38, "fats": 6 },
{ "name": "Vegetable Upma", "calories": 250, "protein": 7, "carbs": 40, "fats": 6 },
{ "name": "Lemon Rice", "calories": 260, "protein": 5, "carbs": 44, "fats": 6 },
{ "name": "Tomato Bath", "calories": 270, "protein": 6, "carbs": 46, "fats": 6 },
{ "name": "Vangi Bath", "calories": 290, "protein": 6, "carbs": 48, "fats": 7 },{ "name": "Idiyappam", "calories": 160, "protein": 3, "carbs": 34, "fats": 1 },
{ "name": "Vegetable Stew", "calories": 180, "protein": 4, "carbs": 20, "fats": 8 },
{ "name": "Chicken Stew", "calories": 240, "protein": 18, "carbs": 10, "fats": 14 },
{ "name": "Egg Appam", "calories": 170, "protein": 6, "carbs": 24, "fats": 5 },
{ "name": "Plain Appam", "calories": 120, "protein": 2, "carbs": 26, "fats": 1 },
{ "name": "Idli Sambar", "calories": 200, "protein": 6, "carbs": 36, "fats": 3 },
{ "name": "Masala Dosa", "calories": 310, "protein": 8, "carbs": 46, "fats": 10 },
{ "name": "Cheese Masala Dosa", "calories": 360, "protein": 12, "carbs": 44, "fats": 14 },
{ "name": "Paneer Masala Dosa", "calories": 390, "protein": 16, "carbs": 42, "fats": 16 },
{ "name": "Uttapam Plain", "calories": 210, "protein": 6, "carbs": 34, "fats": 5 },
{ "name": "Onion Uttapam", "calories": 240, "protein": 7, "carbs": 36, "fats": 6 },
{ "name": "Paneer Uttapam", "calories": 300, "protein": 14, "carbs": 34, "fats": 10 },
{ "name": "Veg Sandwich", "calories": 260, "protein": 7, "carbs": 36, "fats": 9 },
{ "name": "Grilled Veg Sandwich", "calories": 290, "protein": 8, "carbs": 38, "fats": 10 },
{ "name": "Paneer Sandwich", "calories": 340, "protein": 14, "carbs": 36, "fats": 14 },
{ "name": "Chicken Sandwich", "calories": 360, "protein": 20, "carbs": 34, "fats": 14 },
{ "name": "Veg Burger", "calories": 320, "protein": 9, "carbs": 42, "fats": 12 },
{ "name": "Paneer Burger", "calories": 390, "protein": 16, "carbs": 40, "fats": 16 },
{ "name": "Chicken Burger", "calories": 420, "protein": 22, "carbs": 38, "fats": 18 },
{ "name": "French Fries", "calories": 340, "protein": 4, "carbs": 44, "fats": 16 },
{ "name": "Peri Peri Fries", "calories": 360, "protein": 4, "carbs": 46, "fats": 18 },
{ "name": "Veg Momos", "calories": 260, "protein": 8, "carbs": 38, "fats": 6 },
{ "name": "Paneer Momos", "calories": 310, "protein": 14, "carbs": 36, "fats": 10 },
{ "name": "Chicken Momos", "calories": 340, "protein": 20, "carbs": 34, "fats": 12 },
{ "name": "Veg Spring Roll", "calories": 280, "protein": 6, "carbs": 34, "fats": 12 },
{ "name": "Chicken Spring Roll", "calories": 320, "protein": 14, "carbs": 32, "fats": 14 },
{ "name": "Veg Frankie", "calories": 330, "protein": 8, "carbs": 44, "fats": 12 },
{ "name": "Paneer Frankie", "calories": 390, "protein": 16, "carbs": 42, "fats": 16 },
{ "name": "Chicken Frankie", "calories": 420, "protein": 22, "carbs": 40, "fats": 18 },
{ "name": "Veg Puff", "calories": 300, "protein": 6, "carbs": 34, "fats": 16 },
{ "name": "Paneer Puff", "calories": 340, "protein": 12, "carbs": 32, "fats": 18 },
{ "name": "Chicken Puff", "calories": 360, "protein": 16, "carbs": 30, "fats": 20 },
{ "name": "Samosa Veg", "calories": 260, "protein": 6, "carbs": 32, "fats": 12 },
{ "name": "Paneer Samosa", "calories": 310, "protein": 12, "carbs": 30, "fats": 16 },
{ "name": "Chicken Samosa", "calories": 330, "protein": 14, "carbs": 28, "fats": 18 },{ "name": "Veg Cutlet", "calories": 290, "protein": 7, "carbs": 34, "fats": 14 },
{ "name": "Paneer Cutlet", "calories": 340, "protein": 14, "carbs": 32, "fats": 18 },
{ "name": "Chicken Cutlet", "calories": 360, "protein": 18, "carbs": 28, "fats": 20 },
{ "name": "Aloo Tikki", "calories": 210, "protein": 4, "carbs": 30, "fats": 8 },
{ "name": "Cheese Balls", "calories": 360, "protein": 12, "carbs": 22, "fats": 26 },
{ "name": "Mozzarella Sticks", "calories": 390, "protein": 16, "carbs": 26, "fats": 28 },
{ "name": "Onion Rings", "calories": 330, "protein": 5, "carbs": 38, "fats": 18 },
{ "name": "Veg Nuggets", "calories": 300, "protein": 10, "carbs": 30, "fats": 16 },
{ "name": "Chicken Nuggets", "calories": 340, "protein": 18, "carbs": 26, "fats": 20 },
{ "name": "Popcorn Salted", "calories": 180, "protein": 4, "carbs": 24, "fats": 7 },
{ "name": "Popcorn Butter", "calories": 260, "protein": 5, "carbs": 28, "fats": 14 },
{ "name": "Bhel Puri", "calories": 220, "protein": 5, "carbs": 34, "fats": 7 },
{ "name": "Sev Puri", "calories": 260, "protein": 6, "carbs": 36, "fats": 10 },
{ "name": "Pani Puri", "calories": 180, "protein": 4, "carbs": 28, "fats": 6 },
{ "name": "Ragda Pattice", "calories": 320, "protein": 10, "carbs": 40, "fats": 12 },
{ "name": "Vada Pav", "calories": 290, "protein": 7, "carbs": 38, "fats": 12 },
{ "name": "Misal Pav", "calories": 380, "protein": 14, "carbs": 42, "fats": 16 },
{ "name": "Pav Bhaji", "calories": 420, "protein": 10, "carbs": 48, "fats": 18 },
{ "name": "Butter Pav Bhaji", "calories": 480, "protein": 11, "carbs": 50, "fats": 22 },
{ "name": "Veg Kathi Roll", "calories": 340, "protein": 9, "carbs": 42, "fats": 14 },
{ "name": "Paneer Kathi Roll", "calories": 410, "protein": 16, "carbs": 40, "fats": 18 },
{ "name": "Chicken Kathi Roll", "calories": 450, "protein": 22, "carbs": 38, "fats": 20 },
{ "name": "Veg Fried Rice", "calories": 330, "protein": 8, "carbs": 52, "fats": 10 },
{ "name": "Paneer Fried Rice", "calories": 390, "protein": 14, "carbs": 50, "fats": 14 },
{ "name": "Chicken Fried Rice", "calories": 420, "protein": 20, "carbs": 48, "fats": 16 },
{ "name": "Veg Hakka Noodles", "calories": 350, "protein": 9, "carbs": 50, "fats": 12 },
{ "name": "Paneer Hakka Noodles", "calories": 400, "protein": 15, "carbs": 48, "fats": 16 },
{ "name": "Chicken Hakka Noodles", "calories": 430, "protein": 22, "carbs": 46, "fats": 18 },
{ "name": "Veg Manchurian Dry", "calories": 300, "protein": 8, "carbs": 34, "fats": 14 },
{ "name": "Veg Manchurian Gravy", "calories": 340, "protein": 9, "carbs": 38, "fats": 16 },
{ "name": "Paneer Manchurian", "calories": 380, "protein": 14, "carbs": 36, "fats": 18 },
{ "name": "Chicken Manchurian", "calories": 420, "protein": 22, "carbs": 32, "fats": 20 },
{ "name": "Veg Clear Soup", "calories": 90, "protein": 3, "carbs": 14, "fats": 2 },
{ "name": "Sweet Corn Soup", "calories": 150, "protein": 5, "carbs": 24, "fats": 4 },
{ "name": "Tomato Soup", "calories": 120, "protein": 3, "carbs": 20, "fats": 3 },
{ "name": "Hot and Sour Soup", "calories": 160, "protein": 6, "carbs": 18, "fats": 5 },
{ "name": "Chicken Clear Soup", "calories": 140, "protein": 12, "carbs": 6, "fats": 4 },
{ "name": "Chicken Sweet Corn Soup", "calories": 190, "protein": 14, "carbs": 16, "fats": 6 },{ "name": "Vanilla Ice Cream", "calories": 210, "protein": 4, "carbs": 24, "fats": 11 },
{ "name": "Chocolate Ice Cream", "calories": 230, "protein": 4, "carbs": 26, "fats": 13 },
{ "name": "Strawberry Ice Cream", "calories": 220, "protein": 4, "carbs": 25, "fats": 12 },
{ "name": "Butterscotch Ice Cream", "calories": 240, "protein": 4, "carbs": 27, "fats": 14 },
{ "name": "Kulfi", "calories": 260, "protein": 6, "carbs": 28, "fats": 14 },
{ "name": "Falooda", "calories": 420, "protein": 8, "carbs": 58, "fats": 18 },
{ "name": "Gulab Jamun", "calories": 175, "protein": 3, "carbs": 24, "fats": 7 },
{ "name": "Rasgulla", "calories": 140, "protein": 4, "carbs": 22, "fats": 4 },
{ "name": "Rasmalai", "calories": 260, "protein": 8, "carbs": 26, "fats": 14 },
{ "name": "Jalebi", "calories": 310, "protein": 3, "carbs": 48, "fats": 12 },
{ "name": "Kaju Katli", "calories": 180, "protein": 5, "carbs": 16, "fats": 10 },
{ "name": "Soan Papdi", "calories": 210, "protein": 4, "carbs": 22, "fats": 12 },
{ "name": "Ladoo Besan", "calories": 240, "protein": 6, "carbs": 22, "fats": 14 },
{ "name": "Motichoor Ladoo", "calories": 260, "protein": 5, "carbs": 28, "fats": 14 },
{ "name": "Milk Cake", "calories": 290, "protein": 7, "carbs": 26, "fats": 16 },
{ "name": "Barfi Plain", "calories": 230, "protein": 5, "carbs": 22, "fats": 14 },
{ "name": "Chocolate Brownie", "calories": 350, "protein": 6, "carbs": 44, "fats": 18 },
{ "name": "Chocolate Lava Cake", "calories": 420, "protein": 7, "carbs": 48, "fats": 22 },
{ "name": "Black Forest Cake", "calories": 390, "protein": 6, "carbs": 46, "fats": 20 },
{ "name": "Red Velvet Cake", "calories": 410, "protein": 6, "carbs": 48, "fats": 22 },
{ "name": "Cupcake Vanilla", "calories": 260, "protein": 4, "carbs": 32, "fats": 12 },
{ "name": "Cupcake Chocolate", "calories": 280, "protein": 5, "carbs": 34, "fats": 14 },
{ "name": "Donut Glazed", "calories": 270, "protein": 4, "carbs": 31, "fats": 14 },
{ "name": "Donut Chocolate", "calories": 300, "protein": 5, "carbs": 34, "fats": 16 },
{ "name": "Marie Biscuit", "calories": 430, "protein": 8, "carbs": 72, "fats": 10 },
{ "name": "Good Day Biscuit", "calories": 480, "protein": 7, "carbs": 66, "fats": 20 },
{ "name": "Oreo Biscuit", "calories": 470, "protein": 6, "carbs": 68, "fats": 20 },
{ "name": "Hide and Seek Biscuit", "calories": 500, "protein": 7, "carbs": 68, "fats": 22 },
{ "name": "Cream Cracker Biscuit", "calories": 450, "protein": 8, "carbs": 70, "fats": 14 },
{ "name": "Rusk Toast", "calories": 420, "protein": 9, "carbs": 72, "fats": 10 },
{ "name": "Khari Biscuit", "calories": 520, "protein": 8, "carbs": 62, "fats": 26 },
{ "name": "Jeera Biscuit", "calories": 490, "protein": 8, "carbs": 66, "fats": 22 },
{ "name": "Butter Cookie", "calories": 530, "protein": 6, "carbs": 64, "fats": 28 },
{ "name": "Chocolate Cookie", "calories": 550, "protein": 6, "carbs": 66, "fats": 30 },
{ "name": "Protein Biscuit", "calories": 420, "protein": 18, "carbs": 52, "fats": 14 },
{ "name": "Namkeen Mixture", "calories": 560, "protein": 10, "carbs": 54, "fats": 34 },
{ "name": "Roasted Chana", "calories": 380, "protein": 20, "carbs": 52, "fats": 6 },
{ "name": "Roasted Peanuts", "calories": 570, "protein": 26, "carbs": 18, "fats": 48 },
{ "name": "Salted Cashew", "calories": 560, "protein": 18, "carbs": 30, "fats": 44 },
{ "name": "Roasted Almonds", "calories": 580, "protein": 21, "carbs": 22, "fats": 50 },
{ "name": "Trail Mix Dry Fruits", "calories": 520, "protein": 14, "carbs": 46, "fats": 34 },
{ "name": "Energy Bar", "calories": 210, "protein": 10, "carbs": 26, "fats": 8 },
{ "name": "Protein Bar", "calories": 240, "protein": 20, "carbs": 22, "fats": 8 },
{ "name": "Granola Bar", "calories": 190, "protein": 6, "carbs": 28, "fats": 7 },
{ "name": "Milk Chocolate", "calories": 540, "protein": 7, "carbs": 58, "fats": 30 },
{ "name": "Dark Chocolate", "calories": 520, "protein": 8, "carbs": 46, "fats": 34 },{ "name": "Cold Coffee", "calories": 180, "protein": 6, "carbs": 24, "fats": 6 },
{ "name": "Cold Coffee with Ice Cream", "calories": 320, "protein": 8, "carbs": 36, "fats": 14 },
{ "name": "Chocolate Milkshake", "calories": 340, "protein": 10, "carbs": 42, "fats": 14 },
{ "name": "Strawberry Milkshake", "calories": 310, "protein": 9, "carbs": 40, "fats": 12 },
{ "name": "Mango Milkshake", "calories": 330, "protein": 9, "carbs": 44, "fats": 12 },
{ "name": "Banana Milkshake", "calories": 360, "protein": 10, "carbs": 48, "fats": 12 },
{ "name": "Oreo Milkshake", "calories": 420, "protein": 11, "carbs": 52, "fats": 18 },
{ "name": "Vanilla Milkshake", "calories": 300, "protein": 9, "carbs": 38, "fats": 12 },
{ "name": "Protein Shake Whey", "calories": 160, "protein": 24, "carbs": 6, "fats": 2 },
{ "name": "Protein Shake Banana", "calories": 220, "protein": 26, "carbs": 18, "fats": 3 },
{ "name": "Protein Shake Chocolate", "calories": 190, "protein": 25, "carbs": 10, "fats": 3 },
{ "name": "Mass Gainer Shake", "calories": 520, "protein": 30, "carbs": 68, "fats": 10 },
{ "name": "Horlicks Milk", "calories": 190, "protein": 7, "carbs": 28, "fats": 5 },
{ "name": "Bournvita Milk", "calories": 210, "protein": 7, "carbs": 32, "fats": 6 },
{ "name": "Boost Milk", "calories": 220, "protein": 7, "carbs": 34, "fats": 6 },
{ "name": "Complan Milk", "calories": 230, "protein": 8, "carbs": 32, "fats": 7 },
{ "name": "Badam Milk", "calories": 260, "protein": 9, "carbs": 30, "fats": 10 },
{ "name": "Kesar Milk", "calories": 250, "protein": 8, "carbs": 28, "fats": 10 },
{ "name": "Turmeric Milk", "calories": 170, "protein": 6, "carbs": 18, "fats": 6 },
{ "name": "Lassi Sweet", "calories": 280, "protein": 9, "carbs": 34, "fats": 10 },
{ "name": "Lassi Mango", "calories": 320, "protein": 8, "carbs": 42, "fats": 12 },
{ "name": "Lassi Salted", "calories": 180, "protein": 8, "carbs": 16, "fats": 6 },
{ "name": "Buttermilk Chaas", "calories": 60, "protein": 3, "carbs": 6, "fats": 2 },
{ "name": "Masala Chaas", "calories": 70, "protein": 3, "carbs": 7, "fats": 2 },
{ "name": "Fresh Lime Soda", "calories": 120, "protein": 0, "carbs": 30, "fats": 0 },
{ "name": "Masala Lemon Soda", "calories": 140, "protein": 0, "carbs": 34, "fats": 0 },
{ "name": "Sugarcane Juice", "calories": 180, "protein": 0, "carbs": 44, "fats": 0 },
{ "name": "Aam Panna", "calories": 160, "protein": 0, "carbs": 40, "fats": 0 },
{ "name": "Kokum Sharbat", "calories": 150, "protein": 0, "carbs": 38, "fats": 0 },
{ "name": "Rose Sharbat", "calories": 170, "protein": 0, "carbs": 42, "fats": 0 },
{ "name": "Jaljeera", "calories": 60, "protein": 0, "carbs": 14, "fats": 0 },
{ "name": "Coconut Water", "calories": 45, "protein": 1, "carbs": 11, "fats": 0 },
{ "name": "Orange Juice Fresh", "calories": 110, "protein": 2, "carbs": 26, "fats": 0 },
{ "name": "Apple Juice", "calories": 120, "protein": 0, "carbs": 28, "fats": 0 },
{ "name": "Mixed Fruit Juice", "calories": 140, "protein": 2, "carbs": 32, "fats": 0 },
{ "name": "Pomegranate Juice", "calories": 130, "protein": 1, "carbs": 30, "fats": 0 },
{ "name": "Watermelon Juice", "calories": 90, "protein": 1, "carbs": 22, "fats": 0 },
{ "name": "Energy Drink", "calories": 110, "protein": 0, "carbs": 28, "fats": 0 },
{ "name": "Sports Drink", "calories": 90, "protein": 0, "carbs": 22, "fats": 0 },
{ "name": "Iced Tea Lemon", "calories": 80, "protein": 0, "carbs": 20, "fats": 0 },
{ "name": "Green Tea Honey", "calories": 40, "protein": 0, "carbs": 10, "fats": 0 },{ "name": "Vada Pav", "calories": 290, "protein": 7, "carbs": 36, "fats": 12 },
{ "name": "Butter Vada Pav", "calories": 360, "protein": 8, "carbs": 38, "fats": 18 },
{ "name": "Cheese Vada Pav", "calories": 380, "protein": 10, "carbs": 36, "fats": 20 },
{ "name": "Samosa Pav", "calories": 330, "protein": 8, "carbs": 40, "fats": 14 },
{ "name": "Pav Bhaji", "calories": 400, "protein": 10, "carbs": 48, "fats": 18 },
{ "name": "Butter Pav Bhaji", "calories": 480, "protein": 11, "carbs": 50, "fats": 26 },
{ "name": "Cheese Pav Bhaji", "calories": 520, "protein": 14, "carbs": 48, "fats": 28 },
{ "name": "Misal Pav", "calories": 380, "protein": 12, "carbs": 45, "fats": 16 },
{ "name": "Usal Pav", "calories": 340, "protein": 11, "carbs": 42, "fats": 12 },
{ "name": "Poha", "calories": 250, "protein": 6, "carbs": 42, "fats": 6 },
{ "name": "Kanda Poha", "calories": 270, "protein": 6, "carbs": 44, "fats": 7 },
{ "name": "Batata Poha", "calories": 290, "protein": 6, "carbs": 46, "fats": 8 },
{ "name": "Upma", "calories": 260, "protein": 7, "carbs": 40, "fats": 7 },
{ "name": "Vegetable Upma", "calories": 280, "protein": 8, "carbs": 42, "fats": 7 },
{ "name": "Sheera", "calories": 320, "protein": 6, "carbs": 46, "fats": 12 },
{ "name": "Sabudana Khichdi", "calories": 420, "protein": 6, "carbs": 68, "fats": 14 },
{ "name": "Sabudana Vada", "calories": 350, "protein": 5, "carbs": 44, "fats": 16 },
{ "name": "Dahi Vada", "calories": 280, "protein": 8, "carbs": 34, "fats": 10 },
{ "name": "Medu Vada", "calories": 220, "protein": 6, "carbs": 26, "fats": 10 },
{ "name": "Idli Sambhar", "calories": 200, "protein": 7, "carbs": 36, "fats": 3 },
{ "name": "Butter Idli", "calories": 260, "protein": 7, "carbs": 36, "fats": 8 },
{ "name": "Plain Dosa", "calories": 280, "protein": 7, "carbs": 42, "fats": 8 },
{ "name": "Masala Dosa", "calories": 340, "protein": 8, "carbs": 48, "fats": 12 },
{ "name": "Butter Masala Dosa", "calories": 420, "protein": 9, "carbs": 50, "fats": 18 },
{ "name": "Cheese Masala Dosa", "calories": 460, "protein": 12, "carbs": 48, "fats": 22 },
{ "name": "Set Dosa", "calories": 310, "protein": 8, "carbs": 46, "fats": 8 },
{ "name": "Uttapam Plain", "calories": 260, "protein": 7, "carbs": 40, "fats": 6 },
{ "name": "Onion Uttapam", "calories": 300, "protein": 8, "carbs": 42, "fats": 8 },
{ "name": "Vegetable Uttapam", "calories": 320, "protein": 9, "carbs": 44, "fats": 8 },
{ "name": "Appe Paniyaram", "calories": 240, "protein": 6, "carbs": 34, "fats": 8 },
{ "name": "Punugulu", "calories": 260, "protein": 6, "carbs": 36, "fats": 9 },
{ "name": "Bread Pakora", "calories": 360, "protein": 8, "carbs": 38, "fats": 18 },
{ "name": "Aloo Pakora", "calories": 280, "protein": 5, "carbs": 32, "fats": 14 },
{ "name": "Onion Pakora", "calories": 260, "protein": 5, "carbs": 30, "fats": 12 },
{ "name": "Mixed Veg Pakora", "calories": 300, "protein": 6, "carbs": 34, "fats": 14 },
{ "name": "Paneer Pakora", "calories": 340, "protein": 12, "carbs": 28, "fats": 18 },
{ "name": "Cheese Pakora", "calories": 380, "protein": 14, "carbs": 26, "fats": 22 },
{ "name": "French Fries", "calories": 310, "protein": 4, "carbs": 38, "fats": 16 },
{ "name": "Peri Peri Fries", "calories": 330, "protein": 4, "carbs": 38, "fats": 18 },
{ "name": "Cheese Fries", "calories": 420, "protein": 10, "carbs": 36, "fats": 24 },
{ "name": "Veg Cutlet", "calories": 220, "protein": 6, "carbs": 28, "fats": 10 },
{ "name": "Paneer Cutlet", "calories": 280, "protein": 10, "carbs": 26, "fats": 14 },
{ "name": "Cheese Cutlet", "calories": 320, "protein": 12, "carbs": 24, "fats": 18 },{ "name": "Veg Momos", "calories": 220, "protein": 8, "carbs": 34, "fats": 6 },
{ "name": "Paneer Momos", "calories": 260, "protein": 11, "carbs": 30, "fats": 10 },
{ "name": "Cheese Momos", "calories": 300, "protein": 13, "carbs": 28, "fats": 14 },
{ "name": "Fried Momos", "calories": 340, "protein": 9, "carbs": 36, "fats": 16 },
{ "name": "Tandoori Momos", "calories": 320, "protein": 12, "carbs": 28, "fats": 14 },
{ "name": "Chicken Momos", "calories": 280, "protein": 16, "carbs": 26, "fats": 10 },
{ "name": "Chicken Fried Momos", "calories": 360, "protein": 17, "carbs": 28, "fats": 16 },

{ "name": "Veg Frankie", "calories": 330, "protein": 9, "carbs": 42, "fats": 14 },
{ "name": "Paneer Frankie", "calories": 380, "protein": 14, "carbs": 40, "fats": 18 },
{ "name": "Cheese Frankie", "calories": 420, "protein": 16, "carbs": 38, "fats": 22 },
{ "name": "Egg Frankie", "calories": 360, "protein": 14, "carbs": 38, "fats": 16 },
{ "name": "Chicken Frankie", "calories": 410, "protein": 18, "carbs": 36, "fats": 18 },

{ "name": "Veg Sandwich", "calories": 260, "protein": 8, "carbs": 38, "fats": 8 },
{ "name": "Grilled Veg Sandwich", "calories": 300, "protein": 9, "carbs": 40, "fats": 10 },
{ "name": "Cheese Sandwich", "calories": 340, "protein": 12, "carbs": 36, "fats": 16 },
{ "name": "Paneer Sandwich", "calories": 360, "protein": 14, "carbs": 34, "fats": 16 },
{ "name": "Chicken Sandwich", "calories": 380, "protein": 18, "carbs": 32, "fats": 14 },

{ "name": "Veg Burger", "calories": 320, "protein": 9, "carbs": 38, "fats": 14 },
{ "name": "Cheese Burger", "calories": 380, "protein": 12, "carbs": 36, "fats": 18 },
{ "name": "Paneer Burger", "calories": 420, "protein": 16, "carbs": 34, "fats": 20 },
{ "name": "Chicken Burger", "calories": 450, "protein": 22, "carbs": 32, "fats": 20 },
{ "name": "Zinger Burger", "calories": 520, "protein": 24, "carbs": 34, "fats": 26 },

{ "name": "Veg Pizza Slice", "calories": 280, "protein": 10, "carbs": 36, "fats": 10 },
{ "name": "Cheese Pizza Slice", "calories": 320, "protein": 12, "carbs": 34, "fats": 14 },
{ "name": "Paneer Pizza Slice", "calories": 360, "protein": 14, "carbs": 32, "fats": 16 },
{ "name": "Chicken Pizza Slice", "calories": 380, "protein": 18, "carbs": 30, "fats": 16 },

{ "name": "Veg Puff", "calories": 240, "protein": 6, "carbs": 28, "fats": 12 },
{ "name": "Paneer Puff", "calories": 280, "protein": 9, "carbs": 26, "fats": 14 },
{ "name": "Chicken Puff", "calories": 300, "protein": 12, "carbs": 24, "fats": 14 },
{ "name": "Egg Puff", "calories": 260, "protein": 9, "carbs": 26, "fats": 12 },

{ "name": "Chocolate Brownie", "calories": 360, "protein": 6, "carbs": 44, "fats": 18 },
{ "name": "Chocolate Lava Cake", "calories": 420, "protein": 7, "carbs": 48, "fats": 22 },
{ "name": "Cupcake Vanilla", "calories": 260, "protein": 4, "carbs": 34, "fats": 12 },
{ "name": "Cupcake Chocolate", "calories": 300, "protein": 5, "carbs": 36, "fats": 14 },
{ "name": "Donut Glazed", "calories": 280, "protein": 4, "carbs": 38, "fats": 12 },
{ "name": "Donut Chocolate", "calories": 320, "protein": 5, "carbs": 40, "fats": 14 },

{ "name": "Gulab Jamun", "calories": 300, "protein": 5, "carbs": 46, "fats": 10 },
{ "name": "Rasgulla", "calories": 240, "protein": 6, "carbs": 40, "fats": 6 },
{ "name": "Rasmalai", "calories": 360, "protein": 8, "carbs": 42, "fats": 16 },
{ "name": "Kheer", "calories": 280, "protein": 7, "carbs": 38, "fats": 10 },
{ "name": "Ice Cream Vanilla", "calories": 220, "protein": 4, "carbs": 28, "fats": 10 },
{ "name": "Ice Cream Chocolate", "calories": 260, "protein": 4, "carbs": 30, "fats": 12 },{ "name": "Samosa", "calories": 180, "protein": 4, "carbs": 22, "fats": 9 },
{ "name": "Paneer Samosa", "calories": 220, "protein": 7, "carbs": 20, "fats": 12 },
{ "name": "Chicken Samosa", "calories": 240, "protein": 9, "carbs": 18, "fats": 12 },
{ "name": "Aloo Pakora", "calories": 260, "protein": 5, "carbs": 30, "fats": 14 },
{ "name": "Onion Pakora", "calories": 280, "protein": 6, "carbs": 32, "fats": 15 },
{ "name": "Paneer Pakora", "calories": 320, "protein": 12, "carbs": 22, "fats": 20 },
{ "name": "Chicken Pakora", "calories": 340, "protein": 16, "carbs": 18, "fats": 22 },

{ "name": "Pani Puri", "calories": 220, "protein": 6, "carbs": 34, "fats": 6 },
{ "name": "Sev Puri", "calories": 280, "protein": 7, "carbs": 38, "fats": 10 },
{ "name": "Bhel Puri", "calories": 260, "protein": 6, "carbs": 42, "fats": 6 },
{ "name": "Dahi Puri", "calories": 300, "protein": 9, "carbs": 36, "fats": 10 },
{ "name": "Ragda Pattice", "calories": 340, "protein": 10, "carbs": 44, "fats": 12 },
{ "name": "Aloo Chaat", "calories": 320, "protein": 6, "carbs": 48, "fats": 10 },

{ "name": "Vada Pav", "calories": 290, "protein": 7, "carbs": 38, "fats": 12 },
{ "name": "Butter Vada Pav", "calories": 340, "protein": 7, "carbs": 38, "fats": 16 },
{ "name": "Cheese Vada Pav", "calories": 380, "protein": 10, "carbs": 36, "fats": 18 },
{ "name": "Misal Pav", "calories": 420, "protein": 14, "carbs": 46, "fats": 18 },
{ "name": "Usal Pav", "calories": 360, "protein": 12, "carbs": 44, "fats": 14 },

{ "name": "Poha", "calories": 260, "protein": 6, "carbs": 42, "fats": 6 },
{ "name": "Kanda Poha", "calories": 280, "protein": 6, "carbs": 44, "fats": 7 },
{ "name": "Upma", "calories": 240, "protein": 7, "carbs": 38, "fats": 6 },
{ "name": "Sheera", "calories": 360, "protein": 6, "carbs": 48, "fats": 14 },

{ "name": "Plain Dosa", "calories": 260, "protein": 6, "carbs": 44, "fats": 6 },
{ "name": "Masala Dosa", "calories": 320, "protein": 8, "carbs": 45, "fats": 12 },
{ "name": "Butter Dosa", "calories": 360, "protein": 7, "carbs": 44, "fats": 16 },
{ "name": "Paneer Dosa", "calories": 380, "protein": 12, "carbs": 42, "fats": 16 },

{ "name": "Idli", "calories": 120, "protein": 4, "carbs": 22, "fats": 1 },
{ "name": "Butter Idli", "calories": 180, "protein": 4, "carbs": 22, "fats": 6 },
{ "name": "Fried Idli", "calories": 260, "protein": 6, "carbs": 30, "fats": 12 },
{ "name": "Idli Sambhar", "calories": 220, "protein": 7, "carbs": 34, "fats": 4 },

{ "name": "Medu Vada", "calories": 200, "protein": 6, "carbs": 24, "fats": 8 },
{ "name": "Sambhar Vada", "calories": 260, "protein": 8, "carbs": 30, "fats": 10 },

{ "name": "Milk Tea", "calories": 120, "protein": 3, "carbs": 18, "fats": 4 },
{ "name": "Black Tea", "calories": 30, "protein": 1, "carbs": 6, "fats": 0 },
{ "name": "Coffee", "calories": 80, "protein": 2, "carbs": 10, "fats": 2 },
{ "name": "Cold Coffee", "calories": 180, "protein": 4, "carbs": 24, "fats": 6 },
{ "name": "Milk Shake Vanilla", "calories": 260, "protein": 6, "carbs": 34, "fats": 10 },
{ "name": "Milk Shake Chocolate", "calories": 300, "protein": 7, "carbs": 38, "fats": 12 },{ "name": "Lay's Classic Salted Chips", "calories": 160, "protein": 2, "carbs": 15, "fats": 10 },
{ "name": "Lay's Magic Masala Chips", "calories": 170, "protein": 2, "carbs": 16, "fats": 11 },
{ "name": "Kurkure Masala Munch", "calories": 180, "protein": 3, "carbs": 20, "fats": 10 },
{ "name": "Bingo Mad Angles", "calories": 190, "protein": 3, "carbs": 22, "fats": 11 },
{ "name": "Uncle Chips", "calories": 170, "protein": 2, "carbs": 18, "fats": 10 },

{ "name": "Haldiram Aloo Bhujia", "calories": 290, "protein": 7, "carbs": 32, "fats": 16 },
{ "name": "Haldiram Sev Bhujia", "calories": 300, "protein": 8, "carbs": 30, "fats": 18 },
{ "name": "Haldiram Khatta Meetha", "calories": 280, "protein": 6, "carbs": 38, "fats": 12 },
{ "name": "Haldiram Navratan Mixture", "calories": 310, "protein": 8, "carbs": 34, "fats": 18 },

{ "name": "Marie Biscuit", "calories": 90, "protein": 2, "carbs": 16, "fats": 2 },
{ "name": "Good Day Biscuit", "calories": 150, "protein": 2, "carbs": 18, "fats": 8 },
{ "name": "Hide & Seek Biscuit", "calories": 160, "protein": 2, "carbs": 20, "fats": 8 },
{ "name": "Bourbon Biscuit", "calories": 170, "protein": 2, "carbs": 22, "fats": 9 },
{ "name": "Oreo Biscuit", "calories": 160, "protein": 2, "carbs": 21, "fats": 7 },

{ "name": "Rusk Toast", "calories": 120, "protein": 3, "carbs": 20, "fats": 4 },
{ "name": "Cake Rusk", "calories": 150, "protein": 3, "carbs": 24, "fats": 5 },

{ "name": "Peanut Chikki", "calories": 180, "protein": 6, "carbs": 20, "fats": 9 },
{ "name": "Til Chikki", "calories": 190, "protein": 5, "carbs": 22, "fats": 10 },

{ "name": "Roasted Peanuts", "calories": 170, "protein": 7, "carbs": 6, "fats": 14 },
{ "name": "Masala Peanuts", "calories": 190, "protein": 7, "carbs": 10, "fats": 15 },
{ "name": "Salted Cashews", "calories": 160, "protein": 5, "carbs": 9, "fats": 13 },
{ "name": "Roasted Almonds", "calories": 170, "protein": 6, "carbs": 6, "fats": 15 },
{ "name": "Pistachios Roasted", "calories": 160, "protein": 6, "carbs": 8, "fats": 13 },

{ "name": "Dates", "calories": 140, "protein": 1, "carbs": 38, "fats": 0 },
{ "name": "Raisins", "calories": 130, "protein": 1, "carbs": 34, "fats": 0 },
{ "name": "Dried Figs", "calories": 120, "protein": 2, "carbs": 30, "fats": 0 },

{ "name": "Protein Bar", "calories": 220, "protein": 15, "carbs": 22, "fats": 8 },
{ "name": "Granola Bar", "calories": 190, "protein": 6, "carbs": 26, "fats": 7 },
{ "name": "Energy Bar", "calories": 210, "protein": 8, "carbs": 28, "fats": 8 },

{ "name": "Whey Protein Shake", "calories": 120, "protein": 24, "carbs": 4, "fats": 2 },
{ "name": "Protein Smoothie", "calories": 180, "protein": 20, "carbs": 18, "fats": 4 },

{ "name": "Coca Cola", "calories": 140, "protein": 0, "carbs": 35, "fats": 0 },
{ "name": "Pepsi", "calories": 150, "protein": 0, "carbs": 38, "fats": 0 },
{ "name": "Sprite", "calories": 140, "protein": 0, "carbs": 36, "fats": 0 },

{ "name": "Fresh Lime Soda", "calories": 90, "protein": 0, "carbs": 22, "fats": 0 },
{ "name": "Sugarcane Juice", "calories": 180, "protein": 0, "carbs": 45, "fats": 0 },
{ "name": "Coconut Water", "calories": 60, "protein": 1, "carbs": 15, "fats": 0 },{ "name": "Gulab Jamun", "calories": 175, "protein": 3, "carbs": 28, "fats": 6 },
{ "name": "Rasgulla", "calories": 130, "protein": 4, "carbs": 24, "fats": 1 },
{ "name": "Rasmalai", "calories": 220, "protein": 6, "carbs": 26, "fats": 10 },
{ "name": "Jalebi", "calories": 180, "protein": 2, "carbs": 35, "fats": 5 },
{ "name": "Kaju Katli", "calories": 200, "protein": 4, "carbs": 18, "fats": 12 },
{ "name": "Mysore Pak", "calories": 210, "protein": 3, "carbs": 22, "fats": 14 },
{ "name": "Motichoor Ladoo", "calories": 190, "protein": 3, "carbs": 25, "fats": 9 },
{ "name": "Boondi Ladoo", "calories": 180, "protein": 3, "carbs": 24, "fats": 8 },
{ "name": "Soan Papdi", "calories": 140, "protein": 2, "carbs": 20, "fats": 6 },
{ "name": "Milk Cake", "calories": 210, "protein": 5, "carbs": 25, "fats": 10 },

{ "name": "Vanilla Ice Cream", "calories": 140, "protein": 3, "carbs": 18, "fats": 7 },
{ "name": "Chocolate Ice Cream", "calories": 160, "protein": 3, "carbs": 20, "fats": 8 },
{ "name": "Strawberry Ice Cream", "calories": 150, "protein": 3, "carbs": 19, "fats": 7 },
{ "name": "Kulfi", "calories": 180, "protein": 4, "carbs": 22, "fats": 9 },
{ "name": "Cassata Ice Cream", "calories": 190, "protein": 4, "carbs": 24, "fats": 9 },

{ "name": "Chocolate Brownie", "calories": 250, "protein": 4, "carbs": 32, "fats": 12 },
{ "name": "Chocolate Lava Cake", "calories": 320, "protein": 5, "carbs": 38, "fats": 18 },
{ "name": "Black Forest Cake", "calories": 280, "protein": 5, "carbs": 35, "fats": 14 },
{ "name": "White Forest Cake", "calories": 270, "protein": 5, "carbs": 34, "fats": 13 },
{ "name": "Red Velvet Cake", "calories": 300, "protein": 5, "carbs": 36, "fats": 16 },
{ "name": "Pineapple Cake", "calories": 260, "protein": 4, "carbs": 34, "fats": 12 },
{ "name": "Butterscotch Cake", "calories": 290, "protein": 5, "carbs": 35, "fats": 15 },

{ "name": "Milk Chocolate Bar", "calories": 210, "protein": 3, "carbs": 24, "fats": 12 },
{ "name": "Dark Chocolate", "calories": 180, "protein": 3, "carbs": 18, "fats": 11 },
{ "name": "Chocolate Truffles", "calories": 250, "protein": 4, "carbs": 26, "fats": 14 },

{ "name": "Cupcake Vanilla", "calories": 200, "protein": 3, "carbs": 26, "fats": 9 },
{ "name": "Cupcake Chocolate", "calories": 220, "protein": 4, "carbs": 28, "fats": 11 },
{ "name": "Donut Glazed", "calories": 260, "protein": 4, "carbs": 32, "fats": 14 },
{ "name": "Donut Chocolate", "calories": 280, "protein": 4, "carbs": 34, "fats": 15 },

{ "name": "Croissant Butter", "calories": 230, "protein": 5, "carbs": 26, "fats": 12 },
{ "name": "Croissant Chocolate", "calories": 260, "protein": 5, "carbs": 30, "fats": 14 },
{ "name": "Danish Pastry", "calories": 270, "protein": 5, "carbs": 32, "fats": 14 },

{ "name": "Veg Puff", "calories": 220, "protein": 4, "carbs": 24, "fats": 12 },
{ "name": "Paneer Puff", "calories": 250, "protein": 6, "carbs": 22, "fats": 14 },
{ "name": "Chicken Puff", "calories": 270, "protein": 9, "carbs": 20, "fats": 15 },

{ "name": "Cheese Balls", "calories": 290, "protein": 6, "carbs": 22, "fats": 18 },
{ "name": "Onion Rings", "calories": 260, "protein": 4, "carbs": 28, "fats": 14 },
{ "name": "Mozzarella Sticks", "calories": 300, "protein": 10, "carbs": 24, "fats": 18 },{ "name": "French Fries", "calories": 312, "protein": 4, "carbs": 41, "fats": 15 },
{ "name": "Cheese Fries", "calories": 380, "protein": 7, "carbs": 42, "fats": 22 },
{ "name": "Peri Peri Fries", "calories": 330, "protein": 4, "carbs": 40, "fats": 16 },

{ "name": "Veg Burger", "calories": 280, "protein": 7, "carbs": 35, "fats": 12 },
{ "name": "Paneer Burger", "calories": 340, "protein": 12, "carbs": 32, "fats": 18 },
{ "name": "Chicken Burger", "calories": 360, "protein": 18, "carbs": 30, "fats": 17 },
{ "name": "Chicken Zinger Burger", "calories": 420, "protein": 22, "carbs": 34, "fats": 22 },

{ "name": "Veg Pizza Slice", "calories": 270, "protein": 9, "carbs": 33, "fats": 11 },
{ "name": "Paneer Pizza Slice", "calories": 310, "protein": 12, "carbs": 32, "fats": 14 },
{ "name": "Chicken Pizza Slice", "calories": 330, "protein": 16, "carbs": 30, "fats": 15 },
{ "name": "Cheese Burst Pizza Slice", "calories": 380, "protein": 12, "carbs": 32, "fats": 22 },

{ "name": "Veg Sandwich", "calories": 220, "protein": 6, "carbs": 28, "fats": 9 },
{ "name": "Paneer Sandwich", "calories": 280, "protein": 10, "carbs": 26, "fats": 14 },
{ "name": "Chicken Sandwich", "calories": 300, "protein": 15, "carbs": 24, "fats": 13 },

{ "name": "Veg Frankie", "calories": 260, "protein": 6, "carbs": 32, "fats": 11 },
{ "name": "Paneer Frankie", "calories": 320, "protein": 12, "carbs": 30, "fats": 15 },
{ "name": "Chicken Frankie", "calories": 340, "protein": 18, "carbs": 28, "fats": 16 },
{ "name": "Egg Frankie", "calories": 290, "protein": 13, "carbs": 28, "fats": 13 },

{ "name": "Veg Momos Steamed", "calories": 180, "protein": 6, "carbs": 28, "fats": 4 },
{ "name": "Paneer Momos Steamed", "calories": 220, "protein": 10, "carbs": 26, "fats": 7 },
{ "name": "Chicken Momos Steamed", "calories": 240, "protein": 15, "carbs": 24, "fats": 6 },
{ "name": "Veg Momos Fried", "calories": 260, "protein": 6, "carbs": 30, "fats": 12 },
{ "name": "Chicken Momos Fried", "calories": 300, "protein": 16, "carbs": 28, "fats": 14 },

{ "name": "Veg Spring Roll", "calories": 240, "protein": 5, "carbs": 28, "fats": 12 },
{ "name": "Chicken Spring Roll", "calories": 280, "protein": 12, "carbs": 26, "fats": 14 },

{ "name": "Veg Nuggets", "calories": 260, "protein": 7, "carbs": 28, "fats": 14 },
{ "name": "Chicken Nuggets", "calories": 290, "protein": 14, "carbs": 24, "fats": 16 },

{ "name": "Cold Coffee", "calories": 180, "protein": 5, "carbs": 24, "fats": 7 },
{ "name": "Iced Latte", "calories": 150, "protein": 6, "carbs": 18, "fats": 5 },
{ "name": "Milkshake Vanilla", "calories": 260, "protein": 7, "carbs": 34, "fats": 10 },
{ "name": "Milkshake Chocolate", "calories": 300, "protein": 8, "carbs": 38, "fats": 12 },

{ "name": "Protein Shake Whey", "calories": 160, "protein": 25, "carbs": 6, "fats": 3 },
{ "name": "Banana Protein Shake", "calories": 220, "protein": 20, "carbs": 24, "fats": 4 },

{ "name": "Soft Drink Cola", "calories": 140, "protein": 0, "carbs": 35, "fats": 0 },
{ "name": "Fresh Lime Soda", "calories": 90, "protein": 0, "carbs": 22, "fats": 0 },
{ "name": "Sugarcane Juice", "calories": 180, "protein": 0, "carbs": 45, "fats": 0 },

{ "name": "Roasted Peanuts", "calories": 170, "protein": 7, "carbs": 6, "fats": 14 },
{ "name": "Masala Peanuts", "calories": 200, "protein": 8, "carbs": 10, "fats": 15 },
{ "name": "Roasted Chana", "calories": 120, "protein": 6, "carbs": 18, "fats": 2 },

{ "name": "Energy Bar", "calories": 220, "protein": 10, "carbs": 26, "fats": 8 },
{ "name": "Protein Bar", "calories": 240, "protein": 20, "carbs": 22, "fats": 8 },{ "name": "Chicken Shawarma Roll", "calories": 420, "protein": 28, "carbs": 34, "fats": 18 },
{ "name": "Chicken Shawarma Plate", "calories": 520, "protein": 35, "carbs": 30, "fats": 24 },
{ "name": "Veg Shawarma Roll", "calories": 360, "protein": 10, "carbs": 42, "fats": 14 },

{ "name": "Plain Maggi", "calories": 280, "protein": 7, "carbs": 38, "fats": 11 },
{ "name": "Masala Maggi", "calories": 300, "protein": 7, "carbs": 40, "fats": 12 },
{ "name": "Vegetable Maggi", "calories": 320, "protein": 9, "carbs": 42, "fats": 12 },
{ "name": "Cheese Maggi", "calories": 360, "protein": 12, "carbs": 40, "fats": 18 },
{ "name": "Egg Maggi", "calories": 340, "protein": 14, "carbs": 38, "fats": 15 },
{ "name": "Chicken Maggi", "calories": 380, "protein": 18, "carbs": 36, "fats": 16 },

{ "name": "Veg Puff", "calories": 200, "protein": 5, "carbs": 22, "fats": 10 },
{ "name": "Paneer Puff", "calories": 240, "protein": 8, "carbs": 22, "fats": 13 },
{ "name": "Egg Puff", "calories": 260, "protein": 10, "carbs": 20, "fats": 14 },
{ "name": "Chicken Puff", "calories": 280, "protein": 14, "carbs": 20, "fats": 15 },

{ "name": "Samosa", "calories": 260, "protein": 6, "carbs": 32, "fats": 12 },
{ "name": "Samosa Pav", "calories": 340, "protein": 8, "carbs": 44, "fats": 14 },

{ "name": "Vada Pav", "calories": 300, "protein": 8, "carbs": 42, "fats": 13 },
{ "name": "Cheese Vada Pav", "calories": 360, "protein": 11, "carbs": 44, "fats": 17 },

{ "name": "Pav Bhaji", "calories": 400, "protein": 10, "carbs": 48, "fats": 20 },
{ "name": "Butter Pav Bhaji", "calories": 480, "protein": 10, "carbs": 50, "fats": 26 },

{ "name": "Veg Chowmein", "calories": 330, "protein": 9, "carbs": 44, "fats": 14 },
{ "name": "Egg Chowmein", "calories": 380, "protein": 14, "carbs": 42, "fats": 16 },
{ "name": "Chicken Chowmein", "calories": 420, "protein": 20, "carbs": 40, "fats": 18 },

{ "name": "Veg Manchurian Dry", "calories": 320, "protein": 9, "carbs": 34, "fats": 16 },
{ "name": "Veg Manchurian Gravy", "calories": 360, "protein": 10, "carbs": 38, "fats": 18 },
{ "name": "Chicken Manchurian", "calories": 420, "protein": 22, "carbs": 30, "fats": 20 },

{ "name": "Veg Fried Rice", "calories": 340, "protein": 8, "carbs": 46, "fats": 12 },
{ "name": "Egg Fried Rice", "calories": 380, "protein": 14, "carbs": 44, "fats": 14 },
{ "name": "Chicken Fried Rice", "calories": 420, "protein": 20, "carbs": 42, "fats": 16 },

{ "name": "Bread Omelette", "calories": 320, "protein": 14, "carbs": 28, "fats": 16 },
{ "name": "Masala Omelette", "calories": 220, "protein": 12, "carbs": 6, "fats": 16 },

{ "name": "Anda Bhurji Pav", "calories": 380, "protein": 18, "carbs": 32, "fats": 18 },

{ "name": "Chole Kulche", "calories": 420, "protein": 14, "carbs": 54, "fats": 16 },
{ "name": "Chole Bhature", "calories": 520, "protein": 15, "carbs": 62, "fats": 24 },

{ "name": "Dabeli", "calories": 320, "protein": 7, "carbs": 46, "fats": 12 },

{ "name": "Veg Momos Kurkure", "calories": 300, "protein": 7, "carbs": 32, "fats": 14 },
{ "name": "Chicken Momos Kurkure", "calories": 340, "protein": 16, "carbs": 30, "fats": 16 }

  ];

const HISTORY_KEY = "CAL_HISTORY";

/* ───────── SPLASH ───────── */
function SplashScreen({ onFinish }) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 900, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.Text style={[styles.splashText, { transform: [{ scale }], opacity }]}>
        ELMA 🥗
      </Animated.Text>
      <Text style={{ color: "#FF5A1F", marginTop: 10 }}>Eat Smart. Live Fit.</Text>
    </View>
  );
}

/* ───────── HOME ───────── */
function HomeScreen({ dailyLimit }) {
  const [search, setSearch] = useState("");
  const [log, setLog] = useState([]);
  const [total, setTotal] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
  const [history, setHistory] = useState([]);

  const progress = useRef(new Animated.Value(0)).current;
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -6, duration: 800, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => { loadHistory(); }, []);
  useEffect(() => { saveToday(total); }, [total]);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: Math.min(total / dailyLimit, 1),
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [total, dailyLimit]);

  const strokeOffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  const loadHistory = async () => {
    const data = await AsyncStorage.getItem(HISTORY_KEY);
    if (data) setHistory(JSON.parse(data));
  };

  const saveToday = async (cal) => {
    const today = new Date().toISOString().slice(0, 10);
    let newHistory = [...history];
    const index = newHistory.findIndex((h) => h.date === today);
    if (index >= 0) newHistory[index].calories = cal;
    else newHistory.push({ date: today, calories: cal });
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const addFood = (food) => {
    setLog([...log, food]);
    setTotal(total + food.calories);
    setMacros({
      protein: macros.protein + food.protein,
      carbs: macros.carbs + food.carbs,
      fat: macros.fat + food.fat,
    });
    setSearch("");
  };

  const removeFood = (index) => {
    const food = log[index];
    setLog(log.filter((_, i) => i !== index));
    setTotal(total - food.calories);
    setMacros({
      protein: macros.protein - food.protein,
      carbs: macros.carbs - food.carbs,
      fat: macros.fat - food.fat,
    });
  };

  const suggestions = FOOD_DB.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Animated.Image
        source={total > dailyLimit ? ELMA_SAD : ELMA_HAPPY}
        style={[styles.elma, { transform: [{ translateY: bounce }] }]}
      />

      <View style={styles.ringWrap}>
        <Svg width={SIZE} height={SIZE}>
          <Circle cx={SIZE/2} cy={SIZE/2} r={RADIUS} stroke="#F2D4C9" strokeWidth={STROKE} fill="none" />
          <AnimatedCircle
            cx={SIZE/2}
            cy={SIZE/2}
            r={RADIUS}
            stroke={total > dailyLimit ? "#7A4DFF" : "#FF5A1F"}
            strokeWidth={STROKE}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            fill="none"
            rotation="-90"
            originX={SIZE/2}
            originY={SIZE/2}
          />
        </Svg>

        <View style={styles.center}>
          <Text style={styles.cal}>{total}</Text>
          <Text style={styles.kcal}>/ {dailyLimit} kcal</Text>
        </View>
      </View>

      {/* ✅ MACROS DISPLAY (ONLY ADDITION) */}
      <View style={styles.macroRow}>
        <Text style={styles.macro}>🥩 {macros.protein}g Protein</Text>
        <Text style={styles.macro}>🍞 {macros.carbs}g Carbs</Text>
        <Text style={styles.macro}>🥑 {macros.fat}g Fats</Text>
      </View>

      <View style={{ width: "85%" }}>
        <TextInput
          placeholder="Search food..."
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />

        {search.length > 0 && (
          <View style={styles.suggestionBox}>
            {suggestions.map((item) => (
              <TouchableOpacity key={item.name} style={styles.suggestionItem} onPress={() => addFood(item)}>
                <Text style={{ fontWeight: "600" }}>{item.name}</Text>
                <Text style={{ color: "#666", fontSize: 12 }}>
                  {item.calories} kcal • P{item.protein} C{item.carbs} F{item.fat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={log}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.selectedFood}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => addFood(item)}>
                <Text style={styles.plus}>＋</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeFood(index)}>
                <Ionicons name="trash" size={22} color="#FF5A1F" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

/* ───────── BMI ───────── */
function BMIScreen({ setDailyLimit }) {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculate = () => {
    const h = height / 100;
    const bmi = (weight / (h * h)).toFixed(1);
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
    const calories = Math.round(bmr);
    setDailyLimit(calories);
    setResult({ bmi, calories });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.bmiTitle}>✨ BMI Playground ✨</Text>

      <View style={styles.genderRow}>
        <Text onPress={() => setGender("male")} style={gender === "male" ? styles.genderActive : styles.gender}>👨 Male</Text>
        <Text onPress={() => setGender("female")} style={gender === "female" ? styles.genderActive : styles.gender}>👩 Female</Text>
      </View>

      <TextInput placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} style={styles.search} />
      <TextInput placeholder="Height (cm)" keyboardType="numeric" value={height} onChangeText={setHeight} style={styles.search} />
      <TextInput placeholder="Weight (kg)" keyboardType="numeric" value={weight} onChangeText={setWeight} style={styles.search} />

      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={{ color: "#fff" }}>🎯 Calculate</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.funBox}>
          <Text style={styles.funText}>BMI: {result.bmi}</Text>
          <Text style={styles.funText}>Daily Calories: {result.calories}</Text>
        </View>
      )}
    </View>
  );
}

/* ───────── HISTORY ───────── */
function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY).then((d) => {
      if (d) setHistory(JSON.parse(d).reverse());
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.bmiTitle}>📊 Daily History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text>{item.date}</Text>
            <Text style={{ fontWeight: "700" }}>{item.calories} kcal</Text>
          </View>
        )}
      />
    </View>
  );
}

/* ───────── PRODUCT ───────── */
function ProductScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.bmiTitle}>🔥 Product Of The Day</Text>
      <Image
        source={{ uri: "https://m.media-amazon.com/images/I/61YtK7v8oLL.SL1500.jpg" }}
        style={{ width: 220, height: 220, borderRadius: 20, marginTop: 20 }}
        resizeMode="contain"
      />
      <View style={styles.funBox}>
        <Text style={styles.funText}>MuscleBlaze Whey Protein</Text>
        <Text>High quality whey protein</Text>
        <Text style={{ fontWeight: "700", marginTop: 8 }}>₹2499</Text>
      </View>
    </View>
  );
}

/* ───────── NAV ───────── */
const Tab = createBottomTabNavigator();

function MainApp() {
  const [dailyLimit, setDailyLimit] = useState(2000);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            const icons = {
              Home: "home",
              BMI: "body",
              History: "time",
              Product: "pricetag",
            };
            return <Ionicons name={icons[route.name]} size={22} color={color} />;
          },
          tabBarActiveTintColor: "#FF5A1F",
          tabBarInactiveTintColor: "#999",
        })}
      >
        <Tab.Screen name="Home">{() => <HomeScreen dailyLimit={dailyLimit} />}</Tab.Screen>
        <Tab.Screen name="BMI">{() => <BMIScreen setDailyLimit={setDailyLimit} />}</Tab.Screen>
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Product" component={ProductScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* ───────── ROOT ───────── */
export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  if (showSplash) return <SplashScreen onFinish={() => setShowSplash(false)} />;
  return <MainApp />;
}

/* ───────── STYLES ───────── */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAF7F5", alignItems: "center", paddingTop: 50 },
  elma: { width: 42, height: 42, marginBottom: 6 },
  ringWrap: { alignItems: "center", justifyContent: "center" },
  center: { position: "absolute", alignItems: "center" },
  cal: { fontSize: 42, fontWeight: "700" },
  kcal: { color: "#666" },

  macroRow: { flexDirection: "row", gap: 14, marginVertical: 10 },
  macro: { fontWeight: "600", color: "#555" },

  search: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginTop: 14 },
  suggestionBox: { backgroundColor: "#fff", borderRadius: 12, marginTop: 6, elevation: 5 },
  suggestionItem: { padding: 14, borderBottomWidth: 0.5, borderColor: "#eee" },

  selectedFood: { width: "85%", backgroundColor: "#fff", padding: 12, borderRadius: 10, marginTop: 6, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  actions: { flexDirection: "row", gap: 16 },
  plus: { fontSize: 22, color: "#FF5A1F", fontWeight: "700" },

  bmiTitle: { fontSize: 26, fontWeight: "700", marginBottom: 10 },
  genderRow: { flexDirection: "row", gap: 20 },
  gender: { fontSize: 18, color: "#888" },
  genderActive: { fontSize: 18, fontWeight: "700", color: "#FF5A1F" },

  button: { backgroundColor: "#FF5A1F", padding: 14, borderRadius: 12, marginTop: 16 },
  funBox: { marginTop: 20, padding: 16, backgroundColor: "#fff", borderRadius: 14, width: "85%", alignItems: "center" },
  funText: { fontSize: 18, fontWeight: "600" },

  historyItem: { width: "85%", backgroundColor: "#fff", padding: 16, borderRadius: 12, marginTop: 10, flexDirection: "row", justifyContent: "space-between" },

  splashContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FAF7F5" },
  splashText: { fontSize: 48, fontWeight: "bold", color: "#FF5A1F" },
});