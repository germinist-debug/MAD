import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  
  // Text styles
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  
  subtitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  
  normalText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  
  secondaryButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Card styles
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Product item styles
  productItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
});