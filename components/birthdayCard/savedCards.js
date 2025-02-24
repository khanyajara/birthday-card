import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { templateImages, changeTemplate } from '../templates';

const SavedCards = ({      }) => {
    const [customText, setCustomText] = useState('');
      const [color, setColor] = useState('');
      const [birthdayImage, setBirthdayImage] = useState(null);
      const [colorPickerVisible, setColorPickerVisible] = useState(false);
      const [textEditorVisible, setTextEditorVisible] = useState(false);
      const [savedCards, setSavedCards] = useState([]);
      const [selectedCard, setSelectedCard] = useState(null);
      const [image, setImage] = useState(null);
    
      const [backgroundImage, setBackgroundImage] = useState(templateImages[0]);
    
      const onColorChange = (color) => setColor(color);

   const selectImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setBirthdayImage(result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    };
  
    const saveCard = () => {
      const newCard = { customText, birthdayImage, color };
      setSavedCards([...savedCards, newCard]);
    };
  
    const openCard = (card) => setSelectedCard(card);
    const closeCard = () => setSelectedCard(null);
  
    const removeCard = (index) => {
      const updatedCards = [...savedCards];
      updatedCards.splice(index, 1);
      setSavedCards(updatedCards);
    };
  
    const editCard = (index) => {
      const cardToEdit = savedCards[index];
      setCustomText(cardToEdit.customText);
      setBirthdayImage(cardToEdit.birthdayImage);
      setColor(cardToEdit.color);
      removeCard(index);
    };
  return (
    <View style={styles.savedCards}>
      <Text style={styles.savedCardsTitle}>Saved Cards</Text>
      {savedCards.length > 0 ? (
        savedCards.map((card, index) => (
          <View key={index} style={styles.savedCard}>
            {card.birthdayImage && (
              <ImageBackground
                source={backgroundImage}
                style={styles.savedCardImageBackground}
                imageStyle={styles.savedCardImage}
              >
                <Text style={[styles.savedCardText, { color: card.color }]}>{card.customText}</Text>
              </ImageBackground>
            )}
            <View style={styles.cardButtonGroup}>
              <TouchableOpacity onPress={() => setSelectedCard(card)} style={styles.viewCardButton}>
                <Text style={styles.viewCardText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editCard(index)} style={styles.editCardButton}>
                <Text style={styles.editCardText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => shareCard(card)} style={styles.shareCardButton}>
                <Text style={styles.shareCardText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeCard(index)} style={styles.deleteCardButton}>
                <Text style={styles.deleteCardText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No saved cards yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  savedCards: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  savedCardsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  savedCard: {
    width: '80%',
    marginBottom: 16,
    alignItems: 'center',
  },
  savedCardImageBackground: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  savedCardImage: {
    borderRadius: 8,
    opacity: 0.5,
  },
  savedCardText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 10,
  },
  cardButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  viewCardButton: {
    backgroundColor: '#4A90E2',
    padding: 8,
    borderRadius: 5,
  },
  editCardButton: {
    backgroundColor: '#FFA500',
    padding: 8,
    borderRadius: 5,
  },
  shareCardButton: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 5,
  },
  deleteCardButton: {
    backgroundColor: '#FF4500',
    padding: 8,
    borderRadius: 5,
  },
  viewCardText: {
    color: 'white',
  },
  editCardText: {
    color: 'white',
  },
  shareCardText: {
    color: 'white',
  },
  deleteCardText: {
    color: 'white',
  },
});

export default SavedCards;
