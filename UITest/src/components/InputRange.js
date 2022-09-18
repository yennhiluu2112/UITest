import React from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Color from '../utils/Color'

const InputRange = (props) => {
    const {label, ...rest} = props
    return (
        <View style={styles.inputItem}>
            <Text style={styles.label}>Range Of Approval ({label})</Text>
            <View style={styles.inputView}> 
                    <Text style={styles.smallText}>IDR</Text>
                    <TextInput 
                        style={styles.textInput} 
                        placeholder='Input Text Here' 
                        placeholderTextColor={Color.branding_gray}
                        {...rest}
                        keyboardType='numeric'
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
    inputView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    smallText:{
        marginEnd: 10,
        color: Color.text_black,
        fontSize: 15,
        fontWeight: '400'
    },
    textInput:{
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 14,
    },
})

export default InputRange

