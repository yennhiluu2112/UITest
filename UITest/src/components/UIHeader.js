import React from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color'

const UIHeader = (props) => {
    const {iconShow, iconPress} = props
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.icon}
                onPress={iconPress}>
                {iconShow && <Icon name='arrow-back-circle' color={'white'} size={27}/>}
            </TouchableOpacity>
            <Text style={styles.headerText}>Aprroval Matrix</Text>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        backgroundColor: Color.branding_orange,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerText:{
        color: 'white',
        fontWeight: '400',
        fontSize: 18,
    },
    icon:{
        position: 'absolute',
        padding: 10,
        left:'6.25%',
        right: '6.25%',
    }
})

export default UIHeader