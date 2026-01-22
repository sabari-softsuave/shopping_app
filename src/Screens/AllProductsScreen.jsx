import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AllProductsScreen({ route }) {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // The route params might contain a specific query (like 'dress' or 'phone') or category
    const { query } = route.params || {};

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                let url = 'https://dummyjson.com/products?limit=200';

                // If a specific search query was passed (e.g., from "Deals" or "Trending"), search for that instead
                if (query) {
                    url = `https://dummyjson.com/products/search?q=${query}&limit=200`;
                }

                const response = await fetch(url);
                const data = await response.json();

                const mappedProducts = data.products.map(product => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    description: product.description,
                    images: product.images.map(url => ({ uri: url })),
                    rating: product.rating,
                    reviews: 50,
                    category: product.category,
                }));

                setProducts(mappedProducts);
            } catch (error) {
                console.error("Error fetching all products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, [query]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#F83758" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.headerContainer}>
                <Text style={styles.pageTitle}>
                    {query ? `Results for "${query}"` : 'All Products'}
                </Text>
                <Text style={styles.productCount}>{products.length} found</Text>
            </View>

            {/* Added Search Shortcut for easy new search */}
            <TouchableOpacity
                style={styles.searchShortcut}
                onPress={() => navigation.navigate('SearchInitial')}
            >
                <Ionicons name="search" size={24} color="#666" />
                <Text style={styles.searchText}>Search Another</Text>
            </TouchableOpacity>

            <FlatList
                data={products}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.push('ProductDetails', { product: item })}
                    >
                        <Image
                            source={item.images && item.images.length > 0 ? item.images[0] : null}
                            style={styles.image}
                        />
                        <View style={{ height: 1, backgroundColor: '#D3D3D3' }} />
                        <View style={{ padding: 4 }}>
                            <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
                            <Text style={styles.price}>₹ {item.price}</Text>
                            <Text style={styles.rating}>⭐ {item.rating}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    headerContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    productCount: {
        color: '#666',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        height: 36, // Fixed height for 2 lines
    },
    price: {
        fontSize: 14,
        fontWeight: 'semi-bold',
        color: '#ff3b5c',
    },
    rating: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    searchShortcut: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        marginHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee'
    },
    searchText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    }
});
