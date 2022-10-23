import { TouchableProps } from "react-native-svg";
import { Container, Title, FilterStyleProps } from "./styles";

type Props = TouchableProps & FilterStyleProps &{
  title: string;
}

export function Filter ({ title, isActive = false, ...rest}: Props) {
  return (
    <Container 
      isActive={isActive}
     {...rest}
    >
     <Title>
        {title}
      </Title>
    </Container>
  );
}