import { ScrollView, View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import CategoryItem from '../Components/CategoryItem';
import ProductCard from '../Components/ProductCard';
import ImageSlider from '../Components/ImageSlider';
import {Ionicons  } from '@expo/vector-icons';

import { categories } from '../Data/categories';
import { deals } from '../Data/deals';
import { trending } from '../Data/trending';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100,}}>
      <Header />
        <Text style={styles.featuredText}>All Featured</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CategoryItem item={item} />}
        style={{marginTop:10, paddingHorizontal: 16, marginBottom: 16 }}
      />

      <View style={{ marginVertical: 16 }}>
        <ImageSlider />
      </View>

        <View style={styles.dealsView}>
            <View style={{marginLeft:80}}>
                <Text style={styles.dealsText}>Deal of the Day</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                    <Ionicons name="stopwatch-outline" size={20} color="white" /> 
                    <Text style={styles.dealsSubText}>22h 55m 20s remaining </Text>
                </View>
                
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, width:250}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View All</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>

      <Section title="Deal of the Day">
        <HorizontalProducts data={deals} />
      </Section>

        <View style={styles.offerView}>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Image source={require('../../assets/HomePage/spOffer.png')} style={{width:80, height:70, borderRadius:10, marginLeft:10,}} />
            </View>
            <View>
                <Text style={styles.textTitle}>Special Offers</Text>
                <Text style={styles.textdescription}>We make sure you get the{"\n"}offer you need at best prices</Text>
            </View>
        </View>

    <View style={[styles.dealsView, {backgroundColor:"#FD6E87"}]}>
            <View style={{marginLeft:80}}>
                <Text style={styles.dealsText}>Trending Products</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
                    <Ionicons name="calendar-outline" size={20} color="white" /> 
                    <Text style={styles.dealsSubText}>Last Date 29/02/22</Text>
                </View>
                
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 4, width:250}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>View All</Text>
                    <Ionicons name="arrow-forward" size={16} color="white" />
                </TouchableOpacity>
            </View>
        </View>
      <Section title="Trending Products">
        <HorizontalProducts data={trending} />
      </Section>

        <View style={{width:370, marginLeft: 20, height:375, marginBottom:20, backgroundColor:"white", borderRadius:10, }}>
            <Image source={require('../../assets/HomePage/hotSale.png')} style={{width:370, height:300, borderRadius:4}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                <View Style={{backgroundColor:'white', }}>
                    <Text style={[styles.textTitle, {marginTop:5, marginLeft:15}]}>New Arrivals </Text>
                    <Text style={{color:'#676767', marginLeft:15}}>Summer’ 25 Collections</Text>
                </View>
                <View >
                    <TouchableOpacity style={[styles.button,{height:40, width:100, backgroundColor:'#F83758', marginRight:80, marginTop:20, alignItesms:'center', justifyContent:'center'}]}>
                    <Text style={[styles.buttonText]}>View All</Text>
                    <Ionicons name="arrow-forward"size={16} color="white" />
                </TouchableOpacity>
                </View>
            </View>
        </View>

        <View style={{width:370, height:400, backgroundColor:'white', marginLeft:20, borderRadius:10}}>
            <Text style={{fontSize:18, fontWeight:'bold', marginLeft:5, marginTop:10}}>Sponsered</Text>
            <Image source={require('../../assets/HomePage/off50.png')} style={{width:370, height:300, marginTop:10, marginLeft:0, borderRadius:4}}/>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10}}>
                <View style={{flexDirection:'row', alignItems:'center', gap: 220}}>
                    <Text style={[styles.textTitle,{marginTop:-5,marginLeft:10} ]}>up to 50% Off </Text>
                    <Ionicons name="chevron-forward" size={24} color="black" />
                </View>
            </View>
        </View>
        <View style={{height:20}}></View>
      {/* <Banner image="https://source.unsplash.com/800x400/?new-arrivals" />
      <Banner image="https://source.unsplash.com/800x400/?sponsored" /> */}
    </ScrollView>
  );
}

/* Helper Components */

const Section = ({ title, children }) => (
  <View style={{ marginVertical: 16, paddingHorizontal: 16 }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
      {title}
    </Text>
    {children}
  </View>
);

const HorizontalProducts = ({ data }) => (
  <FlatList
    data={data}
    horizontal
    
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    renderItem={({ item }) => <ProductCard item={item} />}
    style={{marginBottom: 16, marginTop: 10 }}
  />
);

const styles = StyleSheet.create({
    featuredText: {
        marginTop: 15,
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    dealsView:{
        padding:15,
        height: 80,
        width: 370,
        borderRadius: 10,
        backgroundColor: '#4392F9',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    dealsText:{
        color: 'white',
        fontSize: 20,
        marginBottom: 4,
        fontWeight: 'semi-bold',
        fontFamily: 'Monstserrat',
        alignItems: 'flex-top',
        justifyContent: 'flex-start',
    },
    dealsSubText:{
        color: 'white',
    },
    textTitle:{
        color:'black',
        fontSize:18,
        alignItems:'center',
        justifyContent:'center',
        fontWeight:'bold',
        marginLeft:20,
        marginTop:20,
    },
    textdescription:{
        marginTop:6,
        marginLeft:20,
        color:'#676767',
        fontSize:16,
    },
    button: { 
        padding: 8,
        height:40,
        borderRadius: 6,
        marginTop: 10,
        borderWidth:1,
        borderColor:'white',
        flexDirection: 'row',
        alignItems: 'flex-end',   
        gap: 6,
        left: 70,
        bottom: 6,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  offerView:{
    width:370,
    height:100,
    border:1,
    backgroundColor:'#FFFFFF',
    borderRadius:10,
    margin: 10,
    marginTop: -10,
    alignSelf: 'center',
    flexDirection: 'row',
    marginBottom:20,
  },
})
