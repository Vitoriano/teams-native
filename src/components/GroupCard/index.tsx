import { TouchableOpacityProps } from 'react-native';
import { Container, Title, IconItem } from "./styles";
import Icon from 'react-native-vector-icons/AntDesign';

type Props = TouchableOpacityProps & {
  title: string;
}

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <IconItem>
        <Icon name="addusergroup" size={32} color="#00875F" />
      </IconItem>
      <Title>
        { title }
      </Title>
    </Container>
  );
}