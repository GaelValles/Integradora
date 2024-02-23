import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {StyleSheet, Text} from 'react-native'
import { TabButton } from '../components/TabButton'

// Importar las distinatas paginas que contendra el menu
import Principal from '../screens/Principal'
import Dureza from '../screens/Dureza'
import PhScreen from '../screens/PhScreen'
import Flujo from '../screens/Flujo'
import Ventas from '../screens/Ventas'
import Perfil from '../screens/Perfil'
const Tab = createBottomTabNavigator()

const TabNav = () => {
    const tabs = [
        {
            id: 1,
            title: 'Principal',
            screen: 'Principal',
            icon: 'home-outline',
            Component: Principal,
        },
        {
            id: 2,
            title: 'PH',
            screen: 'PH',
            icon: 'water-opacity',
            Component: PhScreen,
        },
        {
            id: 3,
            title: 'Dureza',
            screen: 'Dureza',
            icon: 'hand-coin',
            Component: Dureza,
        },
        {
            id: 4,
            title: 'Flujo',
            screen: 'Flujo',
            icon: 'shuffle-disabled',
            Component: Flujo,
        },
        {
            id: 5,
            title: 'Ventas',
            screen: 'Ventas',
            icon: 'stairs-up',
            Component: Ventas
        },
        {
            id: 6,
            title: 'Perfil ',
            screen: 'Perfil',
            icon: 'account-circle-outline',
            Component: Perfil
      },
    //    
    ]
    

    return(
        
            <Tab.Navigator
                initialRouteName={'Principal'}
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar
                }}
            >
                {
                    tabs.map((item, index) => 
                        <Tab.Screen
                            key={item.id}
                            name={item.screen}
                            component={item.Component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton item={item} {...props} />
                            }}
                        />
                    )
                }
            </Tab.Navigator>
    
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#7CD7CF',
        height: 70,
        position: 'absolute',
        bottom: 25,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#dadada'
    }
})

export default TabNav;
