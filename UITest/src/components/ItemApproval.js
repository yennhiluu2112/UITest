import React from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
const ItemApproval = () => {
    return (
        <View style={styles.approvalContainer}>
        <View style={styles.approvalItem}>
            <View style={styles.rangeView}>
                <Text style={styles.titleRange}>Range Limite Of Approval</Text>
                <View>
                    <View style={styles.smallRangeView}>
                        <Text style={styles.text1}>Minimum</Text>
                        <Text style={styles.text2}>IDR</Text>
                        <Text style={styles.text3}>0</Text>
                    </View>
                    <View style={styles.smallRangeView}>
                        <Text style={styles.text1}>Maximum</Text>
                        <Text style={styles.text2}>IDR</Text>
                        <Text style={styles.text3}>50,000</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line_}></View>
            <View style={styles.rangeView}>
                <Text style={styles.titleRange}>Number Of Approval</Text>
                <Text style={styles.textNumber}>2</Text>
            </View>
            <View style={styles.line_}></View>
            <View style={styles.approverView}>
                <Text style={styles.titleRange}>Approval 1</Text>
                <Text style={styles.textNumber}>GROUPMG1, GROUPMG2</Text>
            </View>
            <View style={styles.approverView}>
                <Text style={styles.titleRange}>Approval 1</Text>
                <Text style={styles.textNumber}>GROUPMG1, GROUPMG2</Text>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    approvalContainer:{
        width: '100%',
    },
    approvalItem:{
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: Color.branding_gray
    },
    rangeView:{
        flexDirection: 'row',
    },
    titleRange:{
        width: '50%',
        fontSize: 12,
        fontWeight:'400',
        color: Color.text_black
    },
    smallRangeView:{
        marginStart: 15,
        width: '50%',
        flexDirection: 'row',
    },
    text1:{
        width: '60%',
        fontSize: 12,
        marginEnd: 5,
        color: Color.branding_blue
    },
    text2:{
        width: '20%',
        fontSize: 12,
        marginEnd: 5,
        color: Color.branding_blue
    },
    text3:{
        width: '40%',
        fontSize: 12,
        marginEnd: 5,
        textAlign: 'right',
        color: Color.branding_blue,
        fontWeight: '700'
    },
    line_:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginVertical: 10,
    },
    textNumber:{
        width: '50%',
        marginEnd: 5,
        fontSize: 12,
        color: Color.branding_blue,
        textAlign: 'right'

    },
    approverView:{
        flexDirection: 'row',
        marginBottom: 15
    }

})

export default ItemApproval