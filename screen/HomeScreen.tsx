import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'> & {
    menuItems: MenuItem[];
};

export default function HomeScreen({navigation, menuItems}: Props) {

    const renderItem = ({item}: {item: MenuItem}) => (
        <View style={styles.card}>
            <View style={styles.cardTop}>
                <Text style={styles.dishName}>{item.name}</Text>
                <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    return (
        <View style={ styles.container}>
            <Text style={styles.heading}>Menu Items ({menuItems.length})</Text>

            <FlatList
                data={menuItems}
                keyExtractor={(item: MenuItem) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>
                            Tap "+ Add New Menu Item" below to add to your first dish.
                        </Text>
                    </View>
                }
            />  

            <TouchableOpacity
             style={styles.addButton}
             onPress={() => navigation.navigate('AddMenuItem')}
            >
                <Text style={styles.addButtonText}>+ Add New Menu Item</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#222222',
        marginBottom: 12,
    },
    listContent: {
        flexGrow: 1,
        paddingBottom: 16,
    },
    card: {
        backgroundColor: '#F2F2F2',
        borderRadius: 8,
        padding: 14,
        marginBottom: 12,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dishName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000000',
    },
    course: {
        fontSize: 14,
        color: '#00808A',
        fontWeight: '600',
        marginTop: 4,
    },
    description: {
        fontSize: 15,
        color: '#444444',
        marginTop: 6,
    },
    emptyBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#555555',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 16,
        color: '#777777',
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#34C759',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});