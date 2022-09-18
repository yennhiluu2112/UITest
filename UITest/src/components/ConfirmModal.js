import React, { useEffect, useState } from 'react'
import { View , Text, StyleSheet, TouchableOpacity, Modal} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
import { WIDTH, HEIGHT } from '../utils/Constant'

const ConfirmModal = (props) => {
    const {visible, setVisible, listener} = props;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Are you sure you want to delete?</Text>
                    <TouchableOpacity onPress={()=>{
                        listener()
                        setVisible(!visible)
                        }}
                        style={styles.btnOK}
                    >
                        <Text style={styles.textOK}>CONFIRM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                            setVisible(!visible)
                        }}
                        style={styles.btnCancel}
                    >
                        <Text style={styles.textCancel}>CANCEL</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView:{
        width: WIDTH*0.8,
        height: HEIGHT*0.25,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        fontSize: 15,
        fontWeight: '500',
        color: Color.branding_blue,
        marginBottom: 30
    },
    btnOK:{
        height: HEIGHT*0.05,
        backgroundColor: Color.branding_blue,
        borderRadius: 15,
        width: WIDTH*0.5,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnCancel:{
        height: HEIGHT*0.05,
        backgroundColor: Color.white,
        borderRadius: 15,
        borderColor: Color.branding_blue,
        borderWidth: 0.7,
        width: WIDTH*0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textOK:{
        color: 'white',
        fontSize: 14,
        fontWeight: '700'
    },
    textCancel:{
        color: Color.branding_blue,
        fontSize: 14,
        fontWeight: '700'
    }

})

export default ConfirmModal