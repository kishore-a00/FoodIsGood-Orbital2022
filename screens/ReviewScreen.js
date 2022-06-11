import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import  ForReview  from "../components/ForReview"
import { RatingSystem } from '../components/RatingSystem'

export const ReviewScreen = () => {
    return(
        <View>
            <RatingSystem/>
            <ForReview/>
        </View>
    )
}