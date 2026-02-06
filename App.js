import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';

const FOOD_DB = [
  { name: 'Paneer Butter Masala', calories: 420, carbs: 18, protein: 14, fat: 34 },
  { name: 'Kadai Paneer', calories: 360, carbs: 16, protein: 15, fat: 28 },
  { name: 'Butter Chicken', calories: 450, carbs: 12, protein: 26, fat: 34 },
  { name: 'Chicken Biryani', calories: 650, carbs: 65, protein: 28, fat: 26 },
  { name: 'Plain Rice', calories: 180, carbs: 38, protein: 4, fat: 1 },
  { name: 'Butter Naan', calories: 260, carbs: 42, protein: 7, fat: 9 },
  { name: 'Masala Dosa', calories: 320, carbs: 45, protein: 8, fat: 12 },
  { name: 'Samosa', calories: 180, carbs: 22, protein: 4, fat: 9 },
  { name: 'Idli (2 pcs)', calories: 140, carbs: 30, protein: 5, fat: 1 },
  { name: 'Pav Bhaji', calories: 400, carbs: 48, protein: 10, fat: 18 }
];

export default function App() {
  const [search, setSearch] = useState('');
  const [log, setLog] = useState([]);

  const filteredFood = FOOD_DB.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totals = log.reduce(
    (t, f) => {
      t.calories += f.calories;
      t.carbs += f.carbs;
      t.protein += f.protein;
      t.fat += f.fat;
      return t;
    },
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  return (
    <ScrollView style={{ padding: 20, backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        🍽️ Indian Calorie Tracker
      </Text>

      <TextInput
        placeholder="Search food"
        value={search}
        onChangeText={setSearch}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 10
        }}
      />

      {filteredFood.map((food, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setLog([...log, food])}
          style={{ padding: 10, borderBottomWidth: 1 }}
        >
          <Text style={{ fontWeight: 'bold' }}>{food.name}</Text>
          <Text>
            {food.calories} kcal | C {food.carbs}g | P {food.protein}g | F {food.fat}g
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 20 }}>
        📋 Today’s Intake
      </Text>

      {log.map((item, i) => (
        <Text key={i}>• {item.name} ({item.calories} kcal)</Text>
      ))}

      <View style={{ marginTop: 20, padding: 10, backgroundColor: '#eee', borderRadius: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>🔥 Total</Text>
        <Text>Calories: {totals.calories}</Text>
        <Text>Carbs: {totals.carbs} g</Text>
        <Text>Protein: {totals.protein} g</Text>
        <Text>Fat: {totals.fat} g</Text>
      </View>
    </ScrollView>
  );
}
