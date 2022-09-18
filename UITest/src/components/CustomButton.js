import React from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Color from '../utils/Color'
const CustomButton = (props) => {
    const {label, isValidationOK, onPress} = props
    return (
        <TouchableOpacity 
            style={[styles.btnView,{backgroundColor: isValidationOK ? Color.branding_orange : Color.light_grey}]}
            disabled={!isValidationOK}
            onPress={onPress}>
            <Text style={[styles.btnText, {color: isValidationOK ? 'white' : Color.branding_gray}]}>{label}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btnView:{
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    btnText:{
        paddingHorizontal: 20,
        paddingVertical: 18,
        fontSize: 15,
        fontWeight: '400'
    }
})

export default CustomButton