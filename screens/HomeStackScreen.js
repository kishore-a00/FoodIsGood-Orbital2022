import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from "./HomeScreen"
import { FacultyScreen } from "./FacultyScreen"
import { CanteenScreen } from "./CanteenScreen"
import { StallScreen } from './StallScreen';
import { ItemScreen } from './ItemScreen';
import { ReviewScreen } from './ReviewScreen';

const Stack = createNativeStackNavigator();

export const HomeStackScreen = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />       
            <Stack.Screen name="Faculty" component={FacultyScreen} />      
            <Stack.Screen name="Canteen" component={CanteenScreen} />  
            <Stack.Screen name="Stall" component={StallScreen} />
            <Stack.Screen name="Item" component={ItemScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
        </Stack.Navigator>
)}