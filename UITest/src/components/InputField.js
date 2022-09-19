import React from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Color from '../utils/Color'

const InputField = (props) => {
    const {label, placeholder, ...rest} = props
    return (
        <View style={styles.inputItem}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputView}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder={placeholder} 
                    placeholderTextColor={Color.branding_gray}
                    {...rest}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    label:{
        color: Color.text_black,
        fontSize: 15,
        fontWeight: '400'
    },
    inputItem:{
    },
    inputView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    textInput:{
         width: '100%',
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 14,
    },
})

export default InputField