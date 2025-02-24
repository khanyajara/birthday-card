import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import CardsScreen from './birthdayCard/card';
import SavedCards from '../components/birthdayCard/savedCards';  // Ensure this is the correct path

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  // Define the state for saved cards
  const [savedCards, setSavedCards] = useState([
    { id: 1, customText: 'Happy Birthday!', color: 'red', birthdayImage: 'image_url' },
    { id: 2, customText: 'Wish you the best!', color: 'blue', birthdayImage: 'image_url' },
  ]);

  // Function to set the selected card
  const setSelectedCard = (card) => {
    console.log('Card selected:', card);
  };

  // Function to remove a card
  const removeCard = (index) => {
    const newSavedCards = [...savedCards];
    newSavedCards.splice(index, 1);
    setSavedCards(newSavedCards);
  };

  // Function to edit a card
  const editCard = (index) => {
    console.log('Editing card at index:', index);
  };

  // Function to share a card
  const shareCard = (card) => {
    console.log('Sharing card:', card);
  };

  // Define the background image path
  const backgroundImage = '../assets/a-festive-arrangement-of-vibrant-balloons-in-various-shapes-and-sizes-against-a-textured-confetti-backdrop-ai-generated-photo.jpg'; // Replace with your actual image path

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Saved Cards') {
            iconName = 'bookmark';
          } else if (route.name === 'Templates') {
            iconName = 'folder';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          } else if (route.name === 'Help') {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarActiveBackgroundColor: 'rgba(186, 201, 206, 0.57)',
        tabBarInactiveBackgroundColor: 'rgba(186, 201, 206, 0.57)',
      })}
    >
      <Tab.Screen name="Home" component={CardsScreen} />
      <Tab.Screen
        name="Saved Cards"
        children={() => (
          <SavedCards
            savedCards={savedCards}
            setSelectedCard={setSelectedCard}
            removeCard={removeCard}
            editCard={editCard}
            shareCard={shareCard}
            backgroundImage={backgroundImage}
          />
        )}
      />
    </Tab.Navigator>
  );
}
