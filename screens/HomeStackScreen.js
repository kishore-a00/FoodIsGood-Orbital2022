import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

import { HomeScreen } from "./HomeScreen";
import { FacultyScreen } from "./FacultyScreen";
import { CanteenScreen } from "./CanteenScreen";
import { StallScreen } from "./StallScreen";
import { ItemScreen } from "./ItemScreen";
import { UpdateScreen } from "./UpdateScreen"
import ReviewScreen from "./ReviewScreen";
import EditReviewScreen from "./EditReviewScreen";
import Username from "../components/Username";

const Stack = createNativeStackNavigator();

export const HomeStackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: "Select a Faculty:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Username" component={Username} options={{ headerTitle: "Update username:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="UpdateScreen" component={UpdateScreen} options={{ headerTitle: "Update information:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Faculty" component={FacultyScreen} options={{ headerTitle: "Select a Canteen:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Canteen" component={CanteenScreen} options={{ headerTitle: "Select a Stall:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Stall" component={StallScreen} options={{ headerTitle: "Select an Item:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Item" component={ItemScreen} options={({ route }) => ({ headerTitle: route.params.item_name, headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}})} />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ headerTitle: "Review:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
      <Stack.Screen name="Edit Review" component={EditReviewScreen} options={{ headerTitle: "Edit Review:", headerTitleStyle: {fontSize: 18, fontWeight: "600", color: '#1d3557'}}} />
    </Stack.Navigator>
  );
};

//For setting title as previous selection
//options={({ route }) => ({ headerTitle: route.params.faculty_name , headerTitleStyle: { fontSize: 15},})}
const styles = StyleSheet.create({
  headerTitleStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: '#1d3557'
  }})