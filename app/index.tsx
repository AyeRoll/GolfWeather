import { Link, router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [location, setLocation] = useState("");

  return (
    <View style={styles.main}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Golf Weather</Text>
        <View style={styles.locationView}>
          <Text style={styles.leadingText}>Golf City:</Text>
          <TextInput 
            value={location} 
            onChangeText={setLocation} 
            style={styles.textBoxStyle} 
            placeholder="Enter City or Zipcode"
          />
        </View>
      </View>
      <Text style={styles.golfersText}>Choose your Golfer!</Text>
      <View style={styles.golfersView}>
          <Pressable 
            onPress={()=>(
              router.push({
                pathname: "/conditions", 
                params: {location, character: 'A'}
              })
            ) }>
            <Image 
              source={require("../assets/Sprites/MaleSprites/sunnyHot.png")}
              style={styles.golfer}
            />
          </Pressable>
          <Pressable 
            onPress={()=>(
              router.push({
                pathname: "/conditions", 
                params: {location, character: 'B'}
              })
            )}
          >
            <Image 
              source={require("../assets/Sprites/FemaleSprites/sunnyHot.png")}
              style={styles.golfer}
            />
          </Pressable>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#30722a",
    borderWidth: 3,
    borderRadius: 25,
    height: 360,
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 48,
    textShadowColor: "light-gray",
    textShadowOffset: {width: 0, height: 7},
    fontWeight: "600",
  },
  textBoxStyle: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    width: 200,
    height: 35,
  },
  locationView: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 60,
    marginBottom: 80,
  },
  leadingText: {
    color: "white",
    fontSize: 24,
    paddingRight: 10,
  },
  golfersText:{
        fontSize: 24,
        fontStyle: "italic",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
      }, 
  golfersView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30
  },
  golfer: {
    width: 180,
    height: 300,
    borderWidth: 3,
    // borderColor: "white",
    borderRadius:  20,
    
  }


})