import React from 'react'
import { View , Text, StyleSheet, SafeAreaView} from 'react-native'
import { UIHeader } from '../components'
import Color from '../utils/Color'
const CreateScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <UIHeader 
                iconShow={true}
                iconPress={()=>navigation.navigate("HomeScreen")}/>
            <View style={styles.body}></View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: 'white',
    },
    body:{
        flex: 90
    }
})
export default CreateScreen