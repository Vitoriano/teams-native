
import { Container, Logo, BackButton} from "./styles";
import  CaretLeft  from 'react-native-vector-icons/AntDesign';

import logoImg from '@assets/logo.png';
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false}: Props) {

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups');
  }

  return (
   <Container>
    {
      showBackButton && 
      <BackButton onPress={handleGoBack}>
          <CaretLeft name="left" size={32} color="#fff"/>
      </BackButton>
    }
   
    <Logo source={logoImg} />
   </Container>
  );
}