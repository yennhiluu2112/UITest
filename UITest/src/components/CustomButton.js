import React from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Color from '../utils/Color'
const CustomButton = (props) => {
    const {label} = props
    return (
        <TouchableOpacity style={styles.btnView}>
            <Text style={styles.btnText}>{label}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    btnView:{
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.light_grey,
        borderRadius: 15
    },
    btnText:{
        paddingHorizontal: 20,
        paddingVertical: 18,
        color: Color.branding_gray,
        fontSize: 15,
        fontWeight: '400'
    }
})

export default CustomButton