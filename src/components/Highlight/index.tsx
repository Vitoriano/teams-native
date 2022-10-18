import { Conatiner, Subtitle, Title } from "./styles";

type Props = {
  title: string;
  subtitle: string
}

export function Highlight({ title, subtitle} : Props) {
  return (
    <Conatiner>
      <Title>{ title }</Title>
      <Subtitle>{ subtitle } </Subtitle>
    </Conatiner>
  );
}