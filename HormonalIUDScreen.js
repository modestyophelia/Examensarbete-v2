import { db } from './firebase';
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { RadioButton } from 'react-native-paper';
import ReviewStars from './ReviewStars';
import RatingStars from './RatingStars';

const HormonalIUDScreen = () => {
  const [contraceptives, setContraceptives] = useState([]);
  const [reviewContraceptiveName, setReviewContraceptiveName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewMoods, setReviewMoods] = useState('');
  const [reviewWeight, setReviewWeight] = useState('');
  const [reviewDrive, setReviewDrive] = useState('');
  const [reviewSkin, setReviewSkin] = useState('');
  const [reviewTime, setReviewTime] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('reviews').onSnapshot((querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('reviews').add({
      contraceptiveID: "80568N9VG4uPnVPsIjmO",
      reviewContraceptiveName,
      reviewText,
      reviewRating,
      reviewMoods,
      reviewWeight,
      reviewDrive,
      reviewSkin,
      reviewTime
    });
    setReviewContraceptiveName('');
    setReviewText('');
    setReviewRating(0);
    setReviewMoods('');
    setReviewWeight('');
    setReviewWeight('');
    setReviewDrive('');
    setReviewSkin('');
    setReviewTime('');

  };

  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContraceptives(data);
    };

    getContraceptives();
  }, []);

  const showModal = () => {
    return (
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
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
                    placeholder="For example Yaz"
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

  const hormonalIUD = contraceptives.find(c => c.contraceptiveName === "Hormonal IUD");
  const filteredReviews = reviews.filter((review) => review.contraceptiveID === "80568N9VG4uPnVPsIjmO");
  const starAverage = filteredReviews.reduce((acc, review) => acc + review.reviewRating, 0) / filteredReviews.length;

  return (
    <View style={styles.container}>
      <Image style={styles.contraceptiveImages} source={{ uri: hormonalIUD?.contraceptiveImage }} />
      <ReviewStars reviewRating={isNaN(starAverage) ? 0 : starAverage} />

      <View style={styles.reviewTitleContent}>
        <Text style={styles.reviewsHeader}>User reviews</Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Write a review</Text>
        </TouchableOpacity>
        {showModal()}
      </View>

      <ScrollView style={styles.reviewsList}>
        {reviews.filter((review) => review.contraceptiveID === "80568N9VG4uPnVPsIjmO").map((review) => (
          <View style={styles.reviewItem} key={review.id}>
            <Text style={styles.contraceptiveUsed}>Brand used: {review.reviewContraceptiveName}</Text>
            <Text style={styles.contraceptiveUsed}>Amount of time used: {review.reviewTime}</Text>

            <ReviewStars style={styles.reviewStars} reviewRating={review.reviewRating} />

            <Text style={styles.reviewText}>{review.reviewText}</Text>
            <Text>
              Mood: {review.reviewMoods}
              {'\n'}
              Weight: {review.reviewWeight}
              {'\n'}
              Sex drive: {review.reviewDrive}
              {'\n'}
              Skin: {review.reviewSkin}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  contraceptiveImages: {
    width: 350,
    height: 200,
    marginBottom: 15,
    marginTop: 15,
    alignSelf: "center",
    borderRadius: 5,
  },
  contraceptiveDescription: {
    fontSize: 16,
    marginBottom: 15,
    alignSelf: "center",
    width: 350
  },
  reviewsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#5CCFBA'
  },
  reviewsList: {
    maxHeight: 400,
  },
  reviewItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  contraceptiveUsed: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#5CCFBA'
  },
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
  reviewStars: {
    display: 'flex',
    flexDirection: 'row'
  },
  reviewTitleContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  reviewButton: {
    backgroundColor: '#5CCFBA',
    borderRadius: 5,
    padding: 10,
    width: '40%',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 80,
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
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
  },
});

export default HormonalIUDScreen;