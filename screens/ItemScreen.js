import { Text, View, FlatList, StyleSheet, Image } from 'react-native'
import  ForReview  from "../components/ForReview"

//Text should show whatever the user selected previously
//Text below should be fetched from database
//unable to get picture from internet
export const ItemScreen = () => {
    return(
        <View>
            <Text style={styles.headertext}> Black Pepper Chicken Chop </Text>
            <ForReview/>
            <View style = {styles.image}>
                <Image source={require('../assets/img_test.jpg')}
                        style={{width: 200, height:200}}/>
            </View>
            <FlatList
                data = {[
                    {key: 'Review 1'},
                    {key: 'Review 2'},
                    {key: 'Review 3'},
                    {key: 'Review 4'},
                    {key: 'Review 5'},
                    {key: 'Review 6'},
                    {key: 'Review 7'},
                    {key: 'Review 8'},
                    {key: 'Review 9'},
                    {key: 'Review 10'},
                    {key: 'Review 11'},
                    {key: 'Review 12'},
                    {key: 'Review 13'},
                    {key: 'Review 14'},
                    {key: 'Review 15'},
                    {key: 'Review 16'},
                ]}
                renderItem={( {item} )=> <Text style={styles.innertext}> {item.key} </Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        headertext: {
            color: '#A7BC5B',
            fontSize: 28
        },
        innertext: {
            fontSize: 16,
            paddingHorizontal: 20,
            paddingVertical: 30,
        },
        image: {
            alignSelf: 'center'
        }
    }
);

