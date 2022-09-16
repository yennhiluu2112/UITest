import React from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color'

const ItemFeature = () => {
    return (
        <View>
            <TouchableOpacity style={styles.featureContainer}>
            <View style={styles.featureView}>
                <Text style={styles.featureName}>Default</Text>
                <View style={styles.line_}></View>
                <Text style={styles.featureName}>Default</Text>
                <Icon style={styles.iconArrow} name='chevron-down-outline' color={Color.text_black} size={20}/>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureContainer}>
                <View style={[styles.featureView,{borderColor: Color.branding_orange}]}>
                    <Text style={[styles.featureName,{color: Color.branding_orange}]}>Transfer Online</Text>
                    <View style={[styles.line_,{backgroundColor: Color.branding_orange}]}></View>
                    <Text style={[styles.featureName,{color: Color.branding_orange}]}>Transfer Online</Text>
                    <Icon style={styles.iconArrow} name='chevron-up' color={Color.branding_orange} size={20}/>
                </View>
            </TouchableOpacity>

        </View>
        
    )

}

const styles = StyleSheet.create({
    featureContainer:{
        width: '100%',
        marginBottom: 20,
    },
    featureView:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingStart: 20,
        paddingEnd: 10,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center'
    },
    featureName:{
        width: '45%',
        fontSize: 15,
        fontWeight: '400',
        color: Color.text_black,
        marginVertical: 10,
    },
    line_:{
        marginEnd: 11,
        height: '100%',
        width: 1,
        backgroundColor: Color.branding_gray,
    },
    iconArrow:{
    }
})

export default ItemFeature