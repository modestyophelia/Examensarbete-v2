import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from './firebase';
import { collection, getDocs } from "firebase/firestore";

const ContraceptivesScreen = ({ navigation }) => {
  const [contraceptives, setContraceptives] = useState([]);

  useEffect(() => {
    const getContraceptives = async () => {
      const querySnapshot = await getDocs(collection(db, "contraceptives"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setContraceptives(data);
    };
    getContraceptives();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign out successful"))
      .catch((error) => console.log(error));
  };

  const handlePress = (contraceptive) => {
    const { contraceptiveName, id } = contraceptive;
    let screenName = "";

    if (contraceptiveName === 'Copper coil') {
      screenName = 'Copper coil';
    } else if (contraceptiveName === 'Birth Control pills') {
      screenName = 'Birth Control pills';
    } else if (contraceptiveName === 'Implant') {
      screenName = 'Implant';
    } else if (contraceptiveName === 'Hormonal IUD') {
      screenName = 'Hormonal IUD';
    } else if (contraceptiveName === 'Other') {
      screenName = 'Other';
    }

    if (screenName) {
      navigation.navigate(screenName, { contraceptiveId: id });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {contraceptives.map((contraceptive) => (
          <View key={contraceptive.id}>
            <Text style={styles.contraceptiveName}>
              {contraceptive.contraceptiveName}
            </Text>
            <TouchableOpacity
              style={styles.buttonImage}
              onPress={() => handlePress(contraceptive)}
            >
              <Image
                style={styles.contraceptiveImages}
                source={{ uri: contraceptive.contraceptiveImage }}
                accessibilityLabel={contraceptive.contraceptiveName}
              />
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#5CCFBA',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  contraceptiveImages: {
    width: 325,
    height: 130,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 15,
  },
  contraceptiveName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: 'black',
    position: 'absolute',
    paddingTop: 10,
    paddingLeft: 10,
    color: 'white',
    zIndex: 1,
  }
});

export default ContraceptivesScreen;
