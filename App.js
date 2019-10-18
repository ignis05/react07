import { createStackNavigator, createAppContainer } from 'react-navigation'
import Form from './screens/Form'
import UserList from './screens/UserList'
import EditUser from './screens/EditUser'

const Root = createStackNavigator({
	form: { screen: Form },
	list: { screen: UserList },
	edit: { screen: EditUser },
})

const App = createAppContainer(Root)

export default App
