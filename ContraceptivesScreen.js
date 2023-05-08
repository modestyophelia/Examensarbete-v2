import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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
    const screenName = contraceptiveName === 'Copper coil' ? 'Copper coil' :
      contraceptiveName === 'Birth Control pills' ? 'Birth Control pills' :
        '';
    if (screenName) {
      navigation.navigate(screenName, { contraceptiveId: id });
    }
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
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
  },
  contraceptiveImages: {
    width: 325,
    height: 130,
    borderRadius: 5,
    marginBottom: 10,
  },
  contraceptiveName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    position: 'absolute',
    paddingTop: 10,
    paddingLeft: 10,
    color: 'white',
    zIndex: 1,
  }
});

export default ContraceptivesScreen;
