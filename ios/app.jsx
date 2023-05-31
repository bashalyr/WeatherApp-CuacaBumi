import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const App = () => {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  const apiKey = 'MASUKAN_API_YANG_VALID_BISA_DAFTAR_API_GRATIS_DI_OPENWEATHERMAP'; // Ganti dengan API key cuaca yang valid

  const updateClock = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const searchWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setWeatherData(data);
        addSearchHistory(cityInput);
      })
      .catch(error => {
        console.log('Terjadi kesalahan:', error);
      });
  };

  const displayWeather = () => {
    if (weatherData) {
      return (
        <View style={styles.weatherCard}>
          <Text style={styles.cityName}>Cuaca di {weatherData.name}, {weatherData.sys.country}</Text>
          <Text>Suhu: {Math.round(weatherData.main.temp - 273.15)} °C</Text>
          <Text>Terasa Seperti: {Math.round(weatherData.main.feels_like - 273.15)} °C</Text>
          <Text>Kelembaban: {weatherData.main.humidity}%</Text>
          <Text>Deskripsi: {weatherData.weather[0].description}</Text>
          <Text>Kecepatan Angin: {weatherData.wind.speed} m/s</Text>
          <Text>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
          <Text>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const addSearchHistory = (city) => {
    setSearchHistory([...searchHistory, city]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cuaca Bumi</Text>
      <View style={styles.clockContainer}>
        <Text style={styles.clock}>{updateClock()}</Text>
      </View>
      <View style={styles.weatherContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Masukkan nama kota"
          value={cityInput}
          onChangeText={text => setCityInput(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={searchWeather}>
          <Text style={styles.buttonText}>Cari</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.searchResults}>
        {displayWeather()}
      </ScrollView>
      <View style={styles.searchHistoryContainer}>
        <Text style={styles.historyTitle}>Riwayat Pencarian</Text>
        <ScrollView style={styles.searchHistoryList}>
          {searchHistory.map((city, index) => (
            <TouchableOpacity key={index} style={styles.searchHistoryItem} onPress={() => {
              setCityInput(city);
              searchWeather();
            }}>
              <Text style={styles.searchHistoryText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.clearHistoryButton} onPress={clearSearchHistory}>
          <Text style={styles.buttonText}>Hapus Riwayat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171c28',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#ffffff',
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  clock: {
    fontSize: 48,
    color: '#ffffff',
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchInput: {
    width: 200,
    padding: 5,
    fontSize: 16,
    backgroundColor: '#304259',
    color: '#ffffff',
    borderRadius: 3,
    marginRight: 10,
  },
  searchButton: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#304259',
    color: '#ffffff',
    borderRadius: 3,
  },
  buttonText: {
    color: '#ffffff',
  },
  searchResults: {
    marginBottom: 20,
  },
  weatherCard: {
    backgroundColor: '#24344d',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    marginTop: 0,
    color: '#ffffff',
  },
  searchHistoryContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#ffffff',
  },
  searchHistoryList: {
    maxHeight: 130,
    maxWidth: 300,
  },
  searchHistoryItem: {
    margin: 5,
    backgroundColor: '#304259',
    borderRadius: 5,
    paddingHorizontal: 6,
  },
  searchHistoryText: {
    color: '#ffffff',
  },
  clearHistoryButton: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#304259',
    color: '#ffffff',
    borderRadius: 3,
    marginTop: 10,
  },
});

export default App;
