import { createStackNavigator, createAppContainer } from 'react-navigation'
import Form from './screens/Form'
import UserList from './screens/UserList'

const Root = createStackNavigator({
	list: { screen: UserList },
	form: { screen: Form },
})

const App = createAppContainer(Root)

export default App
