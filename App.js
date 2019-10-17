import { createStackNavigator, createAppContainer } from 'react-navigation'
import Form from './screens/Form'
import UserList from './screens/UserList'

const Root = createStackNavigator({
	form: { screen: Form },
	list: { screen: UserList },
})

const App = createAppContainer(Root)

export default App
