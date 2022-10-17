
import { Container, Logo, BackButton} from "./styles";
import  CaretLeft  from 'react-native-vector-icons/AntDesign';
//import { CaretLeft } from 'phosphor-react-native'; // todo: Corigir problema na instalação

import logoImg from '@assets/logo.png';

type Props = {
  showBackButton?: boolean;
}

export function Header({ showBackButton = false}: Props) {
  return (
   <Container>
    {
      showBackButton && 
      <BackButton>
          <CaretLeft name="left" size={32} color="#fff"/>
      </BackButton>
    }
   
    <Logo source={logoImg} />
   </Container>
  );
}