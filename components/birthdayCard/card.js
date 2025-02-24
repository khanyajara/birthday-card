import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  View,
  Button,
  TextInput,
  ScrollView,
  Modal,
  TouchableOpacity,
  Share,
  Text
} from 'react-native';

import ColorPicker from 'react-native-wheel-color-picker';
import * as ImagePicker from 'expo-image-picker';

// Importing templates
import { templateImages, changeTemplate } from '../templates';

import SavedCards from './savedCards';

export default function HomeScreen() {
  const [customText, setCustomText] = useState('');
  const [color, setColor] = useState('');
  const [birthdayImage, setBirthdayImage] = useState(null);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [textEditorVisible, setTextEditorVisible] = useState(false);
  const [savedCards, setSavedCards] = useState([]);  // Save card state here
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

    setCustomText('');
    setColor('');
    setBirthdayImage(null);
    setImage(null);
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

  const shareCard = async (card) => {
    try {
      await Share.share({
        message: `${card.customText}`,
        url: card.birthdayImage,
        title: 'Check out this birthday card!',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Create Your Birthday Card</Text>

        {/* Color Picker */}
        {colorPickerVisible && (
          <View style={styles.colorPickerContainer}>
            <ColorPicker
              color={color}
              onColorChange={onColorChange}
              thumbSize={30}
              sliderSize={30}
              noSnap
              row={false}
            />
          </View>
        )}

        {image && <Image source={{ uri: image }} style={styles.image} />}

        {textEditorVisible && (
          <TextInput
            value={customText}
            onChangeText={setCustomText}
            placeholder="Enter your custom message"
            style={styles.input}
          />
        )}

        <View style={styles.buttonGroup}>
          <Button title="Choose Color" onPress={() => setColorPickerVisible(!colorPickerVisible)} />
          <Button title="Edit Text" onPress={() => setTextEditorVisible(!textEditorVisible)} />
          <Button title="Select Image" onPress={selectImage} />
          <Button title="Save Card" onPress={saveCard} />
          <Button title="Change Template" onPress={() => changeTemplate(1, setBackgroundImage)} />
        </View>

        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={[styles.previewCard, { backgroundColor: backgroundImage }]}>
            {image && (
              <Image
                source={{ uri: image }}
                style={styles.previewCardImage}
              />
            )}
            <Text style={[styles.previewCardText, { color: color }]}>
              {customText || 'Your custom message'}
            </Text>
          </View>
        </View>

        {/* Pass savedCards data to SavedCards */}
        <SavedCards savedCards={savedCards} />
        
        {/* Card Modal */}
        {selectedCard && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={!!selectedCard}
            onRequestClose={closeCard}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedCard.birthdayImage && (
                  <Image source={{ uri: selectedCard.birthdayImage }} style={styles.modalImage} />
                )}
                <Text style={[styles.modalText, { color: selectedCard.color }]}>{selectedCard.customText}</Text>
                <Button title="Close" onPress={closeCard} />
              </View>
            </View>
          </Modal>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
    paddingVertical: 90,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    height: '106%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    width: '80%',
    marginVertical: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
    padding: 10,
  },
  button: {
    backgroundColor: '#FF8C00', // Orange background for birthday vibe
    color: 'white',
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 25,
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 30,
    cursor: 'pointer',
    boxShadow: '0px 4px 15px rgba(255, 99, 71, 0.4)', // Soft shadow
    position: 'relative',
    transition: 'transform 0.2s ease, background 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#FF4500', // Brighter for hover
    transform: 'scale(1.1)',
    boxShadow: '0px 4px 20px rgba(255, 69, 0, 0.5)', // Stronger shadow on hover
  },
  buttonActive: {
    backgroundColor: '#FF6347', // Slightly different color when clicked
    transform: 'scale(0.98)',
    boxShadow: '0px 4px 10px rgba(255, 99, 71, 0.3)', // Softened shadow on active
  },
  buttonFocus: {
    outline: 'none',
    boxShadow: '0 0 8px 4px rgba(255, 105, 180, 0.7)', // Pink outline on focus
  },
  disabledButton: {
    backgroundColor: '#D3D3D3', // Light gray for disabled
    cursor: 'not-allowed',
  },
  colorPickerContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 16,
  },
  previewContainer: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  previewCard: {
    width: '80%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  previewCardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  previewCardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
});

