import { db } from './firebase';
import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import ReviewStars from './ReviewStars';
import ReviewFormModal from './ReviewFormModal';

const OtherScreen = () => {
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
  const [starAverage, setStarAverage] = useState(0);

  console.log("starAverage:", starAverage);

  useEffect(() => {
    const unsubscribe = db.collection('reviews').onSnapshot((querySnapshot) => {
      const reviewsData = [];
      querySnapshot.forEach((doc) => {
        reviewsData.push({ id: doc.id, ...doc.data() });
      });
      setReviews(reviewsData);

      const filteredReviews = reviewsData.filter((review) => review.contraceptiveID === "yYf6yt19TCV1vK6KvMsm");
      const averageRating = filteredReviews.reduce((acc, review) => acc + review.reviewRating, 0) / filteredReviews.length;
      setStarAverage(isNaN(averageRating) ? 0 : averageRating);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    db.collection('reviews').add({
      contraceptiveID: "yYf6yt19TCV1vK6KvMsm",
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

  const other = contraceptives.find(c => c.contraceptiveName === "Other");

  const handleReviewRatingChange = (rating) => {
    setReviewRating(rating);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.contraceptiveImages} source={{ uri: other?.contraceptiveImage }} />
      <View style={styles.reviewStarsContainer}>
        <ReviewStars starAverage={isNaN(starAverage) ? 0 : starAverage} />
      </View>

      <View style={styles.reviewTitleContent}>
        <Text style={styles.reviewsHeader}>User reviews</Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Write a review</Text>
        </TouchableOpacity>
        {modalVisible && (
          <ReviewFormModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            reviewContraceptiveName={reviewContraceptiveName}
            setReviewContraceptiveName={setReviewContraceptiveName}
            reviewText={reviewText}
            setReviewText={setReviewText}
            reviewRating={reviewRating}
            setReviewRating={handleReviewRatingChange}
            reviewMoods={reviewMoods}
            setReviewMoods={setReviewMoods}
            reviewWeight={reviewWeight}
            setReviewWeight={setReviewWeight}
            reviewDrive={reviewDrive}
            setReviewDrive={setReviewDrive}
            reviewSkin={reviewSkin}
            setReviewSkin={setReviewSkin}
            reviewTime={reviewTime}
            setReviewTime={setReviewTime}
            handleSubmit={handleSubmit}
          />
        )}
      </View>

      <ScrollView style={styles.reviewsList}>
        {reviews
          .filter((review) => review.contraceptiveID === "yYf6yt19TCV1vK6KvMsm")
          .map((review) => (
            <View style={styles.reviewItem} key={review.id}>
              <Text style={styles.contraceptiveUsed}>Brand used: {review.reviewContraceptiveName}</Text>
              <Text style={styles.contraceptiveUsed}>Amount of time used: {review.reviewTime}</Text>

              <ReviewStars starAverage={review.reviewRating} />

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
  reviewsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#5CCFBA'
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
  reviewTitleContent: {
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
});

export default OtherScreen;