import React from "react";
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import RatingStars from './RatingStars';

const ReviewFormModal = ({
  modalVisible,
  setModalVisible,
  reviewContraceptiveName,
  setReviewContraceptiveName,
  reviewText,
  setReviewText,
  reviewRating,
  setReviewRating,
  reviewMoods,
  setReviewMoods,
  reviewWeight,
  setReviewWeight,
  reviewDrive,
  setReviewDrive,
  reviewSkin,
  setReviewSkin,
  reviewTime,
  setReviewTime,
  handleSubmit
}) => {
  return (
    <Modal visible={modalVisible} animationType="smooth" transparent={true}>
      <View style={styles.modal}>
        <ScrollView>
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
          >
            <View style={styles.modalContent}>
              <View style={styles.reviewFormContainer}>
                <Text style={styles.reviewFormTitle}>Contraceptive Review Form</Text>
                <Text style={styles.reviewFormTopInputs}>What brand did you use?</Text>
                <TextInput
                  style={styles.brandUsed}
                  placeholder="For example Ballerine"
                  value={reviewContraceptiveName}
                  onChangeText={(text) => setReviewContraceptiveName(text)}
                />


                <Text style={styles.reviewFormTopInputs}>How long have you been using or did you use this type of contraception?</Text>
                <TextInput
                  style={styles.brandUsed}
                  placeholder="Specify if its years, months or weeks"
                  value={reviewTime}
                  onChangeText={(text) => setReviewTime(text)}
                />

                <View>
                  <View style={styles.radioButtonTitle}>
                    <Text style={styles.radioButtonTextContent}>How do you feel this contraception has affected your moods and emotions?</Text>
                  </View>
                  <View style={styles.radioButtonsContainer}>
                    <RadioButton.Group onValueChange={(value) => setReviewMoods(value)} value={reviewMoods}>
                      <RadioButton.Item label="Very positively" value="Very positively" />
                      <RadioButton.Item label="Somewhat positively" value="Somewhat positively" />
                      <RadioButton.Item label="Neutral/No change" value="Neutral/No change" />
                      <RadioButton.Item label="Somewhat negatively" value="Somewhat negatively" />
                      <RadioButton.Item label="Very negatively" value="Very negatively" />
                      <RadioButton.Item label="I don't know/Cant tell" value="I don't know/Cant tell" />
                    </RadioButton.Group>
                  </View>

                  <View style={styles.radioButtonTitle}>
                    <Text style={styles.radioButtonTextContent}>Have you noticed any change to your body weight whilst using this contraception?</Text>
                  </View>
                  <View style={styles.radioButtonsContainer}>
                    <RadioButton.Group onValueChange={(value) => setReviewWeight(value)} value={reviewWeight}>
                      <RadioButton.Item label="I lost weight" value="I lost weight" />
                      <RadioButton.Item label="Somewhat positively" value="Somewhat positively" />
                      <RadioButton.Item label="Neutral/No change" value="Neutral/No change" />
                      <RadioButton.Item label="Somewhat negatively" value="Somewhat negatively" />
                      <RadioButton.Item label="I gained weight" value="I gained weight" />
                      <RadioButton.Item label="I don't know/Cant tell" value="I don't know/Cant tell" />
                    </RadioButton.Group>
                  </View>

                  <View style={styles.radioButtonTitle}>
                    <Text style={styles.radioButtonTextContent}>Have you noticed any changes to your sex drive whilst using this contraception?</Text>
                  </View>
                  <View style={styles.radioButtonsContainer}>
                    <RadioButton.Group onValueChange={(value) => setReviewDrive(value)} value={reviewDrive}>
                      <RadioButton.Item label="Increased sex drive" value="Increased sex drive" />
                      <RadioButton.Item label="Neutral/No change" value="Neutral/No change" />
                      <RadioButton.Item label="Loss of sex drive" value="Loss of sex drive" />
                      <RadioButton.Item label="I don't know/Cant tell" value="I don't know/Cant tell" />
                    </RadioButton.Group>
                  </View>

                  <View style={styles.radioButtonTitle}>
                    <Text style={styles.radioButtonTextContent}>Have you noticed any changes to your skin whilst using this contraception?</Text>
                  </View>
                  <View style={styles.radioButtonsContainer}>
                    <RadioButton.Group onValueChange={(value) => setReviewSkin(value)} value={reviewSkin}>
                      <RadioButton.Item label="My skin improved - fewer spots or acne" value="Skin improved - fewer spots or acne" />
                      <RadioButton.Item label="Neutral/No change" value="Neutral/No change" />
                      <RadioButton.Item label="My skin got worse - more spots or acne" value="Skin got worse - more spots or acne" />
                      <RadioButton.Item label="I don't know/Cant tell" value="I don't know/Cant tell" />
                    </RadioButton.Group>
                  </View>

                  <View>
                    <View style={styles.radioButtonTitle}>
                      <Text style={styles.radioButtonTextContent}>Overall how satisfied are you or were you with this contraception?</Text>
                    </View>
                    <View style={styles.reviewRatingContainer}>
                      <RatingStars reviewRating={reviewRating} onChange={(newRating) => setReviewRating(newRating)} />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.reviewFormTopInputs}>Please summarise your experience in a few sentences</Text>
                    <TextInput
                      style={styles.experienceInput}
                      placeholder=""
                      value={reviewText}
                      onChangeText={(text) => setReviewText(text)}
                      multiline
                    />
                  </View>

                  <View style={styles.submitButtonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                      <Text style={styles.submitButtonText}>Submit Review</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton} onPressOut={() => setModalVisible(false)}>
                      <Text style={styles.submitButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal >
  )
};

const styles = StyleSheet.create({
  reviewText: {
    marginBottom: 5,
  },
  reviewFormContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  reviewFormTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 15,
    color: '#5CCFBA',
    alignSelf: "center",
  },
  brandUsed: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    padding: 5,
  },
  experienceInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    height: 100,
    padding: 5,
  },
  radioButtonTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#5CCFBA',
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioButtonTextContent: {
    color: 'white',
    fontWeight: '600',
    padding: 5
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  reviewFormTopInputs: {
    color: '#5CCFBA',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#5CCFBA',
    borderRadius: 5,
    padding: 10,
    width: '40%',
    justifyContent: 'center',
    marginBottom: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  submitButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
  },
});

export default ReviewFormModal;