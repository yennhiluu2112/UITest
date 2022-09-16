import React from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
import { WIDTH } from '../utils/Constant'
import { UIHeader, ItemFeature, ItemApproval } from '../components'

const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <UIHeader/>
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={()=>navigation.navigate('CreateScreen')}>
                        <Icon name='add-circle' color='white' size={21} style={styles.addIcon}/>
                        <Text style={styles.addText}>Tambah New Matrix</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <ItemFeature/>
                    <ItemApproval/>
                   
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.branding_orange,
    },
    bodyContainer:{
        flex: 88,
        backgroundColor: Color.branding_orange    
    },
    body:{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    addButton:{
        backgroundColor: '#171C8F',
        marginTop: 24,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addIcon:{
        marginVertical: 5,
        marginLeft: 10
    },
    addText:{
        color: 'white',
        marginVertical: 7,
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '700',
    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginVertical: 20,
    },
    
    
})

export default HomeScreen