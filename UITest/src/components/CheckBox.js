import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color'
import { WIDTH, HEIGHT } from '../utils/Constant'
const CheckBox = ({ options = [], onChange, visible, setVisible, selected, setSelected }) => {
    const toggle = (id) => {
        let index = selected.findIndex((i) => i === id)
        let arrSelected = [...selected]
        if (index !== -1) {
            arrSelected.splice(index, 1)
        }
        else {
            arrSelected.push(id)
        }
        setSelected(arrSelected)
    }

    return (
        <Modal visible={visible} transparent={true} animationType='fade'>
            <View style={styles.container}>
                <View style={styles.container1}>
                    {options.map((item, index) => {
                        return (
                            <View key={item.id} style={styles.smallContainer}>
                                <TouchableOpacity
                                    style={[styles.btn, {
                                        backgroundColor: selected.findIndex(i => i === item.id) !== -1 ? Color.branding_orange : 'white'
                                    }]}
                                    onPress={() => {
                                        toggle(item.id)
                                    }}
                                >
                                    {
                                        selected.findIndex(i => i === item.id) !== -1 ?
                                            <Icon name='checkmark-outline' color={'white'} size={17} />
                                            : <View></View>
                                    }
                                </TouchableOpacity>
                                <Text style={styles.itemText}>{item.name_approval}</Text>
                            </View>
                        )
                    })}

                    <TouchableOpacity
                        style={styles.btnClose}
                        onPress={() => { setVisible(false) }}
                    >
                        <Text style={styles.textClose}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(0,0,0,0.5)',
    },
    container1: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.7,
        borederColor: Color.branding_orange
    },
    smallContainer: {
        flexDirection: 'row',
        marginTop: 7,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 15,
        fontWeight: '600',
        color: Color.text_black,
        marginLeft: 12
    },
    btn: {
        height: 22,
        width: 22,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Color.branding_orange,
        borderWidth: 1,
    },
    btnClose: {
        width: WIDTH * 0.25,
        height: HEIGHT * 0.05,
        backgroundColor: Color.branding_orange,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 10,
    },
    textClose: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15
    }
})

export default CheckBox