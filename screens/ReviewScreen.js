//Find a way to pass the prop to the component
import { View } from "react-native";
import PostReview from "../components/PostReview";
import { RatingSystem } from "../components/RatingSystem";
import ForReview from "../components/ForReview";

//Implementing RatingSystem component instead
export const ReviewScreen = () => {
    return(
        <View>
            <RatingSystem/>
            <ForReview/>
        </View>
    )
}
