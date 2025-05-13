import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IdleProvider } from './IdleProvider'
import { TimerProvider } from './TimerProvider'
import AppFooter from '../components/AppFooter'

const AppProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SafeAreaView style={styles.container}>
			<TimerProvider>
				<IdleProvider timeout={5000}>
					{children}
					<AppFooter />
				</IdleProvider>
			</TimerProvider>
		</SafeAreaView>
	)
}

export default AppProvider

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
})