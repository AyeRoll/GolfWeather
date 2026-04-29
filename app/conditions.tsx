import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Weather {
  locationName: string;
  conditions: string;
  feelsLike: number;
  currTemp: number;
  rainAmount: number;
  windSpeed: number;
  golfer: Image;
}
const maleSprites: Record<string, any> = {
  sunnyHot:  require("../assets/Sprites/MaleSprites/sunnyHot.png"),
  sunnyWarm: require("../assets/Sprites/MaleSprites/sunnyWarm.png"),
  rainy:     require("../assets/Sprites/MaleSprites/rainy.png"),
  stormy:    require("../assets/Sprites/MaleSprites/stormy.png"),
  windy:     require("../assets/Sprites/MaleSprites/windy.png"),
  cloudy:    require("../assets/Sprites/MaleSprites/cloudy.png"),
  cool:      require("../assets/Sprites/MaleSprites/cool.png"),
  cold:      require("../assets/Sprites/MaleSprites/cold.png"),
};
const femaleSprites: Record<string, any> = {
  sunnyHot:  require("../assets/Sprites/FemaleSprites/sunnyHot.png"),
  sunnyWarm: require("../assets/Sprites/FemaleSprites/sunnyWarm.png"),
  rainy:     require("../assets/Sprites/FemaleSprites/rainy.png"),
  stormy:    require("../assets/Sprites/FemaleSprites/stormy.png"),
  windy:     require("../assets/Sprites/FemaleSprites/windy.png"),
  cloudy:    require("../assets/Sprites/FemaleSprites/cloudy.png"),
  cool:      require("../assets/Sprites/FemaleSprites/cool.png"),
  cold:      require("../assets/Sprites/FemaleSprites/cold.png"),
};    

export default function Conditions() {
  const { location, character } = useLocalSearchParams<{location: string, character: string}>();
  const [locationData, setLocationData] = useState<Weather | null>(null);
  const [sprite, setSprite] = useState<any>(null);
  const [conditions, setConditions] = useState("");

  useEffect(() => {
    //fetch Weather Data
    fetchWeather(location);
    if(!locationData) return;
    if (locationData?.rainAmount >= 20){
        setConditions("stormy");
      } else if(locationData?.rainAmount > 5 && locationData?.windSpeed >= 20){
        setConditions("stormy");
      } else if(locationData?.rainAmount > 5){
        setConditions("rainy");
      }
      else if (locationData?.windSpeed >= 20){
        setConditions("windy");
      }
      else if(locationData.conditions.includes("cloudy") && (locationData?.currTemp >= 50 || locationData?.feelsLike >= 50)){
        setConditions("cloudy");
      } 
     else if ((locationData?.currTemp >= 90 || locationData?.feelsLike  >= 90 )&& locationData.conditions.includes("sunny")){
        setConditions("sunnyHot");
      }
      else if((locationData?.currTemp >= 70 || locationData?.feelsLike >= 70) && locationData.conditions.includes("sunny") && locationData.windSpeed < 20){
        setConditions("sunnyWarm");
      }
      else if(locationData?.currTemp >= 50 || locationData?.feelsLike >= 50){
        setConditions("cool");
      }
     else {
      setConditions("cold");
    }
  }, [location, conditions, locationData]);

  useEffect(()=>{
    if (character === 'A'){
      setSprite(maleSprites[conditions]);
    } else if(character ==='B') {
      setSprite(femaleSprites[conditions]);
    } else {
      console.log("Empty Sprite");
    }
  }, [character, conditions]);
    
  async function fetchWeather(location: string){
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}&q=${location}`);
      const data = await response.json();

      const locationDets = ({
          locationName: data.location.name, 
          conditions: data.current.condition.text,
          feelsLike: data.current.feelslike_f,
          currTemp: data.current.temp_f,
          rainAmount: data.current.precip_mm,
          windSpeed: data.current.wind_mph,
          golfer: sprite,
      });
      setLocationData(locationDets);
      return locationData;
    } catch (e){
      console.log(e);
    }

  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Pressable 
          style={styles.button}
          onPress={()=>(router.replace("/"))}>
          <Ionicons name="arrow-back-circle" size={35} color="white"/>
        </Pressable>
        <Text style={styles.fresh}>fresh and comfortable 😎</Text>
      </View>
      <Image source={sprite} style={styles.spriteStyles}/> 
      <View style={styles.textContainer}>
        <Text style={styles.ts}>Location: {locationData?.locationName}</Text>
        <Text style={styles.ts}>Current Weather: {locationData?.conditions}</Text>
        <Text style={styles.ts}>Feels Like: {locationData?.feelsLike}</Text>
        <Text style={styles.ts}>Temp: {locationData?.currTemp}</Text>
        <Text style={styles.ts}>Rain Amount: {locationData?.rainAmount}</Text>
        <Text style={styles.ts}>Wind Speed: {locationData?.windSpeed}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#91d0d7"
  },
  header: {
    marginTop: 80,
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 4,
  },
  fresh: {
    fontSize: 30,
    textAlign: "center",
    padding: 10,
  },
  ts: {
    fontSize: 24,
    textAlign: "center",
    padding: 3
  },
  textContainer: {
    marginTop: 30,
    borderWidth: 3,
    height:270,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
  spriteStyles: {
    shadowOffset: {width: 0, height: 10},
    borderWidth: 3,
    borderRadius: 15,
    marginVertical: 40,
    alignSelf: "center",
  },
  

})