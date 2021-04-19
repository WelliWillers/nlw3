import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanages {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
  const [ orphanages, setOrphanages ] = useState<Orphanages[]>([]);
  const navigation = useNavigation();

  useFocusEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    })
  })

  function handleNavigateToOrphanagesDetails(id: number){
      navigation.navigate('OrphanageDetails', { id });
  }

  function handleNavigateToOrphanage(){
      navigation.navigate('SelectMapPosition');
  }

    return (
        <View style={styles.container}>
          <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{
                latitude: -29.468928,
                longitude: -52.091529,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
                }}
            >   
            {orphanages.map(orphanage => {
              return (
                <Marker
                  key={orphanage.id}
                  calloutAnchor={{
                    x:2.7,
                    y: .9,
                  }}
                    icon={mapMarker}
                    coordinate={{
                      latitude: orphanage.latitude,
                      longitude: orphanage.longitude,
                    }}
                    >
                      <Callout tooltip onPress={() => handleNavigateToOrphanagesDetails(orphanage.id)}>
                        <Text>
                          <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{orphanage.name}</Text>
                          </View>
                        </Text>
                      </Callout>
                  </Marker>
              );
            })}
          </MapView>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {orphanages.length} orfanatos encontrados
            </Text>
    
            <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToOrphanage}>
              <Feather name="plus" size={20} color="#fff" />
            </RectButton>
    
          </View>
    
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
      elevation: 3
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 3
    },
  
    footerText: {
      fontFamily: 'Nunito_700Bold',
      color: '#8fa7b3'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
      justifyContent:'center',
      alignItems: 'center'
    }
  });
  