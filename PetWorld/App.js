import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './src/screen/login/LoadingScreen'
import SelectScreen from './src/screen/login/SelectScreen'
import LoginScreen from './src/screen/login/LoginScreen'
import HomeScreen from './src/screen/home/HomeScreen'
import Cadastro_animalScreen from './src/screen/cadastro_animal/Cadastro_animalScreen'
import CadastroFoto_animalScreen from './src/screen/cadastro_animal/CadastroFoto_animalScreen'
import CadastrarUserScreen from './src/screen/login/CadastrarUserScreen'
import CadastrarUser_etapa2Screen from './src/screen/login/CadastrarUser_etapa2Screen'
import CadastrarUser_etapa3Screen from './src/screen/login/CadastrarUser_etapa3Screen'
import HomeAPScreen from './src/screen/Achados_Perdidos/HomeAPScreen'
import registroPet_PerdidoScreen from './src/screen/Achados_Perdidos/registroPet_PerdidoScreen'
import registroPet_AchadoScreen from './src/screen/Achados_Perdidos/registroPet_AchadoScreen'
import RegistroImagem_AchadoScreen from './src/screen/Achados_Perdidos/RegistroImagem_AchadoScreen'
import detalhesPerdidoScreen from './src/screen/Achados_Perdidos/detalhesPerdidoScreen'
import detalhesAchadoScreen from './src/screen/Achados_Perdidos/detalhesAchadoScreen'
import MinhasPubScreen from './src/screen/meus/MinhasPubScreen';
import registro_doacaoScreen from './src/screen/doacao/registro_doacaoScreen';




const MainNavigator = createStackNavigator({
  Loading: {screen: LoadingScreen},
  detalhesPerdido: {screen: detalhesPerdidoScreen},
  registroPet_Achado: {screen: registroPet_AchadoScreen},
  registroPet_Perdido: {screen: registroPet_PerdidoScreen},
  Cadastro_animal:{screen: Cadastro_animalScreen},
  Select: {screen: SelectScreen},
  CadastrarUser_etapa3:{screen: CadastrarUser_etapa3Screen},
  CadastrarUser_etapa2:{screen: CadastrarUser_etapa2Screen},
  HomeAP: {screen:HomeAPScreen},
  CadastrarUser: {screen: CadastrarUserScreen},
  Home: {screen: HomeScreen},
  Login: {screen: LoginScreen},
  CadastroFoto_animal: {screen: CadastroFoto_animalScreen},
  RegistroImagem_Achado: {screen: RegistroImagem_AchadoScreen},
  detalhesAchado: {screen: detalhesAchadoScreen},
  MinhasPub: {screen: MinhasPubScreen},
  registro_doacao: {screen: registro_doacaoScreen},
  




},
{
  headerMode: "none",
  navigationOptions: {
      headerVisible: false
  }
});

const App = createAppContainer(MainNavigator);

export default App;